export const getAleoPrice = (
    aleoPrice: Ref<number>,
    aleoPriceChangePercentage: Ref<number>,
    loading12: Ref<boolean>, 
): void => {
    $fetch('/api/price')
        .then((response: AleoPrice) => {
            aleoPrice.value = response.price;
            aleoPriceChangePercentage.value = response.changePercentage;
            if (loading12.value) loading12.value = false;
        })
        .catch(error => {
            console.error('Error fetching aleo price:', error);
        });    
};


export const getLatestBlockAndSaveToLocalStorage = (
    localStorageKey: string
): Promise<boolean> => {
    return $fetch('/api/block/latest')
        .then((response: any) => {
            localStorage.setItem(localStorageKey, JSON.stringify(response));
            return true;
        })
        .catch(error => {
            console.error('Error fetching latest block:', error);
            return false;
        });
};


export const getLatestBlockFromLocalStorage = (
    latestBlock: Ref<Block | null>, 
    loading1: Ref<boolean>, 
    localStorageKey: string
): boolean => {
    const data: string | null = localStorage.getItem(localStorageKey);
    if (data) {
        const parsedData: any = JSON.parse(data);
        if (JSON.stringify(latestBlock.value) !== JSON.stringify(parsedData)) {
            latestBlock.value = parsedData;
            if (loading1.value) loading1.value = false;
            return true; 
        }
    }
    return false;
};


export const getTransactionsOfLatestBlock = (
    latestBlock: Ref<Block | null>, 
    loading3: Ref<boolean>, 
    transactions: Ref<Transaction[]>
): void => {
    if (latestBlock && latestBlock.value) {
        const block = latestBlock.value;
        if (block.header && block.header.metadata && block.header.metadata.height) {
            transactions.value = block.transactions.map((transaction: any) => {
                return {
                    index: transaction.index,
                    transactionId: transaction.transaction.id,
                    fee: sumInputsFee(transaction.transaction.fee.transition.inputs),
                    blockHeight: block.header.metadata.height,
                    status: transaction.status,
                    type: transaction.type,
                    timestamp: block.header.metadata.timestamp,
                    sortNo: `${block.header.metadata.height}-${transaction.index}`,
                };
            });
            if (loading3.value) loading3.value = false;
        };
    }
};


export const getBlocks = (
    start: number, 
    end: number, 
    loading2: Ref<boolean>, 
    blocks: Ref<Block[]>
): Promise<boolean> => {
    if (start && end) {
        $fetch(`/api/blocks?start=${start}&end=${end}`)
            .then((response: any) => {
                response.sort((a: any, b: any) => b.header.metadata.height - a.header.metadata.height);
                blocks.value = response;
                if (loading2.value) loading2.value = false;
                return true;
            })
            .catch(error => {
                console.error('Error fetching blocks:', error);
                return false;
            });
    }
    return Promise.resolve(false);
};


export const getBlockAndTransactionsAndSolutions = (
    blockHeightOrHash: Ref<string>,
    loading5: Ref<boolean>,
    loading3: Ref<boolean>,
    loading6: Ref<boolean>,
    block: Ref<Block | null>,
    transactions: Ref<Transaction[]>,
    solutions: Ref<Solution[]>
): void => {
    if (blockHeightOrHash.value) {
        const heightOrHash: string = blockHeightOrHash.value;
        $fetch(`/api/block/${heightOrHash}`)
            .then((response: any) => {
                block.value = response;

                if (loading5.value) loading5.value = false;
                
                transactions.value = response.transactions.map((transaction: any) => {
                    return {
                        index: transaction.index,
                        transactionId: transaction.transaction.id,
                        fee: sumInputsFee(transaction.transaction.fee.transition.inputs),
                        blockHeight: response.header.metadata.height,
                        status: transaction.status,
                        type: transaction.type,
                        timestamp: response.header.metadata.timestamp,
                        sortNo: `${response.header.metadata.height}-${transaction.index}`,
                    };
                });
                if (loading3.value) loading3.value = false;

                solutions.value = response.solutions.solutions.map((solution: any) => {
                    return {
                        address: solution.partial_solution.address,
                        nonce: solution.partial_solution.nonce,
                        commitment: solution.partial_solution.commitment,
                        sortNo: solution.partial_solution.address,
                    };
                });
                if (loading6.value) loading6.value = false;
            })
            .catch(error => {
                console.error('Error fetching block, transactions and solutions :', error);
                return false;
            });
    }
};


export const getValidators = (
    loading11: Ref<boolean>, 
    latestCommittee: Ref<Committee | null>, 
    validators: Ref<Validator[]>
): Promise<boolean> => {
    $fetch('/api/validators')
        .then((response: any) => {
            const responseValidators: any = response;
            latestCommittee.value = response
            const membersData: any = responseValidators.members;

            const sortedMembers: any = Object.entries(membersData)
                .map(([address, [stake, bondingState]]: any) => ({
                    address,
                    stake,
                    bondingState
                }))
                .sort((a: any, b: any) => b.stake - a.stake);

            sortedMembers.forEach((member: any, index: any) => {
                member.rank = index + 1;
            });

            validators.value = sortedMembers;
            
            if (loading11.value) loading11.value = false;
            return true;
        })
        .catch(error => {
            console.error('Error fetching validators:', error);
            return false;
        });
    return Promise.resolve(false);
};


