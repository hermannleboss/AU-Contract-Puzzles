const {loadFixture} = require('@nomicfoundation/hardhat-network-helpers');
const {assert} = require('chai');
const {Wallet, providers} = require("ethers");

describe('Game5', function () {
    async function deployContractAndSetVariables() {
        const Game = await ethers.getContractFactory('Game5');
        const game = await Game.deploy();
        const [signer] = await ethers.getSigners(100);

        return {game, signer};
    }

    it('should be a winner', async function () {
        const {game, signer} = await loadFixture(deployContractAndSetVariables);
        let randomWallet = ethers.Wallet.createRandom();

        while (randomWallet.address.toString() >= '0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf') {
            randomWallet = ethers.Wallet.createRandom();
        }
        randomWallet = randomWallet.connect(ethers.provider)
        const tx = {
            to: randomWallet.address,
            value: ethers.utils.parseEther("1"),
        }

        await signer.sendTransaction(tx)
        await game.connect(randomWallet).win();
        assert(await game.isWon(), 'You did not win the game');
    });
});
