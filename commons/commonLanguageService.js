export const getMenuItems = (selectedLanguage) => {
    const language = selectedLanguage.value.code;
    const menuLabels = {
        'KOR': {
            validators: '검증자',
            programs: '프로그램',
            blocks: '블록',
            transactions: '트랜잭션',
        },
        'ENG': {
            validators: 'Validators',
            programs: 'Programs',
            blocks: 'Blocks',
            transactions: 'Transactions',
        },
    };

    return Object.keys(menuLabels[language]).map(key => ({
        label: menuLabels[language][key],
        route: key === 'home' ? '/' : `/${key}`,
    }));
};


export const getSentences = (selectedLanguage) => {
    const language = selectedLanguage.value.code;
    const sentences = {
        noResultsFound: {
            ENG: 'No results found.',
            KOR: '결과를 찾을 수 없습니다.'
        },
        searchBy: {
            ENG: 'Search by Block / Transaction ID / Program ID / Address',
            KOR: '블록 / 트랜잭션ID / 프로그램ID / 주소 로 검색하세요.'
        },
        searchResults: {
            ENG: 'Search Results',
            KOR: '검색 결과'
        },
        keywordSearch: {
            ENG: 'Keyword Search',
            KOR: '키워드 검색'
        },
        footerMsg1: {
            ENG: 'Your Premier Block Explorer and Analytics Platform for Aleo',
            KOR: '알레오 블록 탐색기 및 분석 플랫폼'
        },
        skyzoneMsg1: {
            ENG: 'TOTALSHIFT CLOUD SYSTEM',
            KOR: '토탈쉬프트 클라우드 시스템'
        },
        skyzoneMsg2: {
            ENG: 'The Skyzone',
            KOR: '더 스카이존'
        },
    };
    return {
        noResultsFound: sentences.noResultsFound[language],
        searchBy: sentences.searchBy[language],
        searchResults: sentences.searchResults[language],
        keywordSearch: sentences.keywordSearch[language],
        footerMsg1: sentences.footerMsg1[language],
        skyzoneMsg1: sentences.skyzoneMsg1[language],
        skyzoneMsg2: sentences.skyzoneMsg2[language],
    };
};





