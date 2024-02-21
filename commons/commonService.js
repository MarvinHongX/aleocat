export const isLatestBlock = (latestBlock) => {  
    if (latestBlock && latestBlock.value && latestBlock.value.header && latestBlock.value.header.metadata && latestBlock.value.header.metadata.height) {
        return useFetch('/api/block/latestHeight')
            .then(response => {
                const latestHeight = response.data.value;
                return latestBlock.value.header.metadata.height === latestHeight;  
            })
            .catch(error => {
                console.error('Error fetching latest block height:', error);
                return false;
            });      
    }
    return false;
};


export const fetchDataAndSaveToLocalStorage = (localStorageKey) => {
    return useFetch('/api/block/latest')
        .then(response => {
            const latestBlock = response.data;
            localStorage.setItem(localStorageKey, JSON.stringify(latestBlock.value));
            return true;
        })
        .catch(error => {
            console.error('Error fetching latest block:', error);
            return false;
        });
};


export const getLatestBlockFromLocalStorage = (latestBlock, loading1, localStorageKey) => {
    const data = localStorage.getItem(localStorageKey);
    if (data) {
        const parsedData = JSON.parse(data);
        if (JSON.stringify(latestBlock.value) !== JSON.stringify(parsedData)) {
            latestBlock.value = parsedData;
            if (loading1.value) loading1.value = false;
            return true; 
        }
    }
    return false;
};



export const getTransactionsOfLatestBlock = (latestBlock, loading3, transactions) => {
    if (latestBlock && latestBlock.value) {
        const block = latestBlock.value;
        if (block.header && block.header.metadata && block.header.metadata.height) {
            transactions.value = block.transactions.map((transaction) => {
                return {
                    transactionId: transaction.transaction.id,
                    fee: sumInputsFee(transaction.transaction.fee.transition.inputs),
                    blockHeight: block.header.metadata.height,
                    timestamp: block.header.metadata.timestamp,
                    sortNo: `${block.header.metadata.height}-${transaction.index}`,
                };
            });
            if (loading3.value) loading3.value = false;
        };
    }

};

export const getBlocks = (start, end, loading2, blocks) => {
    if (start && end) {
        useFetch(`/api/blocks?start=${start}&end=${end}`)
            .then(response => {
                const responseBlocks = response.data;
                responseBlocks.value.sort((a, b) => b.header.metadata.height - a.header.metadata.height);
                blocks.value = responseBlocks.value;
                if (loading2.value) loading2.value = false;
                return true;
            })
            .catch(error => {
                console.error('Error fetching blocks:', error);
                return false;
            });
    }
    return false;
};



