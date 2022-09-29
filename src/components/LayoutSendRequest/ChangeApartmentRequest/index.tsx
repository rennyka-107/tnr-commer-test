import PaginationComponent from "@components/CustomComponent/PaginationComponent";
import CartItem from "@components/Element/CartItem";
import PageBorder from "@components/Element/PageBorder";
import Subtitle from "@components/Element/Subtitle";
import { Box, Dialog, Divider, Grid } from "@mui/material";
import { getOrderByUser } from "@service/Profile";
import useNotification from "hooks/useNotification";
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
  projectId: string;
  paymentStatus: number;
  priceFrom: string;
  priceTo: string;
}

const ChangeApartmentRequest = ({ orderDetail }: Props) => {
  const {
    query: { txcode },
    replace,
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
  const [totalElement, setTotalElement] = useState<number>(0);
  const [contact, setContact] = useState<any>();
  const [searchTextLoading, setSearchTextLoading] = useState<boolean>(false);
  const [filterName, setFilterName] = useState<string>("");

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
        projectId: orderDetail.production.project.id,
        paymentStatus: 2,
        priceFrom: orderDetail.production.price,
        priceTo: "100000000000",
      };
    }

    getListProduct(params, newFilter).then((res) => {
      if (res.responseCode === "00") {
        setProductList(res.responseData);
        setTotal(Math.floor(res.totalElement / params.size) || 1);
        setTotalElement(res.totalElement);
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

  const handleEnterProductCode = (value: string) => () => {
    setSearchTextLoading(true);
    setFilterName(value);
    getListProduct(params, {
      textSearch: value,
    })
      .then((res) => {
        if (res.responseCode === "00") {
          setProductList(res.responseData);
          setTotal(Math.floor(res.totalElement / params.size) || 1);
          setTotalElement(res.totalElement);

          setOpen(true);
        }
      })
      .finally(() => {
        setSearchTextLoading(false);
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
      transactionCode: txcode,
    };

    setLoading(true);
    apiChangeProductPayment(data)
      .then((res) => {
        if (res.responseCode === "00") {
          notification({
            severity: "success",
            message: "Gửi yêu cầu đổi căn thành công",
          });
          replace("/send-request/success");
        } else {
          notification({
            severity: "error",
            message: res.responseMessage,
          });
          replace("/send-request/failure");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChangeFilter = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  const handleFilterName = (value: string) => {
    setFilterName(value);
  };

  const productListViewer = productList.filter((product) =>
    product.lotSymbolCommercial
      .toLocaleLowerCase()
      .includes(filterName.toLocaleLowerCase())
  );

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
            <NomalForm
              handleEnterProductCode={handleEnterProductCode}
              searchTextLoading={searchTextLoading}
            />
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

      <Dialog open={open} onClose={handleCloseModal} maxWidth="lg" fullWidth>
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

        <FilterSection
          handleChangeFilter={handleChangeFilter}
          total={total}
          totalElement={totalElement}
          handleFilterName={handleFilterName}
          filterName={filterName}
        />

        <Box sx={{ p: "20px 40px" }}>
          <Grid container sx={{ rowGap: 2 }} spacing={2}>
            {productListViewer.length < 1 && (
              <Box sx={{ textAlign: "center", width: "100%", my: 3 }}>
                Không tìm thấy sản phẩm nào
              </Box>
            )}
            {productListViewer.map((item, index) => (
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
