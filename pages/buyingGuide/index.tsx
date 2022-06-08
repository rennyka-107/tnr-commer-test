import BoxContainer from "@components/CustomComponent/BoxContainer";
import FlexContainer from "@components/CustomComponent/FlexContainer";
import IconArrowRight from "@components/Icons/IconArrowRight";
import IconBell from "@components/Icons/IconBell";
import IconPen from "@components/Icons/IconPen";
import IconShield from "@components/Icons/IconShield";
import styled from "@emotion/styled";
import WithAuth from "@HOCs/WithAuth";
import Page from "@layouts/Page";
import { useEffect, useMemo, useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { IconArrowDown, IconDauCham } from "@components/Icons";
import { makeStyles, withStyles } from "@mui/styles";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    fontWeight: "500 !important",
  },
}));

const Container = styled.div`
  padding: 29px 0px;
  margin-top: 127px;
  display: flex;
`;
const ItemLeft = styled.div`
  padding-right: 15px;
  width: 300px;
`;
const ItemRight = styled.div`
  padding-left: 15px;
  width: 824px;
`;
const ItemMenu = styled.div<{ isLast?: boolean }>`
  display: flex;
  margin-bottom: ${(props) => {
    return props.isLast ? "0px" : "33px";
  }};
  align-items: center;
  cursor: pointer;
`;
const ItemLabel = styled.span<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? "#1B3459" : "#8190A7")};
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21.09px;
  margin-left: 10.5px;
  margin-right: 15px;