export const getPrograms = (
    loading9: Ref<boolean>, 
    programs: Ref<Program[]>
): Promise<boolean> => {
    $fetch('/api/programs')
        .then((response: any) => {
            programs.value = response;
            if (loading9.value) loading9.value = false;
            return true;
        })
        .catch(error => {
            console.error('Error fetching programs:', error);
            return false;
        });
    return Promise.resolve(false);
};


export const getProgram = (
    programId: Ref<string>, 
    loading9: Ref<boolean>, 
    program: Ref<Program>
): void => {
    if (programId.value) {
        const id: string = programId.value;
        $fetch(`/api/program/${id}`)
            .then((response: string) => {
                program.value = {
                    id: id,
                    sourceCode: response,
                    transactionId: '',
                };

                $fetch(`/api/find/transactionId/${id}`)
                    .then((response: any) => {
                        program.value.transactionId = response;
                        if (loading9.value) loading9.value = false;
                    })
                    .catch(error => {
                        console.error('Error fetching program:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching program:', error);
            });
    }
};


export const getLatestTransactions = (
    latestBlock: Ref<Block | null>, 
    loading3: Ref<boolean>, 
    transactions: Ref<Transaction[]>
): void => {
    if (latestBlock.value && 
        latestBlock.value.header && 
        latestBlock.value.header.metadata && 
        latestBlock.value.header.metadata.height
    ) {
        const start: number = Math.max(latestBlock.value.header.metadata.height - 45, 1);
        const end: number = latestBlock.value.header.metadata.height;


        if (start && end) {
            $fetch(`/api/blocks?start=${start}&end=${end}`)
                .then((response: any) => {
                    transactions.value = response.flatMap((block: any) => {
                        return block.transactions.map((transaction: any) => {
                            return {
                                index: transaction.index,
                                transactionId: transaction.transaction.id,
                                fee: sumInputsFee(transaction.transaction.fee.transition.inputs),
                                blockHeight: block.header.metadata.height,
                                status: transaction.status,
                                timestamp: block.header.metadata.timestamp,
                                sortNo: `${block.header.metadata.height}-${transaction.index}`,
                            };
                        });
                    });

                    if (loading3.value) loading3.value = false;
                })
                .catch(error => {
                    console.error('Error fetching blocks:', error);
                });
        }
    }
};


export const getBlockAndTransactionAndTransitions = (
    transactionId: Ref<string>, 
    loading5: Ref<boolean>, 
    loading7: Ref<boolean>, 
    loading8: Ref<boolean>, 
    block: Ref<Block | null>, 
    transaction: Ref<Transaction | null>, 
    transitions: Ref<Transition[]>
): void => { 
    if (transactionId.value) {
        const id: string = transactionId.value;
        $fetch(`/api/find/blockHash/${id}`)
            .then((response: string) => {
                const responseHash: string = response;
                $fetch(`/api/block/${responseHash}`)
                    .then((response : any) => {
                        block.value = response;
                        if (loading5.value) loading5.value = false;
                    })
                    .catch(error => {
                        console.error('Error fetching block hash and block:', error);
                        return false;
                    });
            })
            .catch(error => {
                console.error('Error fetching block hash and block:', error);
                return false;
            });

        $fetch(`/api/transaction/${id}`)
            .then((response: any) => {
                transaction.value = {
                    index: 0,
                    transactionId: response.id,
                    fee: sumInputsFee(response.fee.transition.inputs),
                    blockHeight: block?.value?.header.metadata.height ?? 1,
                    status: response.status ,
                    type: response.type,
                    timestamp: block?.value?.header.metadata.timestamp ?? 2208988800,
                    sortNo: `${block?.value?.header.metadata.height}-0`,
                };
                if (loading7.value) loading7.value = false;

                transitions.value = response.execution.transitions.map((transition: any) => {
                    return {
                        transitionId: transition.id,
                        program: transition.program,
                        function: transition.function,
                        inputs: transition.inputs,
                        outputs: transition.outputs,
                        tpk: transition.tpk,
                        tcm: transition.tcm,
                        sortNo: `${response.id}-${transition.id}`,
                    };
                });
                if (loading8.value) loading8.value = false;         
            })
            .catch(error => {
                console.error('Error fetching transaction:', error);
                return false;
            });

    }
};


export const getAccount = (
    address: Ref<string>, 
    loading10: Ref<boolean>, 
    account: Ref<Account | null>
): void => {
    if (address.value) {
        const addr: string = address.value;
        $fetch(`/api/account/${addr}`)
            .then((response: any) => {
                account.value = response;
                if (loading10.value) loading10.value = false;
            })
            .catch(error => {
                console.error('Error fetching account:', error);
                return false;
            });
    }
};


export const getAccountTransitions = (
    address: Ref<string>, 
    loading8: Ref<boolean>, 
    transitions: Ref<Transition[]>
): void => {
    if (address.value) {
        const addr: string = address.value;
        $fetch(`/api/account/transitions/${addr}`)
            .then((response: any) => {
                transitions.value = response;
                if (loading8.value) loading8.value = false;
            })
            .catch(error => {
                console.error('Error fetching account transitions:', error);
                return false;
            });
    }
};