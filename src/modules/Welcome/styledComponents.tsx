import styled from 'styled-components';
import { StyledButton } from '../../components';
import { Link } from 'react-router';

export const BannerContainer = styled.div`
	background: rgba(37,72,101,1);
	background: -moz-linear-gradient(left, rgba(37,72,101,1) 0%, rgba(37,72,101,1) 0%, rgba(49,215,227,1) 100%);
	background: -webkit-gradient(left top, right top, color-stop(0%, rgba(37,72,101,1)), color-stop(0%, rgba(37,72,101,1)), color-stop(100%, rgba(49,215,227,1)));
	background: -webkit-linear-gradient(left, rgba(37,72,101,1) 0%, rgba(37,72,101,1) 0%, rgba(49,215,227,1) 100%);
	background: -o-linear-gradient(left, rgba(37,72,101,1) 0%, rgba(37,72,101,1) 0%, rgba(49,215,227,1) 100%);
	background: -ms-linear-gradient(left, rgba(37,72,101,1) 0%, rgba(37,72,101,1) 0%, rgba(49,215,227,1) 100%);
	background: linear-gradient(to right, rgba(37,72,101,1) 0%, rgba(37,72,101,1) 0%, rgba(49,215,227,1) 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#254865', endColorstr='#31d7e3', GradientType=1 );
	width: 100%;
	height: 207px;

	@media only screen and (max-width: 480px) {
		display: none;
	}
`;

export const Header = styled.div`
	color: #002326;
	font-family: DIN-Bold;
	font-size: 40px;
	line-height: 50px;
	width: 499px;

	@media only screen and (max-width: 480px) {
		width: 100%;
	}
`;

export const Description = styled.div`
	color: #002326;
	font-family: DIN;
	font-size: 17px;
	line-height: 25px;
	margin: 20px 0;
`;

export const ButtonContainer = styled.div`
	margin-top: 30px;
`;

export const SkipButton = styled(StyledButton)`
	width: 49%;
	margin-right: 1%;
	background-color: #FFFFFF !important;
	color: #002326 !important;
	font-family: DIN-Bold !important;
	border: 0 !important;

	@media only screen and (max-width: 480px) {
		width: 100%;
		margin-bottom: 10px;
	}
`;

export const NextButton = styled(StyledButton)`
	@media only screen and (max-width: 480px) {
		width: 100%;
		margin-bottom: 10px;
	}
`;

export const StyledLink = styled(Link)`
	color: #002326;
	font-family: DIN-Bold;
	font-size: 17px;
	line-height: 25px;
`;