export const getBlockAndTransactionsAndSolutions = (blockHeightOrHash, loading5, loading3, loading6, block, transactions, solutions) => {
    if (blockHeightOrHash.value) {
        const heightOrHash = blockHeightOrHash.value
        useFetch(`/api/block/${heightOrHash}`)
            .then((response) => {
                const responseBlock = response.data
                block.value = responseBlock.value;

                if (loading5.value) loading5.value = false;
                
                transactions.value = responseBlock.value.transactions.map((transaction) => {
                    return {
                        index: transaction.index,
                        transactionId: transaction.transaction.id,
                        fee: sumInputsFee(transaction.transaction.fee.transition.inputs),
                        blockHeight: responseBlock.value.header.metadata.height,
                        status: transaction.status,
                        type: transaction.type,
                        timestamp: responseBlock.value.header.metadata.timestamp,
                        sortNo: `${responseBlock.value.header.metadata.height}-${transaction.index}`,
                    };
                });
                if (loading3.value) loading3.value = false;

                solutions.value = responseBlock.value.solutions.solutions.map((solution) => {
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




export const getValidators = (loading11, validators, members) => {
    useFetch('/api/validators')
        .then(response => {
            const responseValidators = response.data;
            validators.value = responseValidators.value;
            const membersData = responseValidators.value.members;

            members.value = Object.entries(membersData).map(([address, [stake, bondingState]], index) => {
                return {
                    rank: index + 1,
                    address,
                    stake,
                    bondingState
                };
            });

            if (loading11.value) loading11.value = false;
            return true;
        })
        .catch(error => {
            console.error('Error fetching validators:', error);
            return false;
        });
    return false;
};




export const getPrograms = (loading9, programs) => {
    useFetch('/api/programs')
        .then(response => {
            const responsePrograms = response.data;
            programs.value = responsePrograms.value;
            if (loading9.value) loading9.value = false;
            return true;
        })
        .catch(error => {
            console.error('Error fetching programs:', error);
            return false;
        });
    return false;
};




export const getProgram = (programId, loading9, program) => {
    if (programId.value) {
        const id = programId.value;
        program.value = { id: id };

        useFetch(`/api/program/${id}`)
            .then((response) => {
                const responseSourceCode = response.data
                program.value.sourceCode = responseSourceCode.value;
                return useFetch(`/api/find/transactionId/${id}`);
            })
            .then((response) => {
                const responseTransactionId = response.data
                program.value.transactionId = responseTransactionId.value;
                if (loading9.value) loading9.value = false;
            })
            .catch(error => {
                console.error('Error fetching program:', error);
                return false;
            });
    }
};




export const getLatestTransactions = (latestBlock, loading3, transactions) => {
    if (latestBlock.value && latestBlock.value.header && latestBlock.value.header.metadata && latestBlock.value.header.metadata.height) {
        const start = Math.max(latestBlock.value.header.metadata.height - 45, 1);
        const end = latestBlock.value.header.metadata.height;


        if (start && end) {
            useFetch(`/api/blocks?start=${start}&end=${end}`)
                .then(response => {
                    const responseBlocks = response.data;
                    transactions.value = responseBlocks.value.flatMap((block) => {
                        return block.transactions.map((transaction) => {
                            return {
                                transactionId: transaction.transaction.id,
                                fee: sumInputsFee(transaction.transaction.fee.transition.inputs),
                                blockHeight: block.header.metadata.height,
                                timestamp: block.header.metadata.timestamp,
                                sortNo: `${block.header.metadata.height}-${transaction.index}`,
                            };
                        });
                    });

                    if (loading3.value) loading3.value = false;
                    return true;
                })
                .catch(error => {
                    console.error('Error fetching blocks:', error);
                    return false;
                });
        }
        return false;
    }
};




export const getBlockAndTransactionAndTransitions = (transactionId, loading5, loading7, loading8, block, transaction, transitions) => {
    if (transactionId.value) {
        const id = transactionId.value;
        useFetch(`/api/find/blockHash/${id}`)
            .then((response) => {
                const responseHash = response.data;
                return useFetch(`/api/block/${responseHash.value}`);
            })
            .then((response) => {
                const responseBlock = response.data
                block.value = responseBlock.value;

                if (loading5.value) loading5.value = false;
            })
            .catch(error => {
                console.error('Error fetching block hash and block:', error);
                return false;
            });

        useFetch(`/api/transaction/${id}`)
            .then((response) => {
                const responseTransaction = response.data;
                transaction.value = responseTransaction.value;
                if (loading7.value) loading7.value = false;

                transitions.value = responseTransaction.value.execution.transitions.map((transition) => {
                    return {
                        transitionId: transition.id,
                        program: transition.program,
                        function: transition.function,
                        inputs: transition.inputs,
                        outputs: transition.outputs,
                        tpk: transition.tpk,
                        tcm: transition.tcm,
                        sortNo: `${responseTransaction.value.id}-${transition.id}`,
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


export const getAccount = (address, loading10, account) => {
    if (address.value) {
        const addr = address.value;
        useFetch(`/api/account/${addr}`)
            .then((response) => {
                const responseAccount = response.data;
                account.value = responseAccount.value;
                if (loading10.value) loading10.value = false;
            })
            .catch(error => {
                console.error('Error fetching account:', error);
                return false;
            });
    }
};




export const getAccountTransitions = (address, loading8, transitions) => {
    if (address.value) {
        const addr = address.value;
        useFetch(`/api/account/transitions/${addr}`)
            .then((response) => {
                const responseTransitions = response.data;
                transitions.value = responseTransitions.value;
                if (loading8.value) loading8.value = false;
            })
            .catch(error => {
                console.error('Error fetching account transitions:', error);
                return false;
            });
    }
};