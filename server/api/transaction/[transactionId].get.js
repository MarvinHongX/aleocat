export default defineEventHandler(async (event) => {
    const config  = useRuntimeConfig();
    const apiBase = config.public.apiBase;

    const url = `${apiBase}/transaction/${event.context.params.transactionId}`;
    const response = await $fetch(url);

    return response;
})