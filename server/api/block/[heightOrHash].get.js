export default defineEventHandler(async (event) => {
    const config  = useRuntimeConfig();
    const apiBase = config.public.apiBase;

    const url = `${apiBase}/block/${event.context.params.heightOrHash}`;
    const response = await $fetch(url);

    return response;
})