`;

const ListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "transparent",
      color: "rgb(27, 52, 89)",

      "& .MuiListItemIcon-root": {
        color: "rgb(27, 52, 89)",
      },
      "& .MuiTypography-root": {
        fontWeight: 500,
        fontSize: 18,
      },
    },
    "&$selected:hover": {
      backgroundColor: "transparent",
      color: "rgb(27, 52, 89)",
      fontWeight: 500,
      fontSize: 18,
      lineHeight: 21.09,
      "& .MuiListItemIcon-root": {
        color: "rgb(27, 52, 89)",
      },
      "& .MuiTypography-root": {
        fontWeight: 500,
        fontSize: 18,
      },
    },
    "&:hover": {
      backgroundColor: "transparent",
      color: "rgb(27, 52, 89)",
      fontWeight: 500,
      fontSize: 18,
      lineHeight: 21.09,
      "& .MuiListItemIcon-root": {
        color: "rgb(27, 52, 89)",
      },
      "& .MuiTypography-root": {
        fontWeight: 500,
        fontSize: 18,
      },
    },
  },
  selected: {},
})(ListItemButton);

const BuyingGuide = () => {
  const Router = useRouter();
  const params = Router.query.id;
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState<any | null>(params);
  const [activeTab, setActiveTab] = useState<
    "useMap" | "compare" | "tradingGuide"
  >("useMap");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (params === "4" || params === "5") {
      setOpen(true);
    }
  }, [Router]);

  const handleClick = () => {
    setSelectedIndex(params);
    setOpen(!open);
  };
  useEffect(() => {
    setSelectedIndex(params);
  }, [params]);
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: string
  ) => {
    setSelectedIndex(index);
  };

  const renderRightContent = useMemo(() => {
    switch (selectedIndex) {
      case "1":
        return <div>Sử dụng bản đồ</div>;
      case "2":
        return <div>So sánh sản phẩm</div>;
      case "4":
        return <div>Hướng dẫn giao dịch Online</div>;
      case "5":
        return <div>Hướng dẫn giao dịch Offline</div>;

      case "6":
        return <div>Hướng dẫn về thông tin tài khoản</div>;

      case "7":
        return <div>Hướng dẫn thanh toán</div>;

      case "8":
        return <div>Câu hỏi thường gặp</div>;

      default:
        return null;
    }
  }, [selectedIndex]);


  const renderLeft = useMemo(() => {
    return (
      <>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={classes.root}
        >
          <ListItem
            selected={selectedIndex === "0"}
            onClick={(event) => handleListItemClick(event, "0")}
          >
            <ListItemIcon style={{ minWidth: 30 }}>
              <IconBell active={selectedIndex === "0"} />
            </ListItemIcon>
            <ListItemText
              style={{
                color:
                  selectedIndex === "0"
                    ? "rgb(27, 52, 89)"
                    : "rgb(129, 144, 167)",
                fontWeight: "500 !important",
              }}
              primary="Sử dụng bản đồ"
            />
          </ListItem>
          <ListItem
            selected={selectedIndex === "1"}
            onClick={(event) => handleListItemClick(event, "1")}
          >
            <ListItemIcon style={{ minWidth: 30 }}>
              <IconShield active={selectedIndex === "1"} />
            </ListItemIcon>
            <ListItemText
              style={{
                color:
                  selectedIndex === "1"
                    ? "rgb(27, 52, 89)"
                    : "rgb(129, 144, 167)",
                fontWeight: 500,
              }}
              primary="So sánh sản phẩm"
            />
          </ListItem>
          <ListItem
            onClick={handleClick}
            selected={selectedIndex === "4" || selectedIndex === "5"}
          >
            <ListItemIcon style={{ minWidth: 30 }}>
              <IconPen />
            </ListItemIcon>
            <ListItemText
              style={{
                color:
                  selectedIndex === "4" || selectedIndex === "5"
                    ? "rgb(27, 52, 89)"
                    : "rgb(129, 144, 167)",
                fontWeight: 500,
              }}
              primary="Hướng Dẫn giao dịch"
            />
            {open ? <IconArrowDown /> : <IconArrowRight />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                sx={{ pl: 4 }}
                selected={selectedIndex === "4"}
                onClick={(event) => handleListItemClick(event, "4")}
              >
                <ListItemIcon style={{ minWidth: 30 }}>
                  <IconDauCham active={selectedIndex === "4"} />
                </ListItemIcon>
                <ListItemText
                  style={{
                    color:
                      selectedIndex === "4"
                        ? "rgb(27, 52, 89)"
                        : "rgb(129, 144, 167)",
                    fontWeight: 500,
                  }}
                  primary="Hướng dẫn mua online"
                />
              </ListItem>
              <ListItem
                sx={{ pl: 4 }}
                selected={selectedIndex === "5"}
                onClick={(event) => handleListItemClick(event, "5")}
              >
                <ListItemIcon style={{ minWidth: 30 }}>
                  <IconDauCham active={selectedIndex === "5"} />
                </ListItemIcon>
                <ListItemText
                  style={{
                    color:
                      selectedIndex === "5"
                        ? "rgb(27, 52, 89)"
                        : "rgb(129, 144, 167)",
                    fontWeight: 500,
                  }}
                  primary="Hướng dẫn mua offline"
                />
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            selected={selectedIndex === "6"}
            onClick={(event) => handleListItemClick(event, "6")}
          >
            <ListItemIcon style={{ minWidth: 30 }}>
              <IconShield active={selectedIndex === "6"} />
            </ListItemIcon>
            <ListItemText
              style={{
                color:
                  selectedIndex === "6"
                    ? "rgb(27, 52, 89)"
                    : "rgb(129, 144, 167)",
                fontWeight: 500,
              }}
              primary="Hướng dẫn về thông tin tài khoản"
            />
          </ListItem>
          <ListItem
            selected={selectedIndex === "7"}
            onClick={(event) => handleListItemClick(event, "7")}
          >
            <ListItemIcon style={{ minWidth: 30 }}>
              <IconShield active={selectedIndex === "7"} />
            </ListItemIcon>
            <ListItemText
              style={{
                color:
                  selectedIndex === "7"
                    ? "rgb(27, 52, 89)"
                    : "rgb(129, 144, 167)",
                fontWeight: 500,
              }}
              primary="Hướng dẫn thanh toán"
            />
          </ListItem>
          <ListItem
            selected={selectedIndex === "8"}
            onClick={(event) => handleListItemClick(event, "8")}
          >
            <ListItemIcon style={{ minWidth: 30 }}>
              <IconShield active={selectedIndex === "8"} />
            </ListItemIcon>
            <ListItemText
              style={{
                color:
                  selectedIndex === "8"
                    ? "rgb(27, 52, 89)"
                    : "rgb(129, 144, 167)",
                fontWeight: "500 !important",
              }}
              primary="Câu hỏi thường gặp"
            />
          </ListItem>
        </List>
      </>
    );
  }, [selectedIndex,open]);

  return (
    <Page
      meta={{
        title: "TNR Ecommerce",
        description: "TNR Ecommerce",
        isHomePage: true,
      }}
    >
      <FlexContainer>
        <Container>
          <ItemLeft>
            <BoxContainer styleCustom={{ backgroundColor: "#F3F4F6" }}>
              {/* <ItemMenu onClick={() => setActiveTab("useMap")}>
                <IconBell />
                <ItemLabel isActive={activeTab == "useMap"}>
                  Sử dụng bản đồ
                </ItemLabel>
                {activeTab == "useMap" && <IconArrowRight />}
              </ItemMenu>
              <ItemMenu onClick={() => setActiveTab("compare")}>
                <IconShield />
                <ItemLabel isActive={activeTab == "compare"}>
                  So sánh sản phẩm
                </ItemLabel>
                {activeTab == "compare" && <IconArrowRight />}
              </ItemMenu>
              <ItemMenu onClick={() => setActiveTab("tradingGuide")} isLast>
                <IconPen />
                <ItemLabel isActive={activeTab == "tradingGuide"}>
                  Hướng dẫn giao dịch
                </ItemLabel>
                {activeTab == "tradingGuide" && <IconArrowRight />}
              </ItemMenu> */}
              {renderLeft}
            </BoxContainer>
          </ItemLeft>
          <ItemRight>
            <BoxContainer styleCustom={{ minHeight: 1000, padding: 10 }}>
              {renderRightContent}
            </BoxContainer>
          </ItemRight>
        </Container>
      </FlexContainer>
    </Page>
  );
};

export default BuyingGuide;
