export default defineEventHandler(async (event) => {
    const config  = useRuntimeConfig();
    const apiBase = config.public.apiBase2;

    const url = `${apiBase}/explorer/programs`;
    const response = await $fetch(url);

    return response;
})