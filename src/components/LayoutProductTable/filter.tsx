import ProductCategorySelect from "@components/Form/CategorySelect";
import ControllerSelect from "@components/Form/ControllerSelect";
import FormGroup from "@components/Form/FormGroup";
import LOTSelect from "@components/Form/LOTSelect";
import ProjectSelect from "@components/Form/ProjectSelect";
import IconAvaliableSale from "@components/Icons/avaliableSale";
import IconCommingSale from "@components/Icons/commingSale";
import IconStopSale from "@components/Icons/stopSale";
import IconWaitPaymentSale from "@components/Icons/waitPayment";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, Grid, Radio, RadioProps } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { BodyRequest } from "@service/productTable";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { InputProps } from "utils/constants";
import * as yup from "yup";
import { resetProjectMap } from "../../../store/projectMapSlice";
import { RootState } from "../../../store/store";
import { styled } from "@mui/material/styles";
import { apiGetProjectTypeBoard } from "../../../pages/api/getDataSelectApi";
interface PropsI {
  onSubmit?: (values: BodyRequest) => void;
  body?: BodyRequest;
}

interface FormI {
  projectLevel1: string;
  projectTypeId: string;
  projectTypeCode: string;
  //   categoryId: string;
  saleProductStatus: string[];
  projectId: string;
}
const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 24,
  height: 24,
  border: "1px solid #0063F7",
  backgroundColor: theme.palette.mode === "dark" ? "#f5f8fa" : "#f5f8fa",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#f5f8fa" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#0063F7",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 22,
    height: 22,
    backgroundImage: "radial-gradient(#FFFFFF,#FFFFFF 40%,transparent 50%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#0063F7",
  },
});
const Filter = (props: PropsI) => {
  const { onSubmit, body } = props;
  const [listMenuBar, setListMenuBar] = useState([]);
  const { listMenuBarProjectType, listMenuBarType } = useSelector(
    (state: RootState) => state.menubar
  );

	useEffect(() => {
		(async() => {
			const response = await apiGetProjectTypeBoard();
			if(response.responseCode === '00'){
				setListMenuBar(response.responseData)
			}
		})();
	},[])


  const formControler = useForm<FormI>({
    mode: "onChange",
    resolver: yupResolver(yup.object().shape({})),
    defaultValues: { saleProductStatus: [] },
  });
  const { control, handleSubmit, watch, getValues, setValue, reset } =
    formControler;
	

  useEffect(() => {
    // reset("projectId")
    const projectTypeId = getValues("projectTypeId");
    const projectId = getValues("projectId");

    if (projectTypeId) {
      const ProjectTypeSelect = listMenuBar.filter(
        (item) => item.id === projectTypeId
      );
      if (!!getValues("projectLevel1")) {
        onSubmit({
          ...body,
          projectId: getValues("projectId"),
          projectTypeId: ProjectTypeSelect[0].id,
          saleProductStatus: getValues("saleProductStatus") as string[],
          // categoryId: getValues("categoryId"),
          levelDetailName: getValues("projectLevel1"),
          projectTypeCode: ProjectTypeSelect[0].code,
        });
      } else {
        onSubmit({});
      }
    } else {
      if (!!getValues("projectLevel1")) {
        onSubmit({
          ...body,
          projectId: getValues("projectId"),
          projectTypeId: "",
          saleProductStatus: getValues("saleProductStatus") as string[],
          // categoryId: getValues("categoryId"),
          levelDetailName: getValues("projectLevel1"),
          projectTypeCode: "",
        });
      } else {
        onSubmit({});
      }
    }
  }, [
    watch("projectId"),
    watch("saleProductStatus"),
    watch("projectTypeId"),
    watch("projectLevel1"),
  ]);

  const statusOptions = [
    { label: "Ngừng bán", value: 4 }, //đã bán
    { label: "Sắp mở bán", value: 99 },
    { label: "Còn hàng", value: 2 }, //mở bán
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

  const BpRadio = (props: RadioProps) => {
    return (
      <Radio
        sx={{
          "&:hover": {
            bgcolor: "transparent",
          },
        }}
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        {...props}
      />
    );
  };
  return (
    <Grid sx={{ pb: 2 }} container rowSpacing={1}>
      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <FormGroup sx={{ mb: 2, paddingRight: 2, width: 170 }}>
          <ControllerSelect
            style={{ width: 160 }}
            variant="outlined"
            name="projectTypeId"
            label="Loại bất động sản"
            control={control}
            inputProps={InputProps}
            required
            setValue={formControler.setValue}
            dataSelect={
              listMenuBar?.map((el) => {
                return { label: el?.name, value: el?.id };
              }) ?? []
            }
            onClick={() => {
              //   setValue("categoryId", null);
              setValue("projectLevel1", null);
            }}
            renderItemSelect={(item: any) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      gap: 2,
                    }}
                  >
                    <div>
                      <BpRadio
                        checked={watch("projectTypeId")?.includes(item?.value)}
                      />
                    </div>
                    <div>{item.label}</div>
                  </div>
                  {/* <div>{renderIcon(item)}</div> */}
                </div>
              );
            }}
          />
        </FormGroup>
        <FormGroup sx={{ mb: 2, paddingRight: 2, width: 250 }}>
          <ProjectSelect
            style={{ width: 240 }}
            name="projectId"
            label="Dự án"
            control={control}
            required
            setValue={formControler.setValue}
            idProject={watch("projectTypeId")}
            idChecked={watch("projectId")}
          />
        </FormGroup>
        <FormGroup sx={{ mb: 2, paddingRight: 2, width: 260 }}>
          <LOTSelect
            style={{ width: 240 }}
            name="projectLevel1"
            label="Khu"
            control={control}
            required
            setValue={formControler.setValue}
            isClear
            idProject={watch("projectId")}
            idProjectType={watch("projectTypeId")}
          />
        </FormGroup>
        <FormGroup sx={{ mb: 2, paddingRight: 2 }}>
          <ControllerSelect
            variant="outlined"
            name="saleProductStatus"
            label="Trạng thái"
            control={control}
            fullWidth
            inputProps={InputProps}
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      gap: 2,
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
                  </div>
                  <div>{renderIcon(item)}</div>
                </div>
              );
            }}
          />
        </FormGroup>
      </div>
    </Grid>
  );
};

export default Filter;
