import { ArrowDownIcon } from "@components/Icons";
import styled from "@emotion/styled";
import { Button, Skeleton } from "@mui/material";
import MenuDropdown from "ItemComponents/MenuDropdown";
import isEmpty from "lodash.isempty";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import PathRoute from "utils/PathRoute";
import { RootState } from "../../../../../store/store";
import { TextLink, DropdownStyled } from "../styled";
import ListContents from "./ListContents";

const MenuMoblieStyled = styled.div`
	display: none;
	@media screen and (max-width: 1024px) {
		background-color: white;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 0 40px;
	}
`;

export const MenuMoblie = () => {
	const { listMenuBarType, listMenuBarProjectType } = useSelector(
		(state: RootState) => state.menubar
	);
	const Router = useRouter();

	const menuBarProjectType = listMenuBarProjectType?.filter((item) => item.id !== "1");
	const menuBarType = listMenuBarType?.filter((item) => item.id !== "1");

	const handleSelectTypeProject = (data: any) => {
		const arr: any = [];
		arr.push(data.id);

		localStorage.setItem("listParamsLSProjectType", JSON.stringify(arr));
		localStorage.removeItem("listDataLSProvince");
		localStorage.removeItem("listParamsLSProvince");
		Router.push(`/${PathRoute.ProjectTNR}?type=${data.id}`);
	};
	const scrollView = () => {
		Router.push("/sales");
	};

	return (
		<Fragment>
			<MenuMoblieStyled>
				{!isEmpty(menuBarProjectType) ? (
					<ListContents
						type="Loại bất động sản"
						list={menuBarProjectType}
						onClick={handleSelectTypeProject}
					/>
				) : (
					<Skeleton animation="wave" style={{ width: 200, height: 42, opacity: "40%" }} />
				)}
				{!isEmpty(menuBarType) ? (
					<ListContents
						type="Dự Án"
						list={menuBarType}
						onClick={(item) => {
							Router.replace(`/project-detail/${item.id}`);
						}}
					/>
				) : (
					<Skeleton animation="wave" style={{ width: 111, height: 42, opacity: "40%" }} />
				)}
				{!isEmpty(menuBarProjectType) ? (
					<Fragment>
						<Button onClick={() => scrollView()} sx={{ padding: 0 }}>
							<TextLink>Khuyến mãi</TextLink>
						</Button>
						<Button sx={{ padding: 0 }}>
							<Link href={"https://tnrvietnam.com.vn/sites/tnr/tin-tuc/"} passHref>
								<TextLink target={"_blank"}>Tin tức</TextLink>
							</Link>
						</Button>
					</Fragment>
				) : (
					<Fragment>
						<Skeleton animation="wave" style={{ width: 111, height: 42, opacity: "40%" }} />
						<Skeleton animation="wave" style={{ width: 111, height: 42, opacity: "40%" }} />
					</Fragment>
				)}
			</MenuMoblieStyled>
		</Fragment>
	);
};
