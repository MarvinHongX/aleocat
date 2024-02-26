import { getBlocks } from '@/commons/commonService';
import { getMenuItems, getLabels, getSentences } from '@/commons/commonLanguageService';

const { changeThemeSettings, changeLanguageSettings, layoutConfig } = useLayout();

export const search = (searchValue: Ref<string>, toast: any, toastMessage: Ref<ToastMessage>): void => {
    let value: string = searchValue.value;
    const message: ToastMessage = toastMessage.value;
    value = value.trim().replace(/,/g, '');
    if (/^\d+$/.test(value) || value.startsWith('ab')) {
        navigateTo({
            path: `/block/${value}`,
        });
    } else if (value.startsWith('at')) {
        navigateTo({
            path: `/transaction/${value}`,
        })
    } else if (value.endsWith('.aleo')) {
        navigateTo({
            path: `/program/${value}`,
        });
    } else if (value.startsWith('aleo')) {
        navigateTo({
            path: `/account/${value}`,
        })
    } else {
        toast.add(message);
        return;
    }
    searchValue.value = '';
};

export const onChangeTheme = (theme: string, mode: string): void => {
    const elementId: string = 'theme-css';
    const linkElement: HTMLLinkElement | null = document.getElementById(elementId) as HTMLLinkElement | null;

    if (linkElement) {
        const cloneLinkElement: HTMLLinkElement = linkElement.cloneNode(true) as HTMLLinkElement;
        const newThemeUrl: string | null = linkElement.getAttribute('href');

        if (newThemeUrl) {
            const updatedThemeUrl: string = newThemeUrl.replace(layoutConfig.theme.value, theme);

            cloneLinkElement.setAttribute('id', elementId + '-clone');
            cloneLinkElement.setAttribute('href', updatedThemeUrl);
            cloneLinkElement.addEventListener('load', () => {
                if (linkElement.parentNode) {
                    linkElement.remove();
                    cloneLinkElement.setAttribute('id', elementId);
                    changeThemeSettings(theme, mode === 'dark');
                }
            });
            if (linkElement.parentNode) {
                linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
            }
        }
    }
};

export const onChangeLanguage = (selectedLanguage: Ref<Language>): void => {
    const language: Language = selectedLanguage.value;
    changeLanguageSettings(language);

    const menuItems = useMenuItems();
    const labels = useLabels();
    const sentences = useSentences();
    const loadingState = useLoadingState();
    const toastMessage = useToastMessage();

    menuItems.value = getMenuItems(selectedLanguage);
    labels.value = getLabels(selectedLanguage);
    sentences.value = getSentences(selectedLanguage);

    if (sentences.value) {
        toastMessage.value.summary = sentences.value.searchResults;
        toastMessage.value.detail = sentences.value.noResultsFound;
    }

    if (loadingState.value) loadingState.value = false;
};

export const sumInputsFee = (inputs: StringInput[]): number => {
    return inputs.reduce((accumulator: number, input: StringInput) => {
        const value: string = input.value;
        if (typeof value === 'string' && value.endsWith('u64')) {
            accumulator += parseInt(value, 10);
        }
        return accumulator;
    }, 0);
};

export const toAleoScale = (value: string | number | undefined): string => {
    let result: number = 0;

    if (typeof value === 'string' && value.endsWith('u64')) {
        result = parseInt(value, 10);
    } else {
        result = value as number;
    }

    const scaledResult: string = (result / 1000000.0).toFixed(6);
    return Number(scaledResult).toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 6 });
};

export const concatTransitionInputsOrOutputs = (inputs: TransitionInput[]): string => {
    return inputs.reduce((accumulator: string, input: TransitionInput) => {
        accumulator += `${input.type}: ${input.id}, `;
        return accumulator;
    }, '').slice(0, -2); 
};
  
export const updateElapsedTime = (latestBlock: Ref<Block | null>, elapsedTime: Ref<string>): void => {
    if (latestBlock.value && 
        latestBlock.value.header && 
        latestBlock.value.header.metadata && 
        latestBlock.value.header.metadata.timestamp
    ) {
        const timestamp: number = latestBlock.value.header.metadata.timestamp;
        const currentTime: number = Math.floor(new Date().getTime() / 1000);
        const elapsedSeconds: number = currentTime - timestamp;

        let updatedElapsedTime: string = '';

        if (elapsedSeconds < 60) {
            updatedElapsedTime = `${elapsedSeconds}s ago`;
        } else {
            const elapsedMinutes: number = Math.floor(elapsedSeconds / 60);
            if (elapsedMinutes < 60) {
                updatedElapsedTime = `${elapsedMinutes}m ago`;
            } else {
                const elapsedHours: number = Math.floor(elapsedMinutes / 60);
                updatedElapsedTime = `${elapsedHours}h ago`;
            }
        }
        elapsedTime.value = updatedElapsedTime;
    }
};

export const fetchBlocksForPage = (blockParams: Ref<BlockParams>, loading2: Ref<boolean>, blocks: Ref<Block[]>): void => {
    const { currentPage, pageSize, totalRecords } = blockParams.value;
    const start: number = Math.max(totalRecords - (currentPage * pageSize) + 1, 1);
    const end: number = totalRecords - ((currentPage - 1) * pageSize) + 1;
    getBlocks(start, end, loading2, blocks);
};

export const formatTimestamp = (timestamp: number | undefined, locale: string = 'en-US'): string => {
    if (timestamp === undefined) {
        return 'Invalid Timestamp';
    }

    const date = new Date(timestamp * 1000);
    
    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    const options: Intl.DateTimeFormatOptions = { 
        month: 'short', 
        day: '2-digit', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric', 
        hour12: true 
    };

    try {
        const formattedDate: string = new Intl.DateTimeFormat(locale, options).format(date);
        return formattedDate;
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Error formatting date';
    }
}; 

export const getBadgeNetwork = (status: number | undefined): string => {
    switch (status) {
        case 3:
            return 'info';
        default:
            return 'success';
    }
};

export const getNetwork = (status: number | undefined): string => {
    switch (status) {
        case 1:
            return 'testnet1';
        case 2:
            return 'testnet2';
        case 3:
            return 'testnet3';
        default:
            return 'mainnet';
    }
};

export const getBadgeStatus = (status: string): string => {
    switch (status) {
        case 'accepted':
            return 'warning';
        default:
            return 'info';
    }
};

export const getBadgeType = (type: string): string => {
    switch (type) {
        case 'execute':
            return 'success';
        default:
            return 'info';
    }
};

export const getBadgeBondingState = (status: boolean): string => {
    switch (status) {
        case true:
            return 'success';
        default:
            return 'warning';
    }
};

export const getBondingState = (status: boolean): string => {
    switch (status) {
        case true:
            return 'open';
        default:
            return 'closed';
    }
};