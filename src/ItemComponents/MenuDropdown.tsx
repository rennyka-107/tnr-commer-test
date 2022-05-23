import * as React from "react";
import { IconDropDown } from "@components/Icons";
import styled from "@emotion/styled";
import { Button, ButtonProps, Menu, MenuItem, Typography } from "@mui/material";

type ItemValueProps = {
  id: number,
  value: string
}
export type DropDownProps = {
  title: string;
  data?: ItemValueProps[];
  onSelect?: (data: ItemValueProps) => void;
};

const MenuItemStyled = styled(MenuItem)`
	height: 53px;
	border-bottom: 1px solid #F2F2F5;
`
const TextInline = styled(Typography)`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
/* identical to box height */


/* Brand */

color: #1B3459;
`

const TextButton = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #0e1d34;
  text-transform: none;
`;

export default function MenuDropdown({ title, data, onSelect }: DropDownProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <TextButton>{title}</TextButton> <IconDropDown />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {data?.map((item) => (
          <MenuItemStyled
            onClick={() => {
              handleClose();
              onSelect && onSelect(item)
            }}
            key={item.id}>
            <TextInline>{item.value}</TextInline>
          </MenuItemStyled>
        ))}

        {/* <MenuItemStyled onClick={handleClose}><TextInline>Căn hộ dịch vụ</TextInline></MenuItemStyled>
        <MenuItemStyled onClick={handleClose}><TextInline>Bất động sản nghỉ dưỡng</TextInline></MenuItemStyled>
		<MenuItemStyled onClick={handleClose}><TextInline>Khu đô thị</TextInline></MenuItemStyled> */}
      </Menu>
    </div>
  );
}
