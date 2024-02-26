export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.public.apiBase;
    const addr: string = event.context.params.addr;
    const url: string = `${apiBase}/program/credits.aleo/mapping/account/${addr}`;
    const response: any = await $fetch(url);

    return {
        address: addr,
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