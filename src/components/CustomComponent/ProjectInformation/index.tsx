import styled from "@emotion/styled";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Divider,
  Tabs,
  Tab,
  Badge,
  Backdrop,
  CircularProgress,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ImageWithHideOnErrorOffers from "hooks/ImageWithHideOnErrorOffers";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import Mask3 from "../../../../public/images/mask_g_3.png";
import SliderSpecialSale from "../SliderSpecialSale.tsx";
import { setOpenModalSale } from "../../../../store/projectMapSlice";
type Props = {
  location: string;
  constructArea: number;
  density: number;
  scale: string;
  funcDivision: string;
  description: string;
  projectType: string;
  landArea: string;
  ownership: string;
};
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const ContainerPJ = styled.div`
  height: auto;
  width: 100%;
  padding: 31px 31px 0 31px;
  border: 1px solid #c7c9d9;
  min-height: 554px;
  border-radius: 20px;
  margin-top: 1rem;
`;

const TabStyled = styled(Tab)`
  font-family: "Roboto";
  font-style: normal;
  text-transform: "none";
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */

  /* Shades/Dark 3 */

  color: #8190a7;
  "&.mui-selected": {
    color: red;
  }
`;

const TextButtonStyled = styled(Typography)`
  font-family: "Roboto";
  text-transform: none;
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 20px;
  text-align: center;

  /* White */

  color: #ffffff;
`;
const useStyle = makeStyles({
  root: {
    // padding: '0px 50px 0px 100px',
    "& .MuiTabs-flexContainer": {
      gap: 20,
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
  customBadge: {
    backgroundColor: "#EA242A",
    top: 22,
    right: 15,
    color: "white",
  },
});

const bold = { fontWeight: "500" };

const ProjectInformation = ({
  location,
  constructArea,
  density,
  scale,
  funcDivision,
  description,
  projectType,
  landArea,
  ownership,
}: Props) => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const ProjectInformation = useSelector(
    (state: RootState) => state.projectMap.ProjectInformation
  );
  const open = useSelector(
    (state: RootState) => state.projectMap.openModalSale
  );
  // const [open, setOpen] = useState(true);
  const classes = useStyle();
  const [value, setValue] = useState(0);
  function renderList() {
    return [
      { key: "V??? tr??", value: location ?? "" },
      { key: "Di???n t??ch ?????t x??y d???ng", value: constructArea ?? "" },
      { key: "M???t ????? x??y d???ng", value: density ?? "" },
      { key: "Lo???i h??nh ph??t tri???n", value: projectType ?? "" },
      { key: "Quy m??", value: scale ?? "" },
      { key: "Di???n t??ch s???n ph???m", value: landArea ?? "" },
      {
        key: "Ph??n khu ch???c n??ng",
        value: funcDivision ?? "",
      },
      { key: "H??nh th???c s??? h???u", value: ownership ?? "" },
    ].map(({ key, value }, idx) => (
      <Box
        sx={{ pl: 0, display: "flex", mt: 2, alignItems: "flex-start" }}
        key={idx}
      >
        <Box sx={{ marginLeft: "-.8rem"}}>
          <IconList
            style={{
              marginTop: ".5rem",
              marginRight: ".5rem",
              minWidth: "30px",
            }}
          />
        </Box>
        <Typography sx={bold}>
          {key} <span style={{ fontWeight: 400 }}>{": " + value}</span>
        </Typography>
      </Box>
    ));
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  const handleClose = () => {
    // setOpen(false);
    dispatch(setOpenModalSale(false));
  };

  return (
    <>
      <ContainerPJ>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          className={classes.root}
        >
          <TabStyled
            classes={{ selected: classes.selected }}
            label="T???ng quan d??? ??n"
            {...a11yProps(0)}
          />

          <TabStyled
            classes={{ selected: classes.selected }}
            label="??u ????i"
            {...a11yProps(1)}
          />
          {!isEmpty(ProjectInformation.lstOffers) ? (
            <Badge
              badgeContent={
                !isEmpty(ProjectInformation)
                  ? ProjectInformation.lstOffers.length
                  : 0
              }
              classes={{ badge: classes.customBadge }}
            />
          ) : (
            <></>
          )}

          {/* <Badge color="secondary" badgeContent={1}/> */}
        </Tabs>

        <TabPanel value={value} index={0}>
          <Box>{renderList()}</Box>
          <Divider sx={{ mt: 2 }} />
          <Box sx={{ mt: 3, mb: 3 }}>
            <Typography
              sx={{ fontWeight: "500", fontSize: "18px", mb: 3 }}
              color="#FEC83C"
            >
              M?? t??? d??? ??n
            </Typography>
            <Typography>{description ?? ""}</Typography>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {!isEmpty(ProjectInformation.lstOffers) ? (
            <div style={{ maxHeight: 550, overflow: "scroll" }}>
              {ProjectInformation.lstOffers.map((item, key) => (
                <div
                  onClick={() => Router.push(`/sales/${item.offersId}`)}
                  style={{ cursor: "pointer" }}
                  key={key}
                >
                  <ImageWithHideOnErrorOffers
                    key={key}
                    className="logo"
                    src={item.offersAvatar ? item.offersAvatar : Mask3}
                    fallbackSrc={Mask3}
                    width={360}
                    height={224}
                    priority
                    layout="fixed"
                    unoptimized={true}
                  />
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </TabPanel>
      </ContainerPJ>
      {!isEmpty(ProjectInformation.lstOffers) ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: 2000 }}
          style={{ backgroundColor: "rgba(27, 52, 89, 0.95)" }}
          open={open}
          // onClick={handleClose}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 30,
              alignItems: "center",
            }}
          >
            <SliderSpecialSale data={ProjectInformation.lstOffers} />
            <Button
              style={{
                border: "1px solid #ffffff",
                height: 48,
                width: 343,
                borderRadius: 8,
              }}
              onClick={handleClose}
            >
              <TextButtonStyled>????ng</TextButtonStyled>
            </Button>
          </div>
        </Backdrop>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProjectInformation;

const IconList = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <svg
      style={style}
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="4" r="4" fill="#FEC83C" />
    </svg>
  );
};
