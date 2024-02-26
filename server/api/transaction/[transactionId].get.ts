export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.public.apiBase;
    const transactionId: string = event.context.params.transactionId;
    const url: string = `${apiBase}/transaction/${transactionId}`;
    const response: any = await $fetch(url);

    return response;
})