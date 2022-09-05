import * as React from "react";
import { IconDropDown, StrokeHeaderIcon } from "@components/Icons";
import styled from "@emotion/styled";
import { Button, ButtonProps, Menu, MenuItem, Typography } from "@mui/material";

type ItemValueProps = {
  id: string;
  name: string;
};
type ItemValuePropsUser = {
  id: number;
  value: string;
};

export type DropDownProps = {
  title: string;
  data?: ItemValueProps[];
  userData?: ItemValuePropsUser[];
  onSelect?: (data: any) => void;
  customButton?: React.ReactNode;
};

const MenuItemStyled = styled(MenuItem)`
  max-height: 300px;
  height: 53px;
  
`;
const TextInline = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #1b3459;
  @media screen and (max-width: 1024px) {
    font-size: 14px;
	}
`;

const TextButton = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #0e1d34;
  text-transform: none;
  @media screen and (max-width: 1024px) {
    font-size: 14px;
	}
`;

export default function MenuDropdown({
  title,
  data,
  onSelect,
  customButton,
  userData,
}: DropDownProps) {
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
      {/* <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <TextButton>{title}</TextButton> <IconDropDown />
      </Button> */}
      {customButton ? (
        <span onClick={handleClick}>{customButton}</span>
      ) : (
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <TextButton>{title}</TextButton> <StrokeHeaderIcon />
        </Button>
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        style={{ maxHeight: 400 }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {data?.map((item, index, row) => (
          <MenuItemStyled
            onClick={() => {
              handleClose();
              onSelect && onSelect(item);
            }}
            style={{
              borderBottom:
                index + 1 === row.length ? "" : " 1px solid #F2F2F5",
            }}
            key={index}
          >
            <TextInline>{item.name}</TextInline>
          </MenuItemStyled>
        ))}
      </Menu>
    </div>
  );
}
