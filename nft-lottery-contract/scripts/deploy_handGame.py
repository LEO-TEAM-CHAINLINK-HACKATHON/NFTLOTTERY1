from brownie import handGame, config, network
from scripts.helpful_scripts import (
    BLOCK_CONFIRMATIONS_FOR_VERIFICATION,
    LOCAL_BLOCKCHAIN_ENVIRONMENTS,
    get_account,
    get_contract,
    is_verifiable_contract,
)
from web3 import Web3


def deploy_handGame():
    account = get_account()
    print(f"On network {network.show_active()}")
    subscription_id = config["networks"][network.show_active()]["subscription_id"]
    gas_lane = config["networks"][network.show_active()]["gas_lane"]
    vrf_coordinator = get_contract("vrf_coordinator")
    link_token = get_contract("link_token")
    entrance_fee = Web3.toWei(0.01, "ether")
    print(f"{entrance_fee}")

    hand_Game = handGame.deploy(
        subscription_id,
        vrf_coordinator,
        link_token,
        gas_lane,
        entrance_fee,
        {"from": account},
    )
    return hand_Game


def add_handGame_to_subscription(subscription_id, hand_Game):
    vrf_coordinator = get_contract("vrf_coordinator")
    subscription_details = vrf_coordinator.getSubscription(subscription_id)
    if hand_Game in subscription_details[3]:
        print(f"{hand_Game} is already in the subscription")
    else:
        print(
            f"Adding consumer to subscription {subscription_id} on address {hand_Game}"
        )
        account = get_account()
        tx = vrf_coordinator.addConsumer.transact(
            subscription_id, hand_Game.address, {"from": account}
        )
        tx.wait(1)
        print("Consumer added to subscription!")


def main():
    hand_Game = deploy_handGame()
    hand_Game = handGame[-1]
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        add_handGame_to_subscription(
            config["networks"][network.show_active()]["subscription_id"], hand_Game
        )
