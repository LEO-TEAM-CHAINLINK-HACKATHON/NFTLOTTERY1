from brownie import handGame, config, network
from scripts.helpful_scripts import get_account, fund_with_link
import time
from web3 import Web3

entrance_fee = Web3.toWei(0.01, "ether")


def main():
    enterGame()
    pickType()


def enterGame():
    account = get_account()
    hand_Game = handGame[-1]
    tx = hand_Game.enterGame({"from": account, "value": entrance_fee})
    tx.wait(1)
    print(f"{account.address} entered the Game!")


HandType = {0: "ROCK", 1: "PAPER", 2: "SCISSORS"}
_handtype = 0


def pickType():
    account = get_account()
    hand_Game = handGame[-1]
    tx = hand_Game.pickType(_handtype, {"from": account})
    tx.wait(1)
    address = account.address
    print(f"{HandType[_handtype]} picked! Good luck!")
    print("Waiting for winner...")
    print(f"Player is {address}")
    time.sleep(100)
    computer_hand = HandType[hand_Game.computerHand()]
    print(f"Computer used {computer_hand}")
    if hand_Game.winner() == address:
        print(f"The winner is: {hand_Game.winner()}")
    else:
        print(f"Sorry, try next time! The winner is the contract {hand_Game.winner()}")
