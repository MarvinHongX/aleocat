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

export const toProverScoreScale = (value: number): string => {
    const scaledResult: string =  (value / 1000000.0)?.toFixed(6)
    return Number(scaledResult).toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 6 });
};

export const toProverScorePercentScale = (score: number, totalPower: number): string => {
    if (totalPower !== 0) {
        const percentage = (score * 100 / totalPower).toFixed(2);
        return percentage;
    } else {
        return "0";
    }
};

export const concatTransitionInputsOrOutputs = (inputs: TransitionInput[]): string => {
    return inputs.reduce((accumulator: string, input: TransitionInput) => {
        accumulator += `${input.type}: ${input.id}, `;
        return accumulator;
    }, '').slice(0, -2); 
};


export const getElapsedTime = (timestamp: number): string => {
    let elapsedTime: string = '';

    const currentTime: number = Math.floor(new Date().getTime() / 1000);
    const elapsedSeconds: number = currentTime - timestamp;

    if (elapsedSeconds < 60) {
        elapsedTime = `${elapsedSeconds}s ago`;
    } else {
        const elapsedMinutes: number = Math.floor(elapsedSeconds / 60);
        if (elapsedMinutes < 60) {
            const remainingSeconds: number = elapsedSeconds % 60;
            elapsedTime = `${elapsedMinutes}m ${remainingSeconds}s ago`;
        } else {
            const elapsedHours: number = Math.floor(elapsedMinutes / 60);
            elapsedTime = `${elapsedHours}h ago`;
        }
    }

    return elapsedTime;
};

export const updateElapsedTime = (latestBlock: Ref<Block | null>, elapsedTime: Ref<string>): void => {
    if (latestBlock.value && 
        latestBlock.value.header && 
        latestBlock.value.header.metadata && 
        latestBlock.value.header.metadata.timestamp
    ) { 
        const timestamp: number = latestBlock.value.header.metadata.timestamp;
        elapsedTime.value = getElapsedTime(timestamp);
    }
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
        year: 'numeric',
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


export const formatTimestampYYYYMMDD = (timestamp: number | undefined, locale: string = 'en-US'): string => {
    if (timestamp === undefined) {
        return 'Invalid Timestamp';
    }

    const date = new Date(timestamp * 1000);
    
    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}; 


export const shortenStr = (str: string, prefixLength: number = 7, suffixLength: number = 7): string => {
    if (!str || typeof str !== 'string') {
        return '';
    }

    const maxLength: number = prefixLength + suffixLength + 3; // 3 is for '...'
    if (str.length <= maxLength) {
        return str; // No need to shorten
    }

    const prefix: string = str.slice(0, prefixLength);
    const suffix: string = str.slice(-suffixLength);

    return `${prefix}...${suffix}`;
}


export const formatNumberWithCommas = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


export const shortenNum = (num: number): string => {
    const TRILLION: number = 1e12;
    const BILLION: number = 1e9;
    const MILLION: number = 1e6;
    const THOUSAND: number = 1e3;
    
    if (num >= TRILLION) {
        return (num / TRILLION).toFixed(2).replace(/\.0$/, '') + 'T';
    } else if (num >= BILLION) {
        return (num / BILLION).toFixed(2).replace(/\.0$/, '') + 'B';
    } else if (num >= MILLION) {
        return (num / MILLION).toFixed(2).replace(/\.0$/, '') + 'M';
    } else if (num >= THOUSAND) {
        return (num / THOUSAND).toFixed(2).replace(/\.0$/, '') + 'K';
    } else {
        return formatNumberWithCommas(num);
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


export const proverScorePercentScaleClass = (rank: number): string => {
    if (rank === 1) {
        return 'text-red-500 ml-3 font-medium';
    } else if (rank === 2) {
        return 'text-orange-500 ml-3 font-medium';
    } else if (rank === 3) {
        return 'text-yellow-500 ml-3 font-medium';
    } else if (rank === 4) {
        return 'text-green-500 ml-3 font-medium';
    } else {
        return 'text-blue-500 ml-3 font-medium';
    }
};


export const proverScorePercentScaleBarClass = (rank: number): string => {
    if (rank === 1) {
        return 'bg-red-500 h-full';
    } else if (rank === 2) {
        return 'bg-orange-500 h-full';
    } else if (rank === 3) {
        return 'bg-yellow-500 h-full';
    } else if (rank === 4) {
        return 'bg-green-500 h-full';
    } else {
        return 'bg-blue-500 h-full';
    }
}