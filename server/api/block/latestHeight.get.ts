export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.public.apiBase;
    const url: string = `${apiBase}/latest/height`;
    const response: any = await $fetch(url);

    return response;
})