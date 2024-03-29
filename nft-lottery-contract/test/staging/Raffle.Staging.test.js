const { assert, expect } = require("chai")
const { getNamedAccounts, deployments, ethers, network } = require("hardhat")

const { developmentChains } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Staging Tests", function () {
          let raffle, vrfCoordinatorV2Mock, interval, deployer, raffleEntranceFee
          const chainId = network.config.chainId

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              raffle = await ethers.getContract("Raffle", deployer)
              //   vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer)
              //   interval = await raffle.getInterval()
              raffleEntranceFee = await raffle.getEntranceFee()
          })

          describe("fulfillRandomWords", function () {
              it("works with live chainlink keepers and  chainlink vrf, got random winner", async function () {
                  console.log("setting up test")
                  const startingTimeStamp = await raffle.getLastTimeStamp()
                  const accounts = await ethers.getSigners()
                  console.log("Setting up listener...")

                  await new Promise(async (resolve, reject) => {
                      // set up listener before user enter raffle
                      //just in case blockchain runs fast
                      raffle.once("WinnerPicked", async () => {
                          console.log("winner picked event fired")

                          try {
                              const recentWinner = await raffle.getRecentWinner()
                              console.log("recent winner", recentWinner)
                              const raffleState = await raffle.getRaffleState()
                              console.log("raffle state", raffleState)
                              const winnerEndingBalance = await accounts[0].getBalance()
                              console.log("winner ending balance", winnerEndingBalance.toString())
                              const endingTimeStamp = await raffle.getLastTimeStamp()
                              await expect(raffle.getPlayer(0)).to.be.reverted
                              assert.equal(recentWinner.toString(), accounts[0].address)
                              console.log("checkpoint 1")
                              assert.equal(raffleState, 0)
                              console.log("checkpoint 2")
                              assert.equal(
                                  winnerEndingBalance.toString(),
                                  winnerStartingBalance.add(raffleEntranceFee).toString()
                              )
                              console.log("checkpoint 3")
                              assert(endingTimeStamp > startingTimeStamp)
                              console.log("checkpoint 4")
                              resolve()
                          } catch (error) {
                              console.log(error)
                              reject(error)
                          }
                      })
                      // then enter raffle
                      console.log("entering raffle...")

                      const tx = await raffle.enterRaffle({ value: raffleEntranceFee })
                      await tx.wait(1)
                      console.log("Ok, time to wait...")
                      const winnerStartingBalance = await accounts[0].getBalance()
                      console.log("winner starting balance", winnerStartingBalance.toString())

                      // all code below will only complete when listener has finised its job
                  })
              })
          })
      })
