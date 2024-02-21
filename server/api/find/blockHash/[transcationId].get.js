export default defineEventHandler(async (event) => {
    const config  = useRuntimeConfig();
    const apiBase = config.public.apiBase;

    const url = `${apiBase}/find/blockHash/${event.context.params.transcationId}`;
    const response = await $fetch(url);

    return response;
})