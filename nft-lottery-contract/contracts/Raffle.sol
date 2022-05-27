// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";


contract Raffle is VRFConsumerBaseV2 {


    // contract state
    enum RaffleState {
        Open,
        Full,
        //prizeToWin,
        Calculating
    }

    // state
    RaffleState public s_raffleState;

    //errors
    error Raffle_SendMoreToEnterRaffle();
    error Raffle_RaffleNotOpen();
    error Raffle_RaffleIsFull();
    error Raffle_UpkeepNotNeeded();
    error Raffle_TransferFailed();
    
    uint256 public immutable i_entryCostPrice; // normal entry cost
    uint256 public immutable i_numberOfTickets;

    address payable[] public s_rafflePlayers; // player address to pay/give price if won
    address private s_owner;

    uint256 public s_lastTimeStamp; // keep track of time

    uint256 public immutable i_interval; // interval

    VRFCoordinatorV2Interface public immutable i_vrfCoordinator;
    
    uint64 s_subscriptionId;  // Your subscription ID.

    uint16 public constant REQUEST_CONFIRMATIONS = 3; //The default is 3, but you can set this higher.

    // For a list of available gas lanes on each network,
    // see https://docs.chain.link/docs/vrf-contracts/#configurations
    // bytes32 s_keyHash;
    uint32 i_callbackGasLimit = 100000;

    address public s_recentWinner;

    
    // The gas lane to use, which specifies the maximum gas price to bump to.
    // // For a list of available gas lanes on each network,
    // // see https://docs.chain.link/docs/vrf-contracts/#configurations
    bytes32 public i_gasLane;

    uint32 public constant NUM_WORDS = 1; // Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.

    event RaffleEnter(address indexed rafflePlayers);  // event on raffle entered
    event RequestedRaffleWinner(uint256 indexed requestId);
    event WinnerPicked(address indexed winner);
    constructor(
        uint256 entryCostPrice, 
        uint256 numberOfTickets,
        uint256 interval,
        address vrfCoordinatorV2,
        bytes32 gasLane, // keyhash,
        uint64 subscriptionId,
        uint32 callbackGasLimit
        ) VRFConsumerBaseV2(vrfCoordinatorV2) {
        i_entryCostPrice = entryCostPrice;
        i_numberOfTickets = numberOfTickets;
        s_lastTimeStamp = block.timestamp;
        i_interval = interval;
        i_vrfCoordinator= VRFCoordinatorV2Interface(vrfCoordinatorV2);
        i_gasLane = gasLane;
        s_subscriptionId = subscriptionId;
        i_callbackGasLimit = callbackGasLimit;
        s_owner = msg.sender;

    }

     // Pay to enter raffle
    function enterRaffle() public payable {
        // require(!isBallotTime());
        // require(!paused());
        if (msg.value < i_entryCostPrice) {
            revert Raffle_SendMoreToEnterRaffle();
        }

        // if raffle is open
        if (s_raffleState != RaffleState.Open) {
            revert Raffle_RaffleNotOpen();
        }
        require(msg.value == i_entryCostPrice, "not enough money sent!");
        // if tickets left
        if (s_raffleState != RaffleState.Full) {
                revert Raffle_RaffleIsFull();
        }
        // enter raffle
        //TODO: Protection from duplicate entry (or can duplicate?)
        s_rafflePlayers.push(payable(msg.sender));
        emit RaffleEnter(msg.sender);
    }


     function checkUpKeep (
        bytes memory // check data
    )
        public
        view
        returns (
        bool upkeepNeeded,
        bytes memory // performData
    )
    {
        bool isOpen = RaffleState.Open == s_raffleState;
        bool isnotFull = RaffleState.Full == s_raffleState;
        bool timepassed = ((block.timestamp - s_lastTimeStamp) > i_interval);
        bool hasBalance = address(this).balance > 0;
        bool hasPlayers = s_rafflePlayers.length == i_numberOfTickets;
        upkeepNeeded = (timepassed && isnotFull && isOpen && hasBalance && hasPlayers);

        return (upkeepNeeded, "0X0");
    }


      function performUpkeep (
        bytes calldata // performData
        ) external {
            (bool upkeepNeeded, ) = checkUpKeep("");
            if (!upkeepNeeded) {
                revert Raffle_UpkeepNotNeeded();
            }
            s_raffleState = RaffleState.Calculating;
            uint256 requestId = i_vrfCoordinator.requestRandomWords (
                i_gasLane,
                s_subscriptionId,
                REQUEST_CONFIRMATIONS,
                i_callbackGasLimit,
                NUM_WORDS

            );
        emit RequestedRaffleWinner(requestId);
    }

    function fulfillRandomWords (
        uint256,
        uint256[] memory randomWords
    ) internal override {
            uint256 indexOfWinner = randomWords[0] % s_rafflePlayers.length;
            address payable recentWinner = s_rafflePlayers[indexOfWinner];
            s_recentWinner = recentWinner;
            s_rafflePlayers = new address payable[](0);
            s_raffleState = RaffleState.Open;
            s_lastTimeStamp = block.timestamp;
            emit WinnerPicked(recentWinner);
    }
    
    function transferNFT (address s_transferer, address s_receiver, uint256 tokenId) {
        require(msg.sender == s_owner, "Only the owner can call this function");
        address payable s_transferer = msg.sender;
        address payable s_receiver = s_recentWinner;
        transferFrom(s_transferer, s_receiver, tokenId);    
    }
    
}
