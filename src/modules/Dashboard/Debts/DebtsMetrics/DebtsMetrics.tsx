import * as React from 'react';
import { TokenEntity, DebtOrderMoreDetail } from '../../../../models';
import { BigNumber } from 'bignumber.js';
import {
	Wrapper,
	HalfCol,
	Value,
	TokenWrapper,
	Label
} from './styledComponents';

interface Props {
	debtOrders: DebtOrderMoreDetail[];
	tokens: TokenEntity[];
}

interface State {
	tokenBalances: {
		[key: string]: {
			totalRequested: BigNumber;
			totalRepaid: BigNumber;
		}
	};
}

class DebtsMetrics extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			tokenBalances: {}
		};
	}

	componentDidMount() {
		this.initiateTokenBalance(this.props.tokens, this.props.debtOrders);
	}

	componentWillReceiveProps(nextProps: Props) {
		if (nextProps.tokens && nextProps.debtOrders) {
			this.initiateTokenBalance(nextProps.tokens, nextProps.debtOrders);
		}
	}

	initiateTokenBalance(tokens: TokenEntity[], debtOrders: DebtOrderMoreDetail[]) {
		let tokenBalances: any = {};
		if (tokens && tokens.length) {
			for (let token of tokens) {
				tokenBalances[token.tokenSymbol] = {
					totalRequested: new BigNumber(0),
					totalRepaid: new BigNumber(0)
				};
			}
		}
		if (debtOrders && debtOrders.length) {
			for (let debtOrder of debtOrders) {
				if (tokenBalances[debtOrder.principalTokenSymbol]) {
					if (debtOrder.status !== 'pending') {
						tokenBalances[debtOrder.principalTokenSymbol].totalRequested = tokenBalances[debtOrder.principalTokenSymbol].totalRequested.plus(debtOrder.principalAmount);
						tokenBalances[debtOrder.principalTokenSymbol].totalRepaid = tokenBalances[debtOrder.principalTokenSymbol].totalRepaid.plus(debtOrder.repaidAmount);
					}
				}
			}
			this.setState({ tokenBalances });
		}
	}

	render() {
		const { tokenBalances } = this.state;
		let totalRequestedRows: JSX.Element[] = [];
		let totalRepaidRows: JSX.Element[] = [];
		for (let token in tokenBalances) {
			if (tokenBalances[token].totalRequested.gt(0) || tokenBalances[token].totalRepaid.gt(0)) {
				if (tokenBalances[token].totalRequested.gt(0)) {
					if (totalRequestedRows.length >= 4) {
						continue;
					}
					if (totalRequestedRows.length === 3) {
						totalRequestedRows.push(
							<TokenWrapper key={'more'}>AND MORE</TokenWrapper>
						);
					} else {
						totalRequestedRows.push(
							<TokenWrapper key={token}>{tokenBalances[token].totalRequested.toNumber() + ' ' + token}</TokenWrapper>
						);
					}
				}
				if (tokenBalances[token].totalRepaid.gt(0)) {
					if (totalRepaidRows.length >= 4) {
						continue;
					}
					if (totalRepaidRows.length === 3) {
						totalRepaidRows.push(
							<TokenWrapper key={'more'}>AND MORE</TokenWrapper>
						);
					} else {
						totalRepaidRows.push(
							<TokenWrapper key={token}>{tokenBalances[token].totalRepaid.toNumber() + ' ' + token}</TokenWrapper>
						);
					}
				}
			}
		}
		const defaultTotal = <TokenWrapper>0 ETH</TokenWrapper>;
		return (
			<Wrapper>
				<HalfCol>
					<Value>
						{totalRequestedRows.length
							? totalRequestedRows
							: defaultTotal
						}
					</Value>
					<Label>Total Requested</Label>
				</HalfCol>
				<HalfCol>
					<Value>
						{totalRepaidRows.length
							? totalRepaidRows
							: defaultTotal
						}
					</Value>
					<Label>Total Repaid</Label>
				</HalfCol>
			</Wrapper>
		);
	}
}

export { DebtsMetrics };
