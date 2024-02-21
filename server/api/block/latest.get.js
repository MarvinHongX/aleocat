export default defineEventHandler(async (event) => {
    const config  = useRuntimeConfig();
    const apiBase = config.public.apiBase;

    const url = `${apiBase}/latest/block`;
    const response = await $fetch(url);

    return response;
})