pragma solidity ^0.4.18;

///@title FIFARumble
///@author Marco Dell'Oso - targens

contract FIFARumble {
    uint fee;
    uint maxPlayers;
    string tournamentName;
    bool registrationOpen;
    bool tournamentStarted;
    address public gameMaster;
    address public winner;
    address public second;
    address public third;

    struct Player {
        uint pID;
        string name;
        uint points;
        uint goals;
        uint counterGoals;
    }

    struct Encounter {
        uint p1ID;
        uint p2ID;
        uint p1Goals;
        uint p2Goals;
        bool isValue;
    }

    mapping (uint=>Encounter) encounters;
    mapping (address=>Player) players;
    mapping (uint=>address) playerIDs;
    address[] playerAccts;
       
    event newRegister();
    event Start(); 
    event MatchDecided();
    event End(uint, uint, uint);
   
     ////modifiers////
    modifier gameMasterOnly {
        require(msg.sender == gameMaster);
        _;
    }

    modifier playerOnly {
        require(msg.sender != gameMaster);
        _;
    }

    modifier registrationValid {
        require(registrationOpen = true);
        _;
    }

    //fee in ETH
    function createTournament(uint _fee, uint _maxPlayers, string _tournamentName) external gameMasterOnly {
        registrationOpen = true;
        fee = _fee;
        maxPlayers = _maxPlayers;
        tournamentName = _tournamentName;
        emit newRegister();
    }
    
    function startTournament() public gameMasterOnly {
        registrationOpen = false;
        tournamentStarted = true;
        emit Start();
    }

    function getTournament() external view returns (string, uint, uint, uint, bool, bool) {
        uint i = getPlayerCount();
        return (tournamentName, fee, maxPlayers, i, registrationOpen, tournamentStarted);
    }

    function setPoints(address _address, uint _points, uint _goals, uint _counterGoals) gameMasterOnly internal {
        Player storage player = players[_address];
        player.points = player.points + _points;
        player.goals = player.goals + _goals;
        player.counterGoals = player.counterGoals + _counterGoals;
    }

    function endTournament(address _w, address _s, address _t) public gameMasterOnly {
        winner = _w;
        second = _s;
        third = _t;

        uint pot = address(this).balance;
        uint price1 = (pot * 60 / 100);
        winner.transfer(price1);
        uint price2 = (pot * 30 / 100);
        second.transfer(price2);
        uint price3 = (pot * 10 / 100);
        third.transfer(price3);

        emit End(price1, price2, price3);
  
    }

    //for details on tournament systems see: https://en.wikipedia.org/wiki/Category:Tournament_systems 
    function getRoundRobin() gameMasterOnly view external returns (uint[36][3] gamePlan) {
        uint nOM = getNumberOfMatches();
        uint nOP = getPlayerCount();
        uint modRound = 1;
        uint p1Temp;
        uint p2Temp;

        for (uint i = 1; i <= nOM; i++) {
  
            if (i % nOP == 0) {
                p1Temp = nOP;
            } else {
                p1Temp = (i % nOP);
            }
        
            if ((i + modRound) % nOP == 0) {
                p2Temp = nOP;
            } else {
                p2Temp = (i + modRound) % nOP;
            }
            
            gamePlan[0][i - 1] = i;
            gamePlan[1][i - 1] = p1Temp;
            gamePlan[2][i - 1] = p2Temp;           

            if (i % nOP == 0 && i > 1) {
                modRound ++;
            }
        }
        return gamePlan;
    }   

    function getNumberOfMatches() internal view returns(uint numberOfMatches) {
        numberOfMatches = ((getPlayerCount() * 1000 ) / 2 * (getPlayerCount() - 1)) / 1000;
        return numberOfMatches;
    }

    function decideMatch(uint _matchID, uint _p1, uint _p2, uint _p1Goals, uint _p2Goals) gameMasterOnly external {
        if (tournamentStarted) {
            Encounter storage en = encounters[_matchID];
            en.p1ID = _p1;
            en.p2ID = _p2;
            en.p1Goals = _p1Goals;
            en.p2Goals = _p2Goals;
            var (p1, , , , ) = getPlayerByID(_p1);
            var (p2, , , , ) = getPlayerByID(_p2);
            
            if (_p1Goals > _p2Goals) {
                setPoints(p1, 3, _p1Goals, _p2Goals);
                setPoints(p2, 0, _p2Goals, _p1Goals);
            } else if (_p1Goals < _p2Goals) {
                setPoints(p2, 3, _p2Goals, _p1Goals);
                setPoints(p1, 0, _p1Goals, _p2Goals);
            }
        }
        emit MatchDecided();
    }

    ////player functions////

    function register(string _playerName) playerOnly registrationValid external payable {

        if (getPlayerCount() >= maxPlayers) {
            revert();
        }

        if (msg.value == fee) {
            setPlayer(_playerName);
            emit newRegister();
   
        } else if (msg.value < fee) {
            revert();

        } else if (msg.value > fee) {
            msg.sender.transfer(msg.value - fee);
            setPlayer(_playerName);
            emit newRegister();
    
        }       
    }

    function setPlayer(string _playerName) internal {
        address tempAddress = msg.sender;
        uint tempID = getPlayerCount() + 1;
        Player storage player = players[tempAddress]; 
        playerIDs[tempID] = tempAddress;

        player.pID = tempID;
        player.name = _playerName;
        playerAccts.push(tempAddress);
    }

    function getPlayerCount() public constant returns(uint count) {
        return playerAccts.length;
    }

    function getPlayer(address _playerAddress) view public returns (
        uint pID,
        string name,
        uint points,
        uint goals,
        uint counterGoals)
        {

        return (
            players[_playerAddress].pID,
            players[_playerAddress].name,
            players[_playerAddress].points,
            players[_playerAddress].goals,
            players[_playerAddress].counterGoals);
    }

    function getPlayerByID(uint _playerID) view public returns (
        address addressP,
        string name,
        uint points,
        uint goals,
        uint counterGoals,
        uint PlayerID)
        {
        addressP = (playerIDs[_playerID]);     
        return (
            addressP,
            players[addressP].name,
            players[addressP].points,
            players[addressP].goals,
            players[addressP].counterGoals,
            _playerID);

    }

    function getEncounter(uint _matchID) view public returns (
        uint p1ID,
        uint p2ID,
        uint p1Goals,
        uint p2Goals) {

        return (
            encounters[_matchID].p1ID,
            encounters[_matchID].p2ID,
            encounters[_matchID].p1Goals,
            encounters[_matchID].p2Goals
            );

    }

    function FIFARumble() public {
        gameMaster = msg.sender;
    } 

    function() public {
        revert();
    } 
    
    function kill() public { 
        if (msg.sender == gameMaster) {
            selfdestruct(gameMaster);
        }
    }
}








