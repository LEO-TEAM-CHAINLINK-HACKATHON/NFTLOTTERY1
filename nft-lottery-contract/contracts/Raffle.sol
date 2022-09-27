// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Raffle

// Enter lottery paying some fees
// Pick a random winner
//Winner to be selected every x

// chainlink oracle
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";

error Raffle_NotEnoughETHEntered();
error Raffle_TransferFailed();

abstract contract Raffle is VRFConsumerBaseV2 {
    /* state variables */
    uint256 private immutable i_entranceFee;
    address payable[] private s_players;
    address payable private s_winner;
    VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
    bytes32 private immutable i_gasLane;
    uint64 private immutable i_subscriptionId;
    uint32 private immutable i_callbackGasLimit;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private constant NUM_WORDS = 1;

    // Lottery Variables
    address private s_recentWinnner;

    /* events */
    event RaffleEnter(address indexed player);
    event RequestRaffleWinner(uint256 indexed requestId);
    event WinnerPicked(address indexed winner);

    constructor(
        address vrfCoordinatorV2,
        uint256 entranceFee,
        bytes32 gasLane,
        uint64 subscriptionId,
        uint32 callbackGasLimit
    ) VRFConsumerBaseV2(vrfCoordinatorV2) {
        i_entranceFee = entranceFee;
        i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
        i_gasLane = gasLane;
        i_subscriptionId = subscriptionId;
        i_callbackGasLimit = callbackGasLimit;
    }

    function enterRaffle() public payable {
        // require msg.value > i_entranceFee, "Not enough"
        if (msg.value < i_entranceFee) {
            revert Raffle_NotEnoughETHEntered();
        }
        s_players.push(payable(msg.sender));
        emit RaffleEnter(msg.sender);
    }
    /** 
     * @dev This is the function that the chainlink keeper nodes call 
     * they look for the 'upkeepNeeded' to return true
     * 1. Our time interval has passed
     * 2. We have enough players and some Eth
     * 3. Our subscription is funded in LINK
     * 4. Lottery should be in "open" state
     */
    */
    function checkupkeep(
        checkData bytes /*calldata*/ 
        ) external override{}
    // Pick ramdom winner

    function RequestRandomWinner() external {
        // get the random number from chainlink oracle
        //Once got it, pick a random winner
        uint256 requestId = i_vrfCoordinator.requestRandomWords(
            i_gasLane, // gas lane
            i_subscriptionId, // subscription id
            REQUEST_CONFIRMATIONS,
            i_callbackGasLimit,
            NUM_WORDS
        );
        emit RequestRaffleWinner(requestId);
    }

    /*View / Pure functions */

    function fullfillRandomWords(
        uint256, // requestId,
        uint256[] memory randomWords
    ) internal {
        uint256 indexOfWinner = randomWords[0] % s_players.length;
        address payable recentWinner = s_players[indexOfWinner];
        s_recentWinnner = recentWinner;
        (bool success, ) = recentWinner.call{value: address(this).balance}("");

        // require(success, "Transfer failed");
        if (!success) {
            revert Raffle_TransferFailed();
        }

        emit WinnerPicked(recentWinner);
    }

    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }

    function getRecentWinner() public view returns (address) {
        return s_recentWinnner;
    }
}
