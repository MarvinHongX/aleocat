export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.apiBase3 as string;
    const addr: string = event.context.params.addr;
    const url: string = `${apiBase}/transactions/transfer/public_transfers/${addr}?page=0&page_size=500`;
    const response: any = await $fetch(url);

    return response;
})