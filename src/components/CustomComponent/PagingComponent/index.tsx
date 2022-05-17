import { Pagination, PaginationItem } from "@mui/material";
import { makeStyles } from "@mui/styles";

export default function PaddingComponent() {	
  const useStyles = makeStyles((theme) => ({
    root: {
      "& ul > li:not(:first-child):not(:last-child) > button:not(.Mui-selected)":
        {
          backgroundColor: "transparent",
          color: "#D5D7E3",
          "&:hover": {
            backgroundColor: " #EA242A !important",
            color: "#FFFFFF",
          },
        },
      "& 	.MuiPaginationItem-previousNext": {
        "&:hover": {
          backgroundColor: " #EA242A !important",
          color: "#FFFFFF",
        },	
      },
    },
    selected: {
      backgroundColor: "unset !important",
      color: "black",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: " #EA242A !important",
        color: "#FFFFFF",
      },
    },
  }));
  const classes = useStyles();
  return (
    <div style={{marginTop: 66, marginBottom: 76}}>
      <Pagination
        className={classes.root}
        count={10}
        renderItem={(item) => (
          <PaginationItem {...item} classes={{ selected: classes.selected }} />
        )}
      />
    </div>
  );
}
