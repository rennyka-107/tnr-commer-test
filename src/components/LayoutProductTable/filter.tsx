import ProductCategorySelect from "@components/Form/CategorySelect";
import ControllerSelect from "@components/Form/ControllerSelect";
import FormGroup from "@components/Form/FormGroup";
import LOTSelect from "@components/Form/LOTSelect";
import IconAvaliableSale from "@components/Icons/avaliableSale";
import IconCommingSale from "@components/Icons/commingSale";
import IconStopSale from "@components/Icons/stopSale";
import IconWaitPaymentSale from "@components/Icons/waitPayment";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, Grid } from "@mui/material";
import { BodyRequest } from "@service/productTable";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { InputProps } from "utils/constants";
import * as yup from "yup";
import { RootState } from "../../../store/store";
interface PropsI {
  onSubmit?: (values: BodyRequest) => void;
  body?: BodyRequest;
}

interface FormI {
  projectLevel1: string;
  categoryId: string;
  saleProductStatus: string[];
  projectId: string;
}

const Filter = (props: PropsI) => {
  const { onSubmit, body } = props;
  const { listMenuBarProjectType, listMenuBarType } = useSelector(
    (state: RootState) => state.menubar
  );

  const formControler = useForm<FormI>({
    mode: "onChange",
    resolver: yupResolver(yup.object().shape({})),
    defaultValues: { saleProductStatus: [] },
  });
  const { control, handleSubmit, watch, getValues, setValue } = formControler;

  useEffect(() => {
    // console.log(getValues("categoryId"), '----getValues("categoryId") ----');

    if (!!getValues("projectId")) {
      onSubmit({
        ...body,
        projectId: getValues("projectId"),
        saleProductStatus: getValues("saleProductStatus") as string[],
        categoryId: getValues("categoryId"),
        projectLevel1: getValues("projectLevel1"),
      });
    }
  }, [
    watch("projectId"),
    watch("saleProductStatus"),
    watch("categoryId"),
    watch("projectLevel1"),
  ]);

  const statusOptions = [
    { label: "Ngừng bán", value: 4 }, //đã bán
    { label: "Sắp mở bán", value: 99 },
    { label: "Còn hàng", value: 2 },//mở bán
    { label: "Chờ thanh toán", value: 3 },
  ];

  const renderIcon = (item: any) => {
    switch (item.value) {
      case 4:
        return <IconStopSale />;
      case 2:
        return <IconAvaliableSale />;
      case 3:
        return <IconWaitPaymentSale />;
      default:
        return <IconCommingSale />;
    }
  };

  return (
    <Grid sx={{ pb: 2 }} container rowSpacing={1}>
      <Grid item xs={12} md={6} xl={3}>
        <FormGroup sx={{ mb: 2, paddingRight: 2 }} fullWidth>
          <ControllerSelect
            variant="outlined"
            name="projectId"
            label="Dự án"
            control={control}
            inputProps={InputProps}
            required
            setValue={formControler.setValue}
            isClear
            dataSelect={listMenuBarType?.map((el) => {
              return { label: el?.name, value: el?.id };
            })??[]}
            onClick={() => {
              setValue("categoryId", null);
              setValue("projectLevel1", null);
            }}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6} xl={3}>
        <FormGroup sx={{ mb: 2, paddingRight: 2 }} fullWidth>
          <ProductCategorySelect
            name="categoryId"
            label="Dòng sản phẩm"
            control={control}
            // required
            setValue={formControler.setValue}
            isClear
            idProject={watch("projectId")}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6} xl={3}>
        <FormGroup sx={{ mb: 2, paddingRight: 2 }} fullWidth>
          <LOTSelect
            name="projectLevel1"
            label="Khu"
            control={control}
            // required
            setValue={formControler.setValue}
            isClear
            idProject={watch("projectId")}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6} xl={3}>
        <FormGroup sx={{ mb: 2, paddingRight: 2 }} fullWidth>
          <ControllerSelect
            variant="outlined"
            name="saleProductStatus"
            label="Trạng thái"
            control={control}
            fullWidth
            inputProps={InputProps}
            required
            setValue={formControler.setValue}
            isClear
            dataSelect={statusOptions}
            multiple
            renderItemSelect={(item) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <div>
                    <Checkbox
                      checked={(
                        watch("saleProductStatus") as (string | number)[]
                      ).includes(item?.value)}
                    />
                  </div>
                  <div>{item.label}</div>
                  <div>{renderIcon(item)}</div>
                </div>
              );
            }}
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default Filter;
