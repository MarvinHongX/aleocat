export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.apiBase3 as string;
    const query = getQuery(event);
    const url: string = `${apiBase}/programs/list?page=${query.page}&page_size=${query.pageSize}`;
    const response: any = await $fetch(url);

    return response;
})