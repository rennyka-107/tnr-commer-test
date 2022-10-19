import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const ContainerNavTop = styled.div`
	widht: 100%;
	box-sizing: border-box;
	background: #ffffff;
`;

export const ResponsiveLayout = styled.div`
	width: 100%;
	padding: 0 15px;
	background: #ffffff;
	margin: 0 auto;
	max-width: 1600px;
	@media screen and (max-width: 1600px) {
		max-width: 1280px;
	}
	@media screen and (max-width: 1440px) {
		max-width: 1140px;
	}

	@media screen and (max-width: 1280px) {
		max-width: 1024px;
	}

	@media screen and (max-width: 1024px) {
		max-width: 768px;
	}

	@media screen and (max-width: 768px) {
		max-width: 640px;
	}

	@media screen and (max-width: 640px) {
		padding: 0 40px;
	}
`;

export const HeaderContainer = styled.div`
	display: flex;
	height: 100%;
	height: 93px;
	align-items: center;
	justify-content: space-between;
`;

export const WrapMenuItem = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
`;

export const TextLink = styled.a`
	text-transform: none;
	font-family: "Roboto";
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	color: #0e1d34;
	@media screen and (max-width: 1024px) {
		font-size: 24px;
		font-weight: 700;
		color: #8190a7;
		margin-bottom: 40px;
	}
	@media screen and (max-width: 768px) {
		font-size: 20px;
		margin-bottom: 32px;
	}

	@media screen and (max-width: 640px) {
		font-size: 18px;
		margin-bottom: 24px;
	}
`;

export const WrapRightItem = styled.div`
	display: flex;
	align-items: center;
	gap: 50px;
	.menu-icon {
		display: none;
	}
	@media screen and (max-width: 1024px) {
		.menu-icon {
			display: block;
		}
	}
	@media screen and (max-width: 640px) {
		gap: 20px;
	}
`;
export const ButtonBuyHelp = styled(Button)`
	height: 39px;
	width: 145px;
	background: #ffffff;
	border: 1px solid #ea242a;
	border-radius: 8px;
	padding: 8px 25px;
	font-family: "Roboto";
	font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 15px;
	text-align: center;
	color: #0e1d34;
	text-transform: none;

	:hover {
		background: #ea242a;
		color: #ffffff;
	}
`;
export const IconAccountWrap = styled.div`
	display: flex;
	gap: 30px;
	align-items: center;
	@media screen and (max-width: 640px) {
		gap: 20px;
	}
`;

export const ContentLeftHeader = styled.div`
	display: flex;
	gap: 35px;
	margin-left: 38px;
	@media screen and (max-width: 1280px) {
		gap: 10px;
		margin-left: 20px;
	}
	@media screen and (max-width: 1024px) {
		display: none;
	}
`;

//Mobile
export const DropdownStyled = styled.div<{ isExpand: boolean }>`
	display: flex;
	cursor: pointer;
	font-weight: 700;
	align-items: center;
	font-size: 24px;
	width: fit-content;
	color: ${({ isExpand }) => (isExpand ? "#1B3459" : "#8190a7")};
	@media screen and (max-width: 768px) {
		font-size: 20px;
	}

	@media screen and (max-width: 640px) {
		font-size: 18px;
	}
`;

export const ListStyled = styled.div`
	padding-top: 24px;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 100%;
	display: flex;
`;

export const ContentStyled = styled.div`
	width: 33%;
	margin-bottom: 24px;
	font-weight: 500;
	font-size: 18px;
	color: #8190a7;
	:hover {
		cursor: pointer;
		color: #1b3459;
	}
	@media screen and (max-width: 768px) {
		font-size: 16px;
	}

	@media screen and (max-width: 640px) {
		font-size: 14px;
	}
`;

export const WrapperIconStyled = styled.div<{ isExpand: boolean }>`
	rotate: ${({ isExpand }) => (isExpand ? "180deg" : "")};
	height: 24px;
	margin-left: 10px;
`;

export const WrapperListStyled = styled.div<{ isExpand: boolean }>`
	margin-bottom: ${({ isExpand }) => (isExpand ? "0px" : "40px")};
	width: 100%;

	@media screen and (max-width: 768px) {
		font-size: 16px;
		margin-bottom: ${({ isExpand }) => (isExpand ? "0px" : "32px")};
	}

	@media screen and (max-width: 640px) {
		font-size: 14px;
		margin-bottom: ${({ isExpand }) => (isExpand ? "0px" : "24px")};
	}
`;
