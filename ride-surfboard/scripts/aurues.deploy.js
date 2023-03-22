(async () => {
    const dappSeed = env.SEED;
    const issueTx = issue({
        name: 'Aurues',
        description: 'In game currency of cygnus.',
        quantity: 100000,
        decimals: 2,
        chainId: 'T',
        reissuable: true
    }, dappSeed)
    await broadcast(issueTx).catch(e => console.error(e));
    await waitForTx(issueTx.id);
    console.log(issueTx.id);
})();