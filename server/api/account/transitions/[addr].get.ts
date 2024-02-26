export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.public.apiBase2;
    const addr: string = event.context.params.addr;
    const url: string = `${apiBase}/address/${addr}?pageSize=500`;
    const response: any = await $fetch(url);

    return response;
})