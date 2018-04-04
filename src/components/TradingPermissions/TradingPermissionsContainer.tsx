import { connect } from "react-redux";
import { TradingPermissions } from "./TradingPermissions";
import { TokenEntity } from "../../models";
import {
    setAllTokensTradingPermission,
    toggleTokenTradingPermission,
    toggleTokenLoadingSpinner,
    setTokenBalance,
} from "./actions";
import { setError } from "../../components/Toast/actions";

import Dharma from "@dharmaprotocol/dharma.js";
import { BigNumber } from "bignumber.js";

const mapStateToProps = (state: any) => {
    return {
        web3: state.web3Reducer.web3,
        dharma: state.dharmaReducer.dharma,
        tokens: state.tokenReducer.tokens,
		agreeToTerms: state.plexReducer.agreeToTerms
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        toggleTokenLoadingSpinner: (tokenAddress: string, loading: boolean) =>
            dispatch(toggleTokenLoadingSpinner(tokenAddress, loading)),
        handleSetAllTokensTradingPermission: (tokens: TokenEntity[]) =>
            dispatch(setAllTokensTradingPermission(tokens)),
        handleToggleTokenTradingPermission: (tokenAddress: string, permission: boolean) =>
            dispatch(toggleTokenTradingPermission(tokenAddress, permission)),
        handleSetError: (errorMessage: string) => dispatch(setError(errorMessage)),
        handleFaucetRequest: (tokenAddress: string, userAddress: string, dharma: Dharma) => {
            dispatch(toggleTokenLoadingSpinner(tokenAddress, true));

            const balance = 100000 * Math.pow(10, 18);

            const faucetUrl = `https://faucet.dharma.io/dummy-tokens/${tokenAddress}/balance/${userAddress}`;
            const postData = {
                method: "post",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({ balance: balance }),
            };

            fetch(faucetUrl, postData)
                .then((res) => {
                    return res.json();
                })
                .then((jsonBody) => {
                    if (!("txHash" in jsonBody)) {
                        dispatch(setError("Unable to grant token balance via faucet"));
                    } else {
                        dharma.blockchain
                            .awaitTransactionMinedAsync(jsonBody.txHash, 1000, 60000)
                            .then((res) => {
                                dispatch(toggleTokenLoadingSpinner(tokenAddress, false));
                                dispatch(setTokenBalance(tokenAddress, new BigNumber(balance)));
                            })
                            .catch((err) => {
                                dispatch(setError("Unable to grant token balance via faucet"));
                            });
                    }
                })
                .catch((err) => {
                    dispatch(setError(err.message));
                });
        },
    };
};

export const TradingPermissionsContainer = connect(mapStateToProps, mapDispatchToProps)(
    TradingPermissions,
);
