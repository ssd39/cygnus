// Wallet.ride deploy script. To run execute `surfboard run path/to/script`

// wrap out script with async function to use fancy async/await syntax
(async () => {
    // Functions, available in tests, also available here
    const script = compile(file('game.ride'));

    const dappSeed = env.SEED; // Or use seed phrase from surfboard.config.json
    const ssTx = setScript({
        script,
        // additionalFee: 400000 // Uncomment to raise fee in case of redeployment
    }, dappSeed);
    await broadcast(ssTx).catch(e => console.error(e));
    await waitForTx(ssTx.id);
    console.log(ssTx.id);
})();
