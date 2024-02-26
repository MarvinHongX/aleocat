export const useLoadingState = () => {
    return useState('loadingState', () => true);
};