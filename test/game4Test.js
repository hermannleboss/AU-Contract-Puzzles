const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();
    const [signer, signer2] = await ethers.getSigners(0);

    return { game, signer, signer2 };
  }
  it('should be a winner', async function () {
    const { game ,signer, signer2 } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}

    console.log("address",signer.getAddress())
    await game.connect(signer).write(await signer2.getAddress());
    await game.connect(signer2).win(signer.getAddress());


    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
