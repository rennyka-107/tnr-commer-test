import PaginationComponent from "@components/CustomComponent/PaginationComponent";
import CartItem from "@components/Element/CartItem";
import PageBorder from "@components/Element/PageBorder";
import Subtitle from "@components/Element/Subtitle";
import { Box, Dialog, Divider, Grid } from "@mui/material";
import { getOrderByUser } from "@service/Profile";
import useNotification from "hooks/useNotification";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Product } from "type/common";
import { apiChangeProductPayment } from "../../../../pages/api/paymentApi";
import { getListProduct } from "../../../../pages/api/productsApi";
import SendRequest from "../SendRequest";
import ButtonForm from "./ButtonForm";
import FilterSection from "./FilterSection";
import NomalForm from "./NomalForm";

type Props = {
  orderDetail?: any;
};

interface Params {
  page: number;
  size: number;
}

export interface Filter {
  isPayment: number;
  sortType: number;
}

const ChangeApartmentRequest = ({ orderDetail }: Props) => {
  const {
    query: { txcode },
  } = useRouter();
  const notification = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filter | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [itemSelect, setItemSelect] = useState<any>(null);
  const [productList, setProductList] = useState<Product[]>([]);
  const [params, setParams] = useState<Params>({
    page: 0,
    size: 12,
  });
  const [total, setTotal] = useState<number>(0);
  const [contact, setContact] = useState<any>();

  const getContract = async () => {
    const data = new FormData();
    data.append("projectId", "");
    data.append("status", "");

    const response = await getOrderByUser(data);
    const contacts = response?.responseData ?? [];
    const contact = contacts.find((contact) => contact.bookingCode === txcode);
    setContact(contact);
  };

  useEffect(() => {
    getContract();
  }, []);

  useEffect(() => {
    console.log("orderDetail", orderDetail);
    if (!orderDetail?.production?.project?.id) return;

    let newFilter: any = {};
    if (filter) {
      newFilter = {
        ...filter,
        projectIdList: [orderDetail.production.project.id],
      };
    } else {
      newFilter = {
        projectIdList: [orderDetail.production.project.id],
      };
    }

    getListProduct(params, newFilter).then((res) => {
      if (res.responseCode === "00") {
        setProductList(res.responseData);
        setTotal(Math.floor(res.totalElement / params.size) || 1);
      }
    });
  }, [params, filter, orderDetail]);
  // F2B085F6-0D89-4517-97F9-1F67C74599E9
  const handleOpenModal = () => {
    if (!open) {
      setOpen(true);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSelectItem = (item: any) => {
    setItemSelect(item);
  };

  console.log("itemSelect", itemSelect, productList);
  const handleEnterProductCode = (value: string) => () => {
    getListProduct(params, {
      textSearch: value,
    }).then((res) => {
      console.log("test", res);
    });
  };
  const handleClickBtn = () => {
    if (!itemSelect || !contact) return;

    const data = {
      newProductId: itemSelect.productId,
      transactionId: contact.transactionId,
      transactionCodeLandSoft: contact.transactionCodeLandSoft,
      productId: contact.productId,
      customerIdentity: contact.idNumber,
      customerName: contact.fullname,
    };

    setLoading(true);
    apiChangeProductPayment(data)
      .then((res) => {
        if (res.responseCode === "00") {
          notification({
            severity: "success",
            message: "Gửi yêu cầu đổi căn thành công",
          });
        } else {
          notification({
            severity: "error",
            message: res.responseMessage,
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChangeFilter = (newFilter: Filter) => {
    console.log("newFilter", newFilter);
    setFilter(newFilter);
  };

  return (
    <Box>
      <PageBorder
        sx={{
          marginBottom: "30px",
        }}
      >
        <Subtitle sx={{ mb: 4 }}>Thông tin sản phẩm muốn đổi sang</Subtitle>
        {!itemSelect ? (
          <Fragment>
            <NomalForm handleEnterProductCode={handleEnterProductCode} />
            <Box sx={{ my: 2, textAlign: "center", fontSize: "16px" }}>
              Hoặc
            </Box>
            <ButtonForm handleOpenModal={handleOpenModal} />
          </Fragment>
        ) : (
          <CartItem item={itemSelect}>
            <CartItem.ContentWrap item={itemSelect}>
              <CartItem.Title item={itemSelect} />
              <Divider />
              <CartItem.GeneralInfo item={itemSelect} />
              <Divider />
              <CartItem.Price item={itemSelect} />
              <CartItem.ChangeSelect
                item={itemSelect}
                handleOpenModal={handleOpenModal}
              />
            </CartItem.ContentWrap>
          </CartItem>
        )}
      </PageBorder>
      <PageBorder>
        <SendRequest
          handleClickBtn={handleClickBtn}
          text="Gửi yêu cầu đổi căn"
          loading={loading}
        />
      </PageBorder>

      <Dialog open={open} onClose={handleCloseModal} maxWidth="lg">
        <Box
          sx={{
            fontWeight: 400,
            fontSize: "22px",
            textAlign: "center",
            mt: "20px",
          }}
        >
          Sản phẩm cùng dự án có thể đổi
        </Box>

        <FilterSection handleChangeFilter={handleChangeFilter} total={total} />

        <Box sx={{ p: "20px 40px" }}>
          <Grid container sx={{ rowGap: 2 }} spacing={2}>
            {productList.map((item, index) => (
              <Grid
                item
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  minWidth: "360px",
                }}
                xs={4}
              >
                <CartItem item={item}>
                  <CartItem.ContentWrap item={item}>
                    <CartItem.Title item={item} />
                    <Divider />
                    <CartItem.GeneralInfo item={item} />
                    <Divider />
                    <CartItem.Price item={item} />
                    <CartItem.Select
                      item={item}
                      handleSelectItem={handleSelectItem}
                      handleCloseModal={handleCloseModal}
                    />
                  </CartItem.ContentWrap>
                </CartItem>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            {/*!! add loading effect */}
            <PaginationComponent
              count={total}
              onChange={(event, page) => {
                setParams({
                  ...params,
                  page: page,
                });
              }}
              defaultPage={params.page + 1}
              page={params.page + 1}
            />
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ChangeApartmentRequest;
