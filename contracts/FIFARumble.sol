pragma solidity ^0.4.18;

///@title FIFARumble
///@author Marco Dell'Oso - targens

contract FIFARumble {
    uint fee;
    uint maxPlayers;
    string tournamentName;
    bool registrationOpen;
    address public gameMaster;

    struct Player {
        uint pID;
        string name;
        string club;
        uint points;
        uint goals;
        uint counterGoals;
    }

    struct Encounter {
        uint winnerID;
        uint loserID;
        uint winnerGoals;
        uint loserGoals;
    }

    mapping (uint=>Encounter) encounters;
    mapping (address=>Player) players;
    mapping (uint=>address) playerIDs;
    address[] playerAccts;
       
    event InsufficientFee(uint missing);
    event FeeToHigh(uint spare);
    event TournamentFull(uint mP);
    event Start(); 
   
    //fee in ETH
    function createTournament(uint _fee, uint _maxPlayers, string _tournamentName) external gameMasterOnly {
        registrationOpen = true;
        fee = _fee;
        maxPlayers = _maxPlayers;
        tournamentName = _tournamentName;
    }
    
    function startTournament() external gameMasterOnly {
        registrationOpen = false;
        //more tournament types to come
        emit Start();
    }

    function getTournament() external view returns (string, uint, uint, uint, bool) {
        uint i = getPlayerCount();
        return (tournamentName, fee, maxPlayers, i, registrationOpen);
    }

    //for details on tournament systems see: https://en.wikipedia.org/wiki/Category:Tournament_systems 
    function getRoundRobin() gameMasterOnly view external returns (uint[15][6] gamePlan) {
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

    function decideMatch(uint _matchID, uint _winner, uint _loser, uint _winnerGoals, uint _loserGoals) gameMasterOnly external {

        Encounter storage e = encounters[_matchID];

        e.winnerID = _winner;
        e.loserID = _loser;
        e.winnerGoals = _winnerGoals;
        e.loserGoals = _loserGoals;

    }
    ////player functions////

    function register(string _playerName, string _club) playerOnly registrationValid external payable returns(bool reg) {

        if (getPlayerCount() >= maxPlayers) {
            emit TournamentFull(maxPlayers);
            revert();
        }

        if (msg.value == fee) {
            setPlayer(_playerName, _club);
            reg = true;
            return reg;

        } else if (msg.value < fee) {
            emit InsufficientFee(fee - msg.value);
            revert();

        } else if (msg.value > fee) {
            msg.sender.transfer(msg.value - fee);
            emit FeeToHigh(msg.value - fee);
            setPlayer(_playerName, _club);
            reg = true;
            return reg;
        }       
    }

    function setPlayer(string _playerName, string _club) internal {
        address tempAddress = msg.sender;
        uint tempID = getPlayerCount() + 1;
        Player storage player = players[tempAddress]; 
        tempAddress = playerIDs[tempID];

        player.pID = tempID;
        player.name = _playerName;
        player.club = _club;
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
        string club,
        uint points,
        uint goals,
        uint counterGoals)
        {

        return (
            players[_playerAddress].pID,
            players[_playerAddress].name,
            players[_playerAddress].club,
            players[_playerAddress].points,
            players[_playerAddress].goals,
            players[_playerAddress].counterGoals);
    }

    function getPlayerByID(uint _playerID) view public returns (address) {
        
        return (playerIDs[_playerID]);

    }

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








