const { assert } = require("chai")
const { getNamedAccounts, deployments, ethers, network } = require("hardhat")

const { developementChains, networkConfig } = require("/../..helper-hardhat-config")

!developementChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Unit Tests", async function () {
          let raffle, vrfCoordinatorV2Mock, interval
          const chainId = network.config.chainId

          beforeEach(async function () {
              const { deployer } = await getNamedAccounts()
              await deployments.fixture(["all"])
              raffle = await ethers.getContract("Raffle", deployer)
              vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer)
          })
          describe("constructor", function () {
              it("initialize the raffle correctly", async function () {
                  // Ideally 1 assert per it
                  const raffleState = (await raffle.getRaffleState()).toString()
                  assert.equal(raffleState, "0")
                  interval = await raffle.getInterval()
                  assert.equal(interval.toString(), networkConfig[chainId]["keepersUpdateInterval"])
              })
          })
      })
