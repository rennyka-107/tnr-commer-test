import { ArrowDownIcon } from "@components/Icons";
import { MenuBar, MenuBarProjectType } from "interface/menuBarList";
import { Fragment, useState } from "react";
import {
	ListStyled,
	DropdownStyled,
	ContentStyled,
	WrapperIconStyled,
	WrapperListStyled,
} from "../styled";

const ListContents = ({
	type,
	list,
	onClick,
}: {
	list: MenuBarProjectType[] | MenuBar[];
	type: "Loại bất động sản" | "Dự án";
	onClick: (data: MenuBarProjectType | MenuBar) => void;
}) => {
	const [isExpand, setIsExpand] = useState(false);
	const handleClick = () => {
		setIsExpand(!isExpand);
	};
	return (
		<WrapperListStyled isExpand={isExpand}>
			<DropdownStyled onClick={handleClick} isExpand={isExpand}>
				{type}
				<WrapperIconStyled isExpand={isExpand}>
					<ArrowDownIcon />
				</WrapperIconStyled>
			</DropdownStyled>
			{isExpand && (
				<ListStyled>
					{list.map((item, index) => {
						return (
							<ContentStyled key={index} onClick={() => onClick(item)}>
								{item.name}
							</ContentStyled>
						);
					})}
				</ListStyled>
			)}
		</WrapperListStyled>
	);
};
export default ListContents;
