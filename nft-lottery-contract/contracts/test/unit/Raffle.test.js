const { assert } = require("chai")
const { getNamedAccounts, deployments, ethers, network } = require("hardhat")

const { developementChains, networkConfig } = require("/../..helper-hardhat-config")

!developementChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Unit Tests", async function () {
          let raffle, vrfCoordinatorV2Mock, interval, deployer
          const chainId = network.config.chainId

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              raffle = await ethers.getContract("Raffle", deployer)
              vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer)
              interval = await raffle.getInterval()
          })
          describe("constructor", function () {
              it("initialize the raffle correctly", async function () {
                  // Ideally 1 assert per it
                  const raffleState = (await raffle.getRaffleState()).toString()
                  assert.equal(raffleState, "0")
                  assert.equal(interval.toString(), networkConfig[chainId]["keepersUpdateInterval"])
              })
          })
      })
