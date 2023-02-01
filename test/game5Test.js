const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();
    let randomWallet = ethers.Wallet.createRandom();

    return { game , randomWallet};
  }
  it('should be a winner', async function () {
    const { game} = await loadFixture(deployContractAndSetVariables);
    const lowAddress = ethers.utils.hexZeroPad(ethers.utils.hexlify(ethers.constants.MaxUint256.toHexString()), 20);

    // const lowAddress = ethers.utils.hexZeroPad(ethers.utils.hexlify(ethers.constants.MaxUint256), 20);
    const lowAddressWallet = new ethers.Wallet(lowAddress);
    await game.connect(lowAddressWallet).win();
    console.log("lowAddress", lowAddress)
    assert(await game.isWon(), 'You did not win the game');
  });
});
