export default defineEventHandler(async (event) => {
    const config  = useRuntimeConfig();
    const apiBase = config.public.apiBase;

    const url = `${apiBase}/program/credits.aleo/mapping/account/${event.context.params.addr}`;
    const response = await $fetch(url);

    return {
        address: event.context.params.addr,
        publicCredits: response,
        //creditsStaked: '0 Aleo credits',
        //publicCreditsReceived: '0 Aleo credits',
        //publicCreditsSent: '0 Aleo credits',
        //totalFeeSpent: '0 Aleo credits',
        //programsDeployed: 0,
        //lifetimeStakeReward: '0 Aleo credits',
        //lifetimePuzzleReward: '0 Aleo credits',
        //acceptedPuzzleSolutions: 906,
    };
})