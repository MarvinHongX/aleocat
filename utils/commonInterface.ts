export interface LayoutConfig {
    darkTheme: boolean;
    language: Language;
    menuMode: string;
    theme: string;
    scale: number;
    activeMenuItem: any;
    isLoading: boolean;
}

export interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    profileSidebarVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
}

export interface Language {
    name: string;
    code: string;
}

export interface MenuLabel {
    [key: string]: string;
}

export interface MenuItem {
    label: string;
    route: string;
}

export interface Sentences {
    [key: string]: {
        ENG: string;
        KOR: string;
    };
}

export interface Labels {
    [key: string]: {
        ENG: string;
        KOR: string;
    };
}

export interface Label {
    [key: string]: {
        ENG: string;
        KOR: string;
    };
}

export interface ToastMessage {
    severity: string;
    summary: string;
    detail: string;
    life: number;
}

export interface NavigateOptions {
    path: string;
}

export interface StringInput {
    value: string;
}

export interface TransitionInput {
    type: string;
    id: string;
    value: string;
}

export interface AleoPrice {
    price: number;
    changePercentage: number;
}

export interface Block {
    block_hash: string;
    previous_hash: string;
    header: {
        previous_state_root: string;
        transactions_root: string;
        finalize_root: string;
        ratifications_root: string;
        solutions_root: string;
        subdag_root: string;
        metadata: {
            network: number;
            round: number;
            height: number;
            cumulative_weight: number;
            cumulative_proof_target: number;
            coinbase_target: number;
            proof_target: number;
            last_coinbase_target: number;
            last_coinbase_timestamp: number;
            timestamp: number;
        };
    };
    authority: {
        type: string;
        subdag: {
            subdag: {};
            election_certificate_ids: [];
        };
    };
    ratifications: {
        type: string;
        amount: number;
    }[];
    solutions: {
        solutions: {
            partial_solution: {
                address: string;
                nonce: number;
                commitment: string;
            };
        }[];
    };
    transactions: {
        index: number;
        transaction: {
            id: string;
            fee: {
                transition: {
                    inputs: TransitionInput[];
                };
            };
        };
        status: string;
        type: string;
    }[];

}

export interface Transaction {
    index: number;
    transactionId: string;
    fee: number;
    blockHeight: number;
    status: string;
    type: string;
    timestamp: number;
    sortNo: string;
}

export interface Transition {
    transition_id: string;
    block_height: number;
    timestamp: string;
    transfer_amount: string;
    address: string;
}

export interface TableParams {
    currentPage: number;
    pageSize: number;
    totalRecords: number;
}

export interface Solution {
    address: string;
    nonce: string;
    commitment: string;
    sortNo: string;
}

export interface Program {
    id: string;
    sourceCode: string;
    transactionId: string;
}

export interface Account {
    address: string;
    publicCredits: number;
}

export interface Members {
    [address: string]: [number, boolean];
}

export interface Committee {
    starting_round: number;
    members: Members;
    total_stake: number;
}

export interface Validator {
    address: string;
    stake: number;
    bondingState: boolean;
    rank: number;
}

export interface MinersInfo {
    total: number;
    new: number;
}

export interface Prover {
    address: string;
    totalPower: number;
    power: number;
    score: number;
    lastBlock: boolean;
    rank: number;
}

export interface LineChart{
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        fill: boolean;
        backgroundColor: string;
        borderColor: string;
        tension: number;
    }[];
}