export default defineEventHandler(async (event) => {
    const config  = useRuntimeConfig();
    const apiBase = config.public.apiBase2;

    const url = `${apiBase}/address/${event.context.params.addr}?pageSize=500`;
    const response = await $fetch(url);

    return response;
})