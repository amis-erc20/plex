import * as React from 'react';
import { shallow } from 'enzyme';
import { InvestmentHistory } from '../../../../../../src/modules/Dashboard/Investments/InvestmentHistory';
import { InvestmentRow } from '../../../../../../src/modules/Dashboard/Investments/InvestmentHistory/InvestmentRow';
import {
	Wrapper,
	Title,
	TableHeaderRow
} from '../../../../../../src/modules/Dashboard/Investments/InvestmentHistory/styledComponents';
import { Col } from 'reactstrap';
import { BigNumber } from 'bignumber.js';

describe('<InvestmentHistory />', () => {
	let wrapper;
	let investments = [];
	let props;
	beforeEach(() => {
		props = { investments };
		wrapper = shallow(<InvestmentHistory {... props} />);
	});

	it('should render', () => {
		expect(wrapper.length).toEqual(1);
	});

	it('should render a <Title />', () => {
		expect(wrapper.find(Wrapper).find(Title).length).toEqual(1);
	});

	describe('<TableHeaderRow />', () => {
		let tableHeaderRow;
		beforeEach(() => {
			tableHeaderRow = wrapper.find(Wrapper).find(TableHeaderRow);
		});

		it('should render', () => {
			expect(tableHeaderRow.length).toEqual(1);
		});

		it('should render 4 <Col />', () => {
			expect(tableHeaderRow.find(Col).length).toEqual(4);
		});

		it('1st <Col /> should render Amount', () => {
			expect(tableHeaderRow.find(Col).at(0).get(0).props.children).toEqual('Amount');
		});

		it('2nd <Col /> should render ID', () => {
			expect(tableHeaderRow.find(Col).at(1).get(0).props.children).toEqual('ID');
		});

		it('3rd <Col /> shoul render Status', () => {
			expect(tableHeaderRow.find(Col).at(2).get(0).props.children).toEqual('Status');
		});

		it('4th <Col /> should render Terms', () => {
			expect(tableHeaderRow.find(Col).at(3).get(0).props.children).toEqual('Terms');
		});
	});

	describe('<InvestmentRow />', () => {
		it('should render 0 <InvestmentRow />', () => {
			expect(wrapper.find(InvestmentRow).length).toEqual(0);
		});

		it('should render 3 <InvestmentRow />', () => {
			investments = [
				{
					json: "{\"principalToken\":\"0x9b62bd396837417ce319e2e5c8845a5a960010ea\",\"principalAmount\":\"10\",\"termsContract\":\"0x1c907384489d939400fa5c6571d8aad778213d74\",\"termsContractParameters\":\"0x0000000000000000000000000000008500000000000000000000000000000064\",\"kernelVersion\":\"0x89c5b853e9e32bf47c7da1ccb02e981b74c47f2f\",\"issuanceVersion\":\"0x1d8e76d2022e017c6c276b44cb2e4c71bd3cc3de\",\"debtor\":\"0x431194c3e0f35bc7f1266ec6bb85e0c5ec554935\",\"debtorFee\":\"0\",\"creditor\":\"0x431194c3e0f35bc7f1266ec6bb85e0c5ec554935\",\"creditorFee\":\"0\",\"relayer\":\"0x0000000000000000000000000000000000000000\",\"relayerFee\":\"0\",\"underwriter\":\"0x0000000000000000000000000000000000000000\",\"underwriterFee\":\"0\",\"underwriterRiskRating\":\"0\",\"expirationTimestampInSec\":\"1524613355\",\"salt\":\"0\",\"debtorSignature\":{\"v\":27,\"r\":\"0xc5c0aaf7b812cb865aef48958e2d39686a13c292f8bd4a82d7b43d833fb5047d\",\"s\":\"0x2fbbe9f0b8e12ed2875905740fa010bbe710c3e0c131f1efe14fb41bb7921788\"},\"creditorSignature\":{\"v\":27,\"r\":\"0xc5c0aaf7b812cb865aef48958e2d39686a13c292f8bd4a82d7b43d833fb5047d\",\"s\":\"0x2fbbe9f0b8e12ed2875905740fa010bbe710c3e0c131f1efe14fb41bb7921788\"},\"underwriterSignature\":{\"r\":\"\",\"s\":\"\",\"v\":0}}",
					principalTokenSymbol: 'REP',
					description: 'Hello, Can I borrow some REP please?',
					issuanceHash: 'active',
					earnedAmount: new BigNumber(4),
					termLength: new BigNumber(100),
					interestRate: new BigNumber(12.3),
					amortizationUnit: 'hours',
					status: 'active'
				},
				{
					json: "{\"principalToken\":\"0x9b62bd396837417ce319e2e5c8845a5a960010ea\",\"principalAmount\":\"10\",\"termsContract\":\"0x1c907384489d939400fa5c6571d8aad778213d74\",\"termsContractParameters\":\"0x0000000000000000000000000000008500000000000000000000000000000064\",\"kernelVersion\":\"0x89c5b853e9e32bf47c7da1ccb02e981b74c47f2f\",\"issuanceVersion\":\"0x1d8e76d2022e017c6c276b44cb2e4c71bd3cc3de\",\"debtor\":\"0x431194c3e0f35bc7f1266ec6bb85e0c5ec554935\",\"debtorFee\":\"0\",\"creditor\":\"0x431194c3e0f35bc7f1266ec6bb85e0c5ec554935\",\"creditorFee\":\"0\",\"relayer\":\"0x0000000000000000000000000000000000000000\",\"relayerFee\":\"0\",\"underwriter\":\"0x0000000000000000000000000000000000000000\",\"underwriterFee\":\"0\",\"underwriterRiskRating\":\"0\",\"expirationTimestampInSec\":\"1524613355\",\"salt\":\"0\",\"debtorSignature\":{\"v\":27,\"r\":\"0xc5c0aaf7b812cb865aef48958e2d39686a13c292f8bd4a82d7b43d833fb5047d\",\"s\":\"0x2fbbe9f0b8e12ed2875905740fa010bbe710c3e0c131f1efe14fb41bb7921788\"},\"creditorSignature\":{\"v\":27,\"r\":\"0xc5c0aaf7b812cb865aef48958e2d39686a13c292f8bd4a82d7b43d833fb5047d\",\"s\":\"0x2fbbe9f0b8e12ed2875905740fa010bbe710c3e0c131f1efe14fb41bb7921788\"},\"underwriterSignature\":{\"r\":\"\",\"s\":\"\",\"v\":0}}",
					principalTokenSymbol: 'MKR',
					description: 'Hello, Can I borrow some MKR please?',
					issuanceHash: 'active',
					earnedAmount: new BigNumber(4),
					termLength: new BigNumber(100),
					interestRate: new BigNumber(12.3),
					amortizationUnit: 'hours',
					status: 'active'
				},
				{
					json: "{\"principalToken\":\"0x9b62bd396837417ce319e2e5c8845a5a960010ea\",\"principalAmount\":\"10\",\"termsContract\":\"0x1c907384489d939400fa5c6571d8aad778213d74\",\"termsContractParameters\":\"0x0000000000000000000000000000008500000000000000000000000000000064\",\"kernelVersion\":\"0x89c5b853e9e32bf47c7da1ccb02e981b74c47f2f\",\"issuanceVersion\":\"0x1d8e76d2022e017c6c276b44cb2e4c71bd3cc3de\",\"debtor\":\"0x431194c3e0f35bc7f1266ec6bb85e0c5ec554935\",\"debtorFee\":\"0\",\"creditor\":\"0x431194c3e0f35bc7f1266ec6bb85e0c5ec554935\",\"creditorFee\":\"0\",\"relayer\":\"0x0000000000000000000000000000000000000000\",\"relayerFee\":\"0\",\"underwriter\":\"0x0000000000000000000000000000000000000000\",\"underwriterFee\":\"0\",\"underwriterRiskRating\":\"0\",\"expirationTimestampInSec\":\"1524613355\",\"salt\":\"0\",\"debtorSignature\":{\"v\":27,\"r\":\"0xc5c0aaf7b812cb865aef48958e2d39686a13c292f8bd4a82d7b43d833fb5047d\",\"s\":\"0x2fbbe9f0b8e12ed2875905740fa010bbe710c3e0c131f1efe14fb41bb7921788\"},\"creditorSignature\":{\"v\":27,\"r\":\"0xc5c0aaf7b812cb865aef48958e2d39686a13c292f8bd4a82d7b43d833fb5047d\",\"s\":\"0x2fbbe9f0b8e12ed2875905740fa010bbe710c3e0c131f1efe14fb41bb7921788\"},\"underwriterSignature\":{\"r\":\"\",\"s\":\"\",\"v\":0}}",
					principalTokenSymbol: 'ZRX',
					description: 'Hello, Can I borrow some ZRX please?',
					issuanceHash: 'active',
					earnedAmount: new BigNumber(4),
					termLength: new BigNumber(100),
					interestRate: new BigNumber(12.3),
					amortizationUnit: 'hours',
					status: 'active'
				}
			];
			wrapper.setProps({ investments });
			expect(wrapper.find(InvestmentRow).length).toEqual(3);
		});
	});
});