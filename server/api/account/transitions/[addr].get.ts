export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    //const apiBase: string = config.apiBase3 as string;
    const apiBase: string = config.apiBase4 as string;
    const addr: string = event.context.params.addr;
    //const url: string = `${apiBase}/transactions/transfer/public_transfers/${addr}?page=0&page_size=500`;
    const url: string = `${apiBase}/transfer?a=${addr}&requestType=fetch&limit=500&offset=0`;
    const response: any = await $fetch(url);

    return response;
})