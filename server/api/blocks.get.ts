export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.public.apiBase;
    const query = getQuery(event);
    const url: string = `${apiBase}/blocks?start=${query.start}&end=${query.end}`;
    const response: any = await $fetch(url);

    return response;
})