import styled from "@emotion/styled";
import { Card, Stack, Divider, Typography, Button } from "@mui/material";
import PopUpItem, { ItemWrapper } from "./PopUpItem";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  removeComparePopUpItem,
  removeAllComparePopUpItem,
  setValidCompare,
} from "../../../../store/productCompareSlice";
import { RootState } from "../../../../store/store";
import _ from "lodash";
import { useEffect } from "react";
import LocalStorage from "utils/LocalStorage";

const CardStyled = styled(Card)`
  position: fixed;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  z-index: 10;
  box-shadow: 1px -1px 11px 1px rgba(0, 0, 0, 0.4);
  max-width: 1040px;
  border-radius: 25px 25px 0 0;
  padding: 20px;
  bottom: 0;
  display: ${(props) => (props.hidden ? "none" : "block")};
`;

const TextButtonStyled = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
  color: #0e1d34;
`;

interface ComparePopUpProps {
  projectId: string;
  projectTypeId: string;
}

const ComparePopUp = ({ projectId, projectTypeId }: ComparePopUpProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { comparePopUpItem } = useSelector(
    (state: RootState) => state.productCompareSlice
  );

  useEffect(() => {
    const params = LocalStorage.get("compare-url");
    if (
      comparePopUpItem.length === 0 ||
      (comparePopUpItem.length > 0 &&
        params &&
        params.projectId === projectId &&
        params.projectTypeId === projectTypeId)
    ) {
      dispatch(setValidCompare(true));
      LocalStorage.set("compare-url", {
        projectId: projectId,
        projectTypeId: projectTypeId,
        priceTo: "20",
        priceFrom: "1",
        areaTo: "200",
        areaFrom: "30",
        categoryId: "",
      });
    } else {
      dispatch(setValidCompare(false));
    }
  }, [projectId, projectTypeId, comparePopUpItem]);

  const remove = (id?: string) => () => {
    if (id) {
      if (comparePopUpItem) {
        dispatch(removeComparePopUpItem(id));
      }
    } else {
      dispatch(removeAllComparePopUpItem({}));
    }
  };

  const onCompare = () => {
    router.push({
      pathname: `/compare-product`,
      query: {
        productId: comparePopUpItem.map((item) => item.productId),
      },
    });
  };

  return (
    <CardStyled hidden={comparePopUpItem.length === 0}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={5}
      >
        {comparePopUpItem.map((item) => (
          <PopUpItem
            data={item}
            onRemove={remove(item.productId)}
            key={item.productId}
          />
        ))}
        {Array.from({ length: 3 - comparePopUpItem.length }).map(
          (item, index) => (
            <ItemWrapper key={index} />
          )
        )}
        <Stack direction="column" justifyContent="center" spacing={2}>
          <Button
            disabled={comparePopUpItem.length < 2}
            variant={"contained"}
            onClick={onCompare}
          >
            So sánh {comparePopUpItem.length}/3
          </Button>
          <TextButtonStyled style={{ color: "#0063F7" }} onClick={remove()}>
            Xoá tất cả sản phẩm
          </TextButtonStyled>
        </Stack>
      </Stack>
    </CardStyled>
  );
};

export default ComparePopUp;
