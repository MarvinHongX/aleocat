export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.apiBase as string;
    const transcationId: string = event.context.params.transcationId;
    const url: string = `${apiBase}/find/blockHash/${transcationId}`;
    const response: any = await $fetch(url);

    return response;
})