export const useCommonConstant = () => {
    return {
        LOCAL_STORAGE_KEY: 'LATEST_BLOCK' as const,
        INTERVAL_THRESHOLD: 1000 as const,
        LOADING_THRESHOLD: 30 as const,
    };
};
