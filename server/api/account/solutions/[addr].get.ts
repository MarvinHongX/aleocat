export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.public.apiBase3;
    const addr: string = event.context.params.addr;
    const url: string = `${apiBase}/credits/addr/${addr}?page=0&page_size=500`;
    const response: any = await $fetch(url);

    return response;
})
