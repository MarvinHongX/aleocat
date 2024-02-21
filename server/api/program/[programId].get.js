export default defineEventHandler(async (event) => {
    const config  = useRuntimeConfig();
    const apiBase = config.public.apiBase;

    const url = `${apiBase}/program/${event.context.params.programId}`;
    const response = await $fetch(url);

    return response;
})