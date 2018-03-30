import * as React from 'react';
import { TokenEntity, InvestmentEntity } from '../../../../models';
import { BigNumber } from 'bignumber.js';
import {
	Wrapper,
	HalfCol,
	Value,
	TokenWrapper,
	Label
} from './styledComponents';
import { TokenAmount } from 'src/components';

interface Props {
	investments: InvestmentEntity[];
	tokens: TokenEntity[];
}

interface State {
	tokenBalances: {
		[key: string]: {
			totalLended: BigNumber;
			totalEarned: BigNumber;
		}
	};
}

class InvestmentsMetrics extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			tokenBalances: {}
		};
	}

	componentDidMount() {
		if (this.props.tokens && this.props.investments) {
			this.initiateTokenBalance(this.props.tokens, this.props.investments);
		}
	}

	componentWillReceiveProps(nextProps: Props) {
		if (nextProps.tokens && nextProps.investments) {
			this.initiateTokenBalance(nextProps.tokens, nextProps.investments);
		}
	}

	initiateTokenBalance(tokens: TokenEntity[], investments: InvestmentEntity[]) {
		let tokenBalances: any = {};
		if (tokens && tokens.length) {
			for (let token of tokens) {
				tokenBalances[token.tokenSymbol] = {
					totalLended: new BigNumber(0),
					totalEarned: new BigNumber(0)
				};
			}
		}
		if (investments && investments.length) {
			for (let investment of investments) {
				if (tokenBalances[investment.principalTokenSymbol]) {
					tokenBalances[investment.principalTokenSymbol].totalLended = tokenBalances[investment.principalTokenSymbol].totalLended.plus(investment.principalAmount);
					tokenBalances[investment.principalTokenSymbol].totalEarned = tokenBalances[investment.principalTokenSymbol].totalEarned.plus(investment.earnedAmount);
				}
			}
		}
		this.setState({ tokenBalances });
	}

	render() {
		const { tokenBalances } = this.state;
		let totalLendedRows: JSX.Element[] = [];
		let totalEarnedRows: JSX.Element[] = [];
		for (let token in tokenBalances) {
			if (tokenBalances[token].totalLended.gt(0) || tokenBalances[token].totalEarned.gt(0)) {
				if (tokenBalances[token].totalLended.gt(0) && totalLendedRows.length < 4) {
					if (totalLendedRows.length === 3) {
						totalLendedRows.push(
							<TokenWrapper key={'more'}>AND MORE</TokenWrapper>
						);
					} else {
						totalLendedRows.push(
							<TokenWrapper key={token}>
								<TokenAmount tokenAmount={tokenBalances[token].totalLended} tokenSymbol={token}/>
							</TokenWrapper>
						);
					}
				}
				if (tokenBalances[token].totalEarned.gt(0) && totalEarnedRows.length < 4) {
					if (totalEarnedRows.length === 3) {
						totalEarnedRows.push(
							<TokenWrapper key={'more'}>AND MORE</TokenWrapper>
						);
					} else {
						totalEarnedRows.push(
							<TokenWrapper key={token}>
								<TokenAmount tokenAmount={tokenBalances[token].totalEarned} tokenSymbol={token}/>
							</TokenWrapper>
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
						{totalLendedRows.length
							? totalLendedRows
							: defaultTotal
						}
					</Value>
					<Label>Total Lended</Label>
				</HalfCol>
				<HalfCol>
					<Value>
						{totalEarnedRows.length
							? totalEarnedRows
							: defaultTotal
						}
					</Value>
					<Label>Total Earned</Label>
				</HalfCol>
			</Wrapper>
		);
	}
}

export { InvestmentsMetrics };
