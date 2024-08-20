export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.public.apiBase3;
    const url: string = `${apiBase}/credits/trending/score`;
    const response: any = await $fetch(url);

    return response;
})