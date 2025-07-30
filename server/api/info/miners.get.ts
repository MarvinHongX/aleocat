export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.apiBase3 as string;
    const url: string = `${apiBase}/miner/new/day`;
    const response: any = await $fetch(url);

    return response;
})