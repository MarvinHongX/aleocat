import { getBlocks } from '@/commons/commonService';
import { getMenuItems, getLabels, getSentences } from '@/commons/commonLanguageService';

const { changeThemeSettings, changeLanguageSettings, layoutConfig } = useLayout();

export const search = (searchValue, toast, toastMessage) => {
    let { value } = searchValue;
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
        toast.add(toastMessage.value);
        return;
    }
    searchValue.value = '';
};

export const onChangeTheme = (theme, mode) => {
    const elementId = 'theme-css';
    const linkElement = document.getElementById(elementId);
    const cloneLinkElement = linkElement.cloneNode(true);
    const newThemeUrl = linkElement.getAttribute('href').replace(layoutConfig.theme.value, theme);

    cloneLinkElement.setAttribute('id', elementId + '-clone');
    cloneLinkElement.setAttribute('href', newThemeUrl);
    cloneLinkElement.addEventListener('load', () => {
        linkElement.remove();
        cloneLinkElement.setAttribute('id', elementId);
        changeThemeSettings(theme, mode === 'dark');
    });
    linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
};

export const onChangeLanguage = (selectedLanguage) => {
    const language = selectedLanguage.value;
    changeLanguageSettings(language);

    const menuItems = useMenuItems();
    const labels = useLabels();
    const sentences = useSentences();
    const loadingState = useLoadingState();
    const toastMessage = useToastMessage();


    menuItems.value = getMenuItems(selectedLanguage);
    labels.value = getLabels(selectedLanguage);
    sentences.value = getSentences(selectedLanguage);

    toastMessage.value.summary = sentences.value.searchResults;
    toastMessage.value.detail = sentences.value.noResultsFound;

    if (loadingState.value) loadingState.value = false;
};

export const sumInputsFee = (inputs) => {
    return inputs.reduce((accumulator, input) => {
        const value = input.value;
        if (typeof value === 'string' && value.endsWith('u64')) {
            accumulator += parseInt(value, 10);
        }
        return accumulator;
    }, 0);
};


export const toAleoScale = (value) => {
    let result = 0;
    if (typeof value === 'string' && value.endsWith('u64')) {
        result = parseInt(value, 10);
    } else {
        result = value;
    }
    const scaledResult = (result / 1000000.0).toFixed(6);
    return Number(scaledResult).toLocaleString(undefined, {minimumFractionDigits: 6, maximumFractionDigits: 6});
}

export const concatTransitionInputsOrOutputs = (inputs) => {
    return inputs.reduce((accumulator, input) => {
        accumulator += `${input.type}: ${input.id}, `;
        return accumulator;
    }, '').slice(0, -2); 
};
  
export const updateElapsedTime = (latestBlock, elapsedTime) => {
    if (latestBlock.value && latestBlock.value.header && latestBlock.value.header.metadata && latestBlock.value.header.metadata.timestamp) {
        const timestamp = latestBlock.value.header.metadata.timestamp;
        const currentTime = Math.floor(new Date().getTime() / 1000);
        const elapsedSeconds = currentTime - timestamp;

        let updatedElapsedTime = '';

        if (elapsedSeconds < 60) {
            updatedElapsedTime = `${elapsedSeconds}s ago`;
        } else {
            const elapsedMinutes = Math.floor(elapsedSeconds / 60);
            if (elapsedMinutes < 60) {
                updatedElapsedTime = `${elapsedMinutes}m ago`;
            } else {
                const elapsedHours = Math.floor(elapsedMinutes / 60);
                updatedElapsedTime = `${elapsedHours}h ago`;
            }
        }
        elapsedTime.value = updatedElapsedTime;
    }
};

export const fetchBlocksForPage = (blockParams, loading2, blocks) => {
    const { currentPage, pageSize, totalRecords } = blockParams.value;
    const start = Math.max(totalRecords - (currentPage * pageSize) + 1, 1);
    const end = totalRecords - ((currentPage - 1) * pageSize) + 1;
    getBlocks(start, end, loading2, blocks);
};

export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
};

export const getBadgeNetwork = (status) => {
    switch (status) {
        case 3:
            return 'info';
        default:
            return 'success';
    }
};

export const getNetwork = (status) => {
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

export const getBadgeStatus = (status) => {
    switch (status) {
        case 'accepted':
            return 'warning';
        default:
            return 'info';
    }
};

export const getBadgeType = (type) => {
    switch (type) {
        case 'execute':
            return 'success';
        default:
            return 'info';
    }
};

export const getBadgeBondingState = (status) => {
    switch (status) {
        case true:
            return 'success';
        default:
            return 'warning';
    }
};

export const getBondingState = (status) => {
    switch (status) {
        case true:
            return 'open';
        default:
            return 'closed';
    }
};