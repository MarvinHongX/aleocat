export default defineEventHandler(async (event) => {
    const config  = useRuntimeConfig();
    const apiBase = config.public.apiBase;

    const query = getQuery(event);
    const url = `${apiBase}/blocks?start=${query.start}&end=${query.end}`;
    const response = await $fetch(url);

    return response;
})