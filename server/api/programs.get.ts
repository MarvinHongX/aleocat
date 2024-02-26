export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.public.apiBase2;
    const url: string = `${apiBase}/explorer/programs`;
    const response: any = await $fetch(url);

    return response;
})