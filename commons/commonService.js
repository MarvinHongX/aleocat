export const isLatestBlock = (latestBlock) => {  
    if (latestBlock && latestBlock.value && latestBlock.value.header && latestBlock.value.header.metadata && latestBlock.value.header.metadata.height) {
        return $fetch('/api/block/latestHeight')
            .then(response => {
                const latestHeight = response;
                return latestBlock.value.header.metadata.height === latestHeight;  
            })
            .catch(error => {
                console.error('Error fetching latest block height:', error);
                return false;
            });      
    }
    return false;
};


export const getLatestBlockAndSaveToLocalStorage = (localStorageKey) => {
    return $fetch('/api/block/latest')
        .then(response => {
            localStorage.setItem(localStorageKey, JSON.stringify(response));
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
        $fetch(`/api/blocks?start=${start}&end=${end}`)
            .then(response => {
                const responseBlocks = response;
                responseBlocks.sort((a, b) => b.header.metadata.height - a.header.metadata.height);
                blocks.value = responseBlocks;
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
        $fetch(`/api/block/${heightOrHash}`)
            .then((response) => {
                const responseBlock = response;
                block.value = responseBlock;

                if (loading5.value) loading5.value = false;
                
                transactions.value = responseBlock.transactions.map((transaction) => {
                    return {
                        index: transaction.index,
                        transactionId: transaction.transaction.id,
                        fee: sumInputsFee(transaction.transaction.fee.transition.inputs),
                        blockHeight: responseBlock.header.metadata.height,
                        status: transaction.status,
                        type: transaction.type,
                        timestamp: responseBlock.header.metadata.timestamp,
                        sortNo: `${responseBlock.header.metadata.height}-${transaction.index}`,
                    };
                });
                if (loading3.value) loading3.value = false;

                solutions.value = responseBlock.solutions.solutions.map((solution) => {
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
    $fetch('/api/validators')
        .then(response => {
            const responseValidators = response;
            validators.value = responseValidators;
            const membersData = responseValidators.members;

            const sortedMembers = Object.entries(membersData)
                .map(([address, [stake, bondingState]]) => ({
                    address,
                    stake,
                    bondingState
                }))
                .sort((a, b) => b.stake - a.stake);

            sortedMembers.forEach((member, index) => {
                member.rank = index + 1;
            });

            members.value = sortedMembers;
            
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
    $fetch('/api/programs')
        .then(response => {
            const responsePrograms = response;
            programs.value = responsePrograms;
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

        $fetch(`/api/program/${id}`)
            .then((response) => {
                const responseSourceCode = response
                program.value.sourceCode = responseSourceCode;
                return $fetch(`/api/find/transactionId/${id}`);
            })
            .then((response) => {
                const responseTransactionId = response
                program.value.transactionId = responseTransactionId;
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
            $fetch(`/api/blocks?start=${start}&end=${end}`)
                .then(response => {
                    const responseBlocks = response;
                    transactions.value = responseBlocks.flatMap((block) => {
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
        $fetch(`/api/find/blockHash/${id}`)
            .then((response) => {
                const responseHash = response;
                return $fetch(`/api/block/${responseHash}`);
            })
            .then((response) => {
                const responseBlock = response;
                block.value = responseBlock;

                if (loading5.value) loading5.value = false;
            })
            .catch(error => {
                console.error('Error fetching block hash and block:', error);
                return false;
            });

        $fetch(`/api/transaction/${id}`)
            .then((response) => {
                const responseTransaction = response;
                transaction.value = responseTransaction;
                if (loading7.value) loading7.value = false;

                transitions.value = responseTransaction.execution.transitions.map((transition) => {
                    return {
                        transitionId: transition.id,
                        program: transition.program,
                        function: transition.function,
                        inputs: transition.inputs,
                        outputs: transition.outputs,
                        tpk: transition.tpk,
                        tcm: transition.tcm,
                        sortNo: `${responseTransaction.id}-${transition.id}`,
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
        $fetch(`/api/account/${addr}`)
            .then((response) => {
                const responseAccount = response;
                account.value = responseAccount;
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
        $fetch(`/api/account/transitions/${addr}`)
            .then((response) => {
                const responseTransitions = response;
                transitions.value = responseTransitions;
                if (loading8.value) loading8.value = false;
            })
            .catch(error => {
                console.error('Error fetching account transitions:', error);
                return false;
            });
    }
};