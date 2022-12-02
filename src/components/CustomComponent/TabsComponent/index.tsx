import { IconTabs } from "@components/Icons";
import { Tab, Tabs } from "@mui/material";
import { makeStyles } from "@mui/styles";
import _ from "lodash";
import Image from "next/image";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import styled from "@emotion/styled";


const ContainerStyled = styled.div`
	.img {
		max-width: 100%;
	}
`

const TabsComponent = () => {
  const { listTabsProject } = useSelector((state: RootState) => state.projects);

  const useStyles = makeStyles((theme) => ({
    root: {
		padding: '0px 50px 0px 100px',
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
    <div style={{ marginTop: 52, width: '100%' }}>
      <Tabs
        style={{ gap: 50 }}
        value={value}
        onChange={handleChange}
        aria-label="disabled tabs example"
        className={classes.root}
      >
        {listTabsProject?.map((item, index) => (
          <Tab
            label={item.name}
            key={index}
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
            <div style={{ width: "100%", padding: 55, textAlign: "justify" }}>
              {!_.isEmpty(listTabsProject) ? (
                <div
                  // className="ck-content"
                  className="content-project-view ck-content"
                  dangerouslySetInnerHTML={{ __html: listTabsProject[0]?.text }}
                />
              ) : (
                <></>
              )}
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
              {/* <div style={{ width: 896, padding: 50 }}>
                <div className="ck-content" dangerouslySetInnerHTML={{ __html: itemView?.text }} /> */}
              <div style={{ width: "100%", padding: 80, textAlign: "justify" }}>
                <div
                  className="content-project-view ck-content"
                  dangerouslySetInnerHTML={{ __html: itemView?.text }}
                />
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
