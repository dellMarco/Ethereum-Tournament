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
    }

    mapping (uint=>Encounter) encounters;
    mapping (address=>Player) players;
    mapping (uint=>address) playerIDs;
    address[] playerAccts;
       
    event InsufficientFee(uint missing);
    event FeeToHigh(uint spare);
    event TournamentFull(uint mP);
    event Start(); 
    event MatchDecided(Encounter);
   
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
        numberOfMatches = getPlayerCount() / 2 * (getPlayerCount() - 1);
        return numberOfMatches;
    }

    function decideMatch(uint _matchID, uint _p1, uint _p2, uint _p1Goals, uint _p2Goals) gameMasterOnly external {

        Encounter storage en = encounters[_matchID];

        en.p1ID = _p1;
        en.p2ID = _p2;
        en.p1Goals = _p1Goals;
        en.p2Goals = _p2Goals;

    }
    ////player functions////

    function register(string _playerName) playerOnly registrationValid external payable returns(bool reg) {

        if (getPlayerCount() >= maxPlayers) {
            emit TournamentFull(maxPlayers);
            revert();
        }

        if (msg.value == fee) {
            setPlayer(_playerName);
            reg = true;
            return reg;

        } else if (msg.value < fee) {
            emit InsufficientFee(fee - msg.value);
            revert();

        } else if (msg.value > fee) {
            msg.sender.transfer(msg.value - fee);
            emit FeeToHigh(msg.value - fee);
            setPlayer(_playerName);
            reg = true;
            return reg;
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

    // function setPoints(address _address, uint _points, uint _goals, uint _counterGoals) gameMasterOnly internal {
    //     Player storage player = players[_address];
    //     player.points = player.points + _points;
    //     player.goals = player.goals + _goals;
    //     player.counterGoals = player.counterGoals + _counterGoals;
    // }

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
        uint counterGoals)
        {

        addressP = (playerIDs[_playerID]);
        
        return (
            addressP,
            players[addressP].name,
            players[addressP].points,
            players[addressP].goals,
            players[addressP].counterGoals);

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








