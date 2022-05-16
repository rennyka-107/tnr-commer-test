import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { IconMapSearch, IconSearch } from "@components/Icons";
import styled from "@emotion/styled";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 18,
    lineHeight: 21,
    "&::placeholder": {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: 18,
      lineHeight: 21,
      color: "#8190A7",
    },
  },
}));

type Props = {
  placholder: string;
  width?: number;
  height?: number;
  // onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function SearchInput({ placholder,width,height }: Props) {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 41px",
        display: "flex",
        alignItems: "center",
        width: width,
        height: height,
        borderRadius: "8px",
      }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        <IconMapSearch />
      </IconButton>
      <BootstrapInput
        sx={{ ml: 1, flex: 1 }}
        placeholder={placholder}
        inputProps={{ "aria-label": "Search" }}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <IconSearch />
      </IconButton>
    </Paper>
  );
}
