export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.public.apiBasePrice;
    const apiKey: string = config.public.apiPriceKey;
    // const url: string = `${apiBase}/tickers/aleo-aleo-bsc`;
    const url: string = `${apiBase}/cryptocurrency/quotes/latest`;
    
    const response: any = await $fetch(url, {
        params: {
          symbol: 'aleo', 
          convert: 'USD'
        },
        headers: {
          'X-CMC_PRO_API_KEY': apiKey,
        },
    });
    
    return response;
})