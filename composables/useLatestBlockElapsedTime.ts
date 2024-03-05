export const useLatestBlockElapsedTime = () => {
    return useState('latestBlockElapsedTime', (): string => '');
};