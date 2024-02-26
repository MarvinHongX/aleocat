export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.public.apiBase;
    const programId: string = event.context.params.programId;
    const url: string = `${apiBase}/find/transactionID/deployment/${programId}`;
    const response: any = await $fetch(url);

    return response;
})