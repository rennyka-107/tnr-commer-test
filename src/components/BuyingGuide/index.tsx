import BoxContainer from "@components/CustomComponent/BoxContainer";
import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles, withStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { responseUserManual } from "interface/userManual";
import { getUserManualById } from "../../../store/userManualSlice";
import { getUserManualContent } from "../../../pages/api/userManualApi";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import { RootState } from "../../../store/store";
import { isEmpty } from "lodash";

type PropsUserManual = {
  data: responseUserManual[];
};

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

const BuyingGuideComponent = ({ data }: PropsUserManual) => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const { userManualById } = useSelector(
    (state: RootState) => state.userManual
  );
  const [isloading, setIsLoading] = useState(true);
  const { idUserManual } = Router.query;
  const classes = useStyles();
  const [indexSelected, setIndexSelected] = useState<number>(null);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    idSelect: string
  ) => {
    Router.replace(`/buyingGuide?idUserManual=${idSelect}`);
  };

  const fetchDataSelect = async (id: any) => {
    try {
      setIsLoading(true);
      const response = await getUserManualContent(id);
      dispatch(getUserManualById(response.responseData));
      if (response.responseCode === "00") {
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataSelect(idUserManual);
  }, [idUserManual]);

  const renderRightContent = () => {
    return (
      <div style={{ height: "100%" }}>
        {isloading === true ? (
          <>
            <Skeleton
              sx={{ height: 250, borderRadius: 1 }}
              animation="wave"
              variant="rectangular"
            />
            <Skeleton />
            <Skeleton width="60%" />
            <Skeleton
              sx={{ height: 200, borderRadius: 1, width: 500 }}
              animation="wave"
              variant="rectangular"
            />
          </>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: userManualById.userManualContent.content,
            }}
          />
        )}
      </div>
    );
  };
  useEffect(() => {
    renderRightContent();
  }, [isloading]);

  const renderLeft = () => {
    return (
      <>
        {!isEmpty(data) && (
          <ItemLeft>
            <BoxContainer styleCustom={{ backgroundColor: "#F3F4F6" }}>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}
              >
                {data.map((item, index) => (
                  <ListItem
                    key={index}
                    selected={indexSelected === index}
                    onClick={(event) => handleListItemClick(event, item.id)}
                  >
                    <ListItemIcon style={{ minWidth: 30 }}>
                      <img
                        src={item.iconUrl}
                        style={{ width: 17, height: 17 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      style={{
                        color:
                          indexSelected === index
                            ? "rgb(27, 52, 89)"
                            : "rgb(129, 144, 167)",
                        fontWeight: "500 !important",
                      }}
                      primary={item.name}
                    />
                  </ListItem>
                ))}
              </List>
            </BoxContainer>
          </ItemLeft>
        )}
      </>
    );
  };
  useEffect(() => {
    renderLeft();
  }, [indexSelected]);

  useEffect(() => {
    if (!isEmpty(idUserManual) && !isEmpty(data)) {
      data.forEach((item, idx) => {
        if (item.id === idUserManual) {
          setIndexSelected(idx);
        }
      });
    }
  }, [idUserManual, data]);
  
  return (
    <>
      <Container>
        {renderLeft()}
        <ItemRight>
          <BoxContainer styleCustom={{ minHeight: 1000, padding: 10 }}>
            {renderRightContent()}
          </BoxContainer>
        </ItemRight>
      </Container>
    </>
  );
};
export default BuyingGuideComponent;
