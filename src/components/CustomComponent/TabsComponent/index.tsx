import { IconTabs } from "@components/Icons";
import { Tab, Tabs } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

const TabsComponent = () => {
  const { listTabsProject } = useSelector((state: RootState) => state.projects);

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
  const [itemView, setItemView] = React.useState({
    id: "",
    name: "",
    position: 0,
    projectId: "",
    text: "",
    updateDate: "",
  });
  const classes = useStyles();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeTab = (event: any) => {
    setItemView(event);
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
        {listTabsProject.map((item, index) => (
          <Tab
            label={item.name}
            icon={
              value === index ? <IconTabs style={{ marginRight: 15 }} /> : <></>
            }
            onClick={() => handleChangeTab(item)}
            iconPosition="start"
            classes={{ selected: classes.selected }}
          />
        ))}
      </Tabs>
      {itemView.id === "" ? (
        <>
          {" "}
          <div>
            <div style={{ width: 896, padding: 50 }}>
              <div dangerouslySetInnerHTML={{ __html:  listTabsProject[0].text }} />
            </div>
            {/* <DynamicBottomProdComponent
		style={{ marginTop: 50, marginBottom: 85 }}
		data={dataFake}
	  /> */}
          </div>
        </>
      ) : (
        <>
          <>
            {" "}
            <div>
              <div style={{ width: 896, padding: 50 }}>
                <div dangerouslySetInnerHTML={{ __html: itemView?.text }} />
              </div>
              {/* <DynamicBottomProdComponent
		style={{ marginTop: 50, marginBottom: 85 }}
		data={dataFake}
	  /> */}
            </div>
          </>
        </>
      )}
    </div>
  );
};

export default TabsComponent;
