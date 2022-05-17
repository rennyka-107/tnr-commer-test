import { IconTabs } from "@components/Icons";
import { Tab, Tabs } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

export default function TabsComponent() {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTabs-flexContainer": {
        gap: 50,
      },
      "& 	.MuiTabs-indicator": {
        backgroundColor: "#FCB715 !important",
      },
      "& 	.MuiTab-textColorPrimary": {
        backgroundColor: "unset !important",
        // color: "#000000 !important",
        textTransform: "none",
        fontWeight: 500,
        fontSize: 22,
      },
    },
    selected: {
      backgroundColor: "unset !important",
      color: "#000000 !important",
      textTransform: "none",
      fontWeight: 500,
      fontSize: 22,
    },
  }));
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div style={{ marginTop: 44 }}>
      <Tabs
        style={{ gap: 50 }}
        value={value}
        onChange={handleChange}
        aria-label="disabled tabs example"
        className={classes.root}
      >
        <Tab
          label="Vị trí"
          icon={value === 0 ? <IconTabs style={{ marginRight: 15 }} /> : <></>}
          iconPosition="start"
          classes={{ selected: classes.selected }}
        />

        <Tab
          label="Phân Khu"
          icon={value === 1 ? <IconTabs style={{ marginRight: 15 }} /> : <></>}
          iconPosition="start"
          classes={{ selected: classes.selected }}
        />
        <Tab
          label="Tiện ich"
          icon={value === 2 ? <IconTabs style={{ marginRight: 15 }} /> : <></>}
          iconPosition="start"
          classes={{ selected: classes.selected }}
        />
      </Tabs>
    </div>
  );
}
