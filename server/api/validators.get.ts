export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.apiBase as string;
    const url: string = `${apiBase}/committee/latest`;
    const response: any = await $fetch(url);

    return response;
})