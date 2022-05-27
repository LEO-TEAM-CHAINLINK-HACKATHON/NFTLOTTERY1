from brownie import network, accounts, config, Raffle
from scripts.helpful_scripts import get_account


def main():
    account = get_account()
    # Chainlink subscription ID
    subscription_id = 4169
    coordinator_addr = "0x6168499c0cFfCaCD319c818142124B7A15E857ab"
    keyhash = "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc"
    # In Unix Epoch timestamp
    ballot_date = 1653399369
    print(network.show_active())
    NFT_Raffle = Raffle.deploy(
        subscription_id,
        coordinator_addr,
        keyhash,
        ballot_date,
        {"from": account},
        publish_source=True,
    )
    return NFT_Raffle