export const getLabels = (selectedLanguage) => {
    const language = selectedLanguage.value.code;
    const labels = {
        acceptedPuzzleSolutions: {
            ENG: 'Accepted Puzzle Solutions',
            KOR: '수용된 퍼즐 솔루션들'
        },
        acceptedSolutions: {
            ENG: 'Accepted Solutions',
            KOR: '수용된 솔루션들'
        },
        account: {
            ENG: 'Account',
            KOR: '계정'
        },
        address: {
            ENG: 'Address',
            KOR: '주소'
        },
        addressStats: {
            ENG: 'Address Stats',
            KOR: '주소 통계'
        },
        aleoPrice: {
            ENG: 'ALEO Price',
            KOR: '알레오 가격'
        },
        block: {
            ENG: 'Block',
            KOR: '블록'
        },
        blockHash: {
            ENG: 'Block Hash',
            KOR: '블록 해쉬'
        },
        blockHeight: {
            ENG: 'Block Height',
            KOR: '블록 높이'
        },
        bondingState: {
            ENG: 'Bonding State',
            KOR: '연결 상태'
        },
        clear: {
            ENG: 'Clear',
            KOR: '초기화'
        },
        coinbaseReward: {
            ENG: 'Coinbase Reward',
            KOR: '코인베이스 보상'
        },
        coinbaseTarget: {
            ENG: 'Coinbase Target',
            KOR: '코인베이스 대상'
        },
        commitment: {
            ENG: 'Commitment',
            KOR: '약정'
        },
        creditsStaked: {
            ENG: 'Credits Staked',
            KOR: '스테이킹된 크레딧'
        },
        cumulativeProofTarget: {
            ENG: 'Cumulative Proof Target',
            KOR: '누적 증명 대상'
        },
        cumulativeWeight: {
            ENG: 'Cumulative Weight',
            KOR: '누적 가중치'
        },
        deployedPrograms: {
            ENG: 'Deployed Programs',
            KOR: '배포된 프로그램들'
        },
        email: {
            ENG: 'Email',
            KOR: '이메일'
        },
        epoch: {
            ENG: 'Epoch',
            KOR: '에폭'
        },
        executeTransitions: {
            ENG: 'Execute Transitions',
            KOR: '트랜지션 실행'
        },
        fee: {
            ENG: 'Fee',
            KOR: '비용'
        },
        finalizeRoot: {
            ENG: 'Finalize Root',
            KOR: '최종 루트'
        },
        functionName: {
            ENG: 'Function Name',
            KOR: '함수명'
        },
        getStarted: {
            ENG: 'Get Started',
            KOR: '시작하기'
        },
        height: {
            ENG: 'Height',
            KOR: '높이'
        },
        index: {
            ENG: 'Index',
            KOR: '인덱스'
        },
        inBlock: {
            ENG: 'In Block',
            KOR: '해당 블록'
        },
        inputs: {
            ENG: 'Inputs',
            KOR: '입력값들'
        },
        latestBlock: {
            ENG: 'Latest block',
            KOR: '최신 블록'
        },
        latestBlocks: {
            ENG: 'Latest Blocks',
            KOR: '최신 블록들'
        },
        latestTransactions: {
            ENG: 'Latest Transactions',
            KOR: '최신 트랜잭션들'
        },
        latestTransitions: {
            ENG: 'Latest Transitions',
            KOR: '최신 트랜지션들'     
        },
        lifetimePuzzleReward: {
            ENG: 'Lifetime Puzzle Reward',
            KOR: '라이프타임 퍼즐 보상'
        },
        lifetimeStakeReward: {
            ENG: 'Lifetime Stake Reward',
            KOR: '라이프타임 스테이크 보상'
        },
        loading: {
            ENG: 'Loading ...',
            KOR: '로딩중 ...'
        },
        network: {
            ENG: 'Network',
            KOR: '네트워크'
        },
        noDataFound: {
            ENG: 'No data found.',
            KOR: '데이터를 찾을 수 없습니다.',
        },
        nonce: {
            ENG: 'Nonce',
            KOR: '논스'
        },
        numberOfSolutions: {
            ENG: 'Number Of Solutions',
            KOR: '솔루션 수'
        },
        numberOfTransactions: {
            ENG: 'Number Of Transactions',
            KOR: '트랜잭션 수'
        },
        outputs: {
            ENG: 'Outputs',
            KOR: '출력값들'
        },
        previousBlockHash: {
            ENG: 'Previous Block Hash',
            KOR: '이전 블록 해쉬'
        },
        previousStateRoot: {
            ENG: 'Previous State Root',
            KOR: '이전 상태 루트'            
        },
        program: {
            ENG: 'Program',
            KOR: '프로그램'
        },
        programId: {
            ENG: 'Program ID',
            KOR: '프로그램 ID'
        },
        programs: {
            ENG: 'Programs',
            KOR: '프로그램들'
        },
        programsDeployed: {
            ENG: 'Programs Deployed',
            KOR: '배포된 프로그램들'
        },
        programStructure: {
            ENG: 'Program Structure',
            KOR: '프로그램 구조' 
        },
        proofTarget: {
            ENG: 'Proof Target',
            KOR: '증명 대상'
        },
        publicCredits: {
            ENG: 'Public Credits',
            KOR: '공개 크레딧' 
        },
        publicCreditsReceived: {
            ENG: 'Public Credits Received',
            KOR: '받은 공개 크레딧' 
        },
        publicCreditsSent: {
            ENG: 'Public Credits Sent',
            KOR: '보낸 공개 크레딧' 
        },
        puzzleSolutions: {
            ENG: 'Puzzle Solutions',
            KOR: '퍼즐 솔루션들'
        },
        rank: {
            ENG: 'Rank',
            KOR: '순위'
        },
        ratificationsRoot: {
            ENG: 'Ratifications Root',
            KOR: '승인 루트'
        },
        recentCalls: {
            ENG: 'Recent Calls',
            KOR: '최근 호출내역'     
        },
        recentTransitions: {
            ENG: 'Recent Transitions',
            KOR: '최근 트랜지션들'     
        },    
        reward: {
            ENG: 'Reward',
            KOR: '보상'
        },
        round: {
            ENG: 'Round',
            KOR: '라운드'
        },
        solutionsRoot: {
            ENG: 'Solutions Root',
            KOR: '솔루션 루트'
        },
        sourceCode: {
            ENG: 'Source Code',
            KOR: '소스 코드'     
        },
        stake: {
            ENG: 'Stake',
            KOR: '스테이크'
        },
        startingRound: {
            ENG: 'Starting Round',
            KOR: '시작 라운드'
        },
        status: {
            ENG: 'Status',
            KOR: '상태'
        },
        subdagRoot: {
            ENG: 'Subdag Root',
            KOR: '서브다그 루트'
        },
        timestamp: {
            ENG: 'Timestamp',
            KOR: '타임스탬프'
        },
        totalStake: {
            ENG: 'Total Stake',
            KOR: '전체 스테이크'
        },
        totalFee: {
            ENG: 'Total Fee',
            KOR: '전체 비용'
        },
        totalFeeSpent: {
            ENG: 'Total Fee Spent',
            KOR: '지출한 전체 비용'
        },
        transitionId: {
            ENG: 'Transition ID',
            KOR: '트랜지션 ID'
        },
        transitions: {
            ENG: 'Transitions',
            KOR: '트랜지션들'
        },
        transferAmount: {
            ENG: 'Transfer Amount',
            KOR: '이체 금액'
        },
        transaction: {
            ENG: 'Transaction',
            KOR: '트랜잭션'
        },
        transactions: {
            ENG: 'Transactions',
            KOR: '트랜잭션들'           
        },
        transactionId: {
            ENG: 'Transaction ID',
            KOR: '트랜잭션 ID'
        },
        transactionsRoot: {
            ENG: 'Transactions Root',
            KOR: '트랜잭션 루트'
        },
        type: {
            ENG: 'Type',
            KOR: '타입'
        },
        validators: {
            ENG: 'Validators',
            KOR: '검증자들'       
        },
        view: {
            ENG: 'View',
            KOR: '보기'
        }
    };
    return {
        acceptedPuzzleSolutions: labels.acceptedPuzzleSolutions[language],
        acceptedSolutions: labels.acceptedSolutions[language],
        account: labels.account[language],
        address: labels.address[language],
        addressStats: labels.addressStats[language],
        aleoPrice: labels.aleoPrice[language],
        block: labels.block[language],
        blockHash: labels.blockHash[language],
        blockHeight: labels.blockHeight[language],
        bondingState: labels.bondingState[language],
        clear: labels.clear[language],
        coinbaseReward: labels.coinbaseReward[language],
        coinbaseTarget: labels.coinbaseTarget[language],
        commitment: labels.commitment[language],
        creditsStaked: labels.creditsStaked[language],
        cumulativeProofTarget: labels.cumulativeProofTarget[language],
        cumulativeWeight: labels.cumulativeWeight[language],
        deployedPrograms: labels.deployedPrograms[language],
        email: labels.email[language],
        epoch: labels.epoch[language],
        executeTransitions: labels.executeTransitions[language],
        fee: labels.fee[language],
        finalizeRoot: labels.finalizeRoot[language],
        functionName: labels.functionName[language],
        getStarted: labels.getStarted[language],
        height: labels.height[language],
        index: labels.index[language],
        inBlock: labels.inBlock[language],
        inputs: labels.inputs[language],
        latestBlock: labels.latestBlock[language],
        latestBlocks: labels.latestBlocks[language],
        latestTransactions: labels.latestTransactions[language],
        latestTransitions: labels.latestTransitions[language],
        lifetimePuzzleReward: labels.lifetimePuzzleReward[language],
        lifetimeStakeReward: labels.lifetimeStakeReward[language],
        loading: labels.loading[language],
        network: labels.network[language],
        noDataFound: labels.noDataFound[language],
        nonce: labels.nonce[language],
        numberOfSolutions: labels.numberOfSolutions[language],
        numberOfTransactions: labels.numberOfTransactions[language],
        outputs: labels.outputs[language],
        previousBlockHash: labels.previousBlockHash[language],
        previousStateRoot: labels.previousStateRoot[language],
        program: labels.program[language],
        programId: labels.programId[language],
        programs: labels.programs[language],
        programsDeployed: labels.programsDeployed[language],
        programStructure: labels.programStructure[language],
        proofTarget: labels.proofTarget[language],
        publicCredits: labels.publicCredits[language],
        publicCreditsReceived: labels.publicCreditsReceived[language],
        publicCreditsSent: labels.publicCreditsSent[language],
        puzzleSolutions: labels.puzzleSolutions[language],
        rank: labels.rank[language],
        ratificationsRoot: labels.ratificationsRoot[language],
        recentCalls: labels.recentCalls[language],
        recentTransitions: labels.recentTransitions[language],
        reward: labels.reward[language],
        round: labels.round[language],
        solutionsRoot: labels.solutionsRoot[language],
        sourceCode: labels.sourceCode[language],
        stake: labels.stake[language],
        startingRound: labels.startingRound[language],
        status: labels.status[language],
        subdagRoot: labels.subdagRoot[language],
        timestamp: labels.timestamp[language],
        totalStake: labels.totalStake[language],
        totalFee: labels.totalFee[language],
        totalFeeSpent: labels.totalFeeSpent[language],
        transitionId: labels.transitionId[language],
        transitions: labels.transitions[language],
        transferAmount: labels.transferAmount[language],
        transaction: labels.transaction[language],
        transactions: labels.transactions[language],
        transactionId: labels.transactionId[language],
        transactionsRoot: labels.transactionsRoot[language],
        type: labels.type[language],
        validators: labels.validators[language],
        view: labels.view[language],
    };
};
