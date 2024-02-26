export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.public.apiBase;
    //const url: string = `${apiBase}/`;
    //const response: any = await $fetch(url);
    return {
        price: 1004,
        changePercentage: 77.7,
    }
    //return response;
})