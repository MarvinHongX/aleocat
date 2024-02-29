export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.public.apiBase3;
    const query = getQuery(event);
    const url: string = `${apiBase}/aleo/credits/leaderboard/all?page=${query.page}&page_size=${query.pageSize}`;
    const response: any = await $fetch(url);

    return response;
})