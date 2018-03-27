import * as React from 'react';
import { PaperLayout } from '../../../layouts';
import { browserHistory } from 'react-router';
import { schema, uiSchema } from './schema';
import {
	Header,
	JSONSchemaForm,
	MainWrapper,
	Bold,
	ConfirmationModal
} from '../../../components';
import { DebtOrderEntity } from '../../../models';
import * as Web3 from 'web3';
import Dharma from '@dharmaprotocol/dharma.js';
import { BigNumber } from 'bignumber.js';
import { debtOrderFromJSON, normalizeDebtOrder } from '../../../utils';
import { encodeUrlParams } from '../../../utils';
const BitlyClient = require('bitly');

interface Props {
	web3: Web3;
	accounts: string[];
	dharma: Dharma;
	handleRequestDebtOrder: (debtOrder: DebtOrderEntity) => void;
	handleSetError: (errorMessage: string) => void;
}

interface State {
	formData: any;
	principalAmount: number;
	principalTokenSymbol: string;
	interestRate: number;
	debtOrder: string;
	description: string;
	issuanceHash: string;
	confirmationModal: boolean;
}

class RequestLoanForm extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSignDebtOrder = this.handleSignDebtOrder.bind(this);
		this.confirmationModalToggle = this.confirmationModalToggle.bind(this);
		this.validateForm = this.validateForm.bind(this);

		this.state = {
			formData: {},
			principalAmount: 0,
			principalTokenSymbol: '',
			interestRate: 0,
			debtOrder: '',
			description: '',
			issuanceHash: '',
			confirmationModal: false
		};
	}

	handleChange(formData: any) {
		this.setState({
			formData: formData
		});
		if (formData.loan) {
			if (formData.loan.principalAmount) {
				this.setState({ principalAmount: formData.loan.principalAmount });
			}
			if (formData.loan.principalTokenSymbol) {
				this.setState({ principalTokenSymbol: formData.loan.principalTokenSymbol });
			}
			if (formData.loan.description) {
				this.setState({ description: formData.loan.description });
			}
		}
		if (formData.terms && formData.terms.interestRate) {
			this.setState({ interestRate: formData.terms.interestRate });
		}
	}

	async handleSubmit() {
		try {
			this.props.handleSetError('');
			const { principalAmount, principalTokenSymbol } = this.state.formData.loan;
			const { interestRate, amortizationUnit, termLength } = this.state.formData.terms;
			const { dharma, accounts } = this.props;

			const simpleInterestLoan = {
				principalTokenSymbol,
				principalAmount: new BigNumber(principalAmount),
				interestRate: new BigNumber(interestRate),
				amortizationUnit,
				termLength: new BigNumber(termLength)
			};

			const debtOrder = await dharma.adapters.simpleInterestLoan.toDebtOrder(simpleInterestLoan);
			debtOrder.debtor = accounts[0];
			const issuanceHash = await dharma.order.getIssuanceHash(debtOrder);

			this.setState({
				debtOrder: JSON.stringify(debtOrder),
				issuanceHash
			});
			this.confirmationModalToggle();
		} catch (e) {
			this.props.handleSetError('Unable to generate Debt Order');
			return;
		}
	}

	async handleSignDebtOrder() {
		try {
			this.props.handleSetError('');
			if (!this.state.debtOrder) {
				this.props.handleSetError('No Debt Order has been generated yet');
				return;
			}

			const { description, principalTokenSymbol, issuanceHash } = this.state;
			const debtOrder = debtOrderFromJSON(this.state.debtOrder);

			// Sign as debtor
			const debtorSignature = await this.props.dharma.sign.asDebtor(debtOrder, true);
			debtOrder.debtorSignature = debtorSignature;

			this.setState({
				debtOrder: JSON.stringify(debtOrder),
				confirmationModal: false
			});

			let urlParams = normalizeDebtOrder(debtOrder);
			urlParams = Object.assign({ description, principalTokenSymbol }, urlParams);

			const bitly = BitlyClient(process.env.REACT_APP_BITLY_ACCESS_TOKEN);
			const result = await bitly.shorten(process.env.REACT_APP_NGROK_HOSTNAME + '/fill/loan?' + encodeUrlParams(urlParams));
			let fillLoanShortUrl: string = '';
			if (result.status_code === 200) {
				fillLoanShortUrl = result.data.url;
			}

			const generatedDebtOrder = await this.props.dharma.adapters.simpleInterestLoan.fromDebtOrder(debtOrder);
			console.log(debtOrder);
			const storeDebtOrder: DebtOrderEntity = {
				json: JSON.stringify(debtOrder),
				principalTokenSymbol,
				description,
				issuanceHash,
				fillLoanShortUrl,
				repaidAmount: new BigNumber(0),
				termLength: generatedDebtOrder.termLength,
				interestRate: generatedDebtOrder.interestRate,
				amortizationUnit: generatedDebtOrder.amortizationUnit,
				status: 'pending'
			};
			this.props.handleRequestDebtOrder(storeDebtOrder);
			browserHistory.push(`/request/success/${storeDebtOrder.issuanceHash}`);
		} catch (e) {
			this.props.handleSetError('Unable to sign Debt Order');
			this.setState({
				confirmationModal: false
			});
			return;
		}
	}

	confirmationModalToggle() {
		this.setState({
			confirmationModal: !this.state.confirmationModal
		});
	}

	validateForm(formData: any, errors: any) {
		if (formData.terms.termLength % 1 !== 0) {
			errors.terms.termLength.addError('Term length can not have decimals.');
		}
		return errors;
	}

	render() {
		const confirmationModalContent = (
			<span>
				You are requesting a loan of <Bold>{this.state.principalAmount} {this.state.principalTokenSymbol}</Bold> at a <Bold>{this.state.interestRate}%</Bold> interest rate per the terms in the contract on the previous page. Are you sure you want to do this?
			</span>
		);
		const descriptionContent = <span>Here's a quick description of what a debt order is and why you should request one.</span>;
		return (
			<PaperLayout>
				<MainWrapper>
					<Header title={'Request a loan'} description={descriptionContent} />
					<JSONSchemaForm
						schema={schema}
						uiSchema={uiSchema}
						formData={this.state.formData}
						buttonText="Generate Debt Order"
						onHandleChange={this.handleChange}
						onHandleSubmit={this.handleSubmit}
						validate={this.validateForm}
					/>
				</MainWrapper>
				<ConfirmationModal modal={this.state.confirmationModal} title="Please confirm" content={confirmationModalContent} onToggle={this.confirmationModalToggle} onSubmit={this.handleSignDebtOrder} closeButtonText="&#8592; Modify Request" submitButtonText="Complete Request" />
			</PaperLayout>
		);
	}
}

export {RequestLoanForm};
