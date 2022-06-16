import ControllerSelect from "@components/Form/ControllerSelect";
import FormGroup from "@components/Form/FormGroup";
import IconAvaliableSale from "@components/Icons/avaliableSale";
import IconCommingSale from "@components/Icons/commingSale";
import IconStopSale from "@components/Icons/stopSale";
import IconWaitPaymentSale from "@components/Icons/waitPayment";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { BodyRequest } from "@service/productTable";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { InputProps } from "utils/constants";
import * as yup from 'yup';
import { RootState } from "../../../store/store";
interface PropsI {
    onSubmit?: (values: BodyRequest) => void;
    body?: BodyRequest;
}


const DynamicMenuDropdown = dynamic(() =>
    import("ItemComponents/MenuDropdown").then(
        (m) => m.default,
        (e) => null as never
    )
);


const Filter = (props: PropsI) => {
    const { onSubmit, body } = props
    const { listMenuBarProjectType, listMenuBarType } = useSelector(
        (state: RootState) => state.menubar
    );

    const formControler = useForm<{ status: string[], khu: string, projectTypeId: string, projectId: string }>({
        mode: 'onChange',
        resolver: yupResolver(yup.object().shape({})),
        defaultValues: { status: [] }
    });
    const { control, handleSubmit, watch, getValues } = formControler

    useEffect(() => {
        onSubmit({ ...body, projectId: getValues('projectId') })
    }, [watch('projectId')])

    const statusOptions = [
        { label: "Ngừng bán", value: -1 },
        { label: "Sắp mở bán", value: 0 },
        { label: "Còn hàng", value: 1 },
        { label: "Chờ thanh toán", value: 2 },
    ];


    const renderIcon = (item: any) => {
        switch (item.value) {
            case -1:
                return <IconStopSale />
            case 0:
                return <IconCommingSale />
            case 1:
                return <IconAvaliableSale />
            case 2:
                return <IconWaitPaymentSale />

            default:
                return null;
        }
    }

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
                        dataSelect={listMenuBarType.map((el) => { return { label: el?.name, value: el?.id } })}
                    />
                </FormGroup >
            </Grid>
            <Grid item xs={12} md={6} xl={3} >
                <FormGroup sx={{ mb: 2, paddingRight: 2 }} fullWidth>
                    <ControllerSelect
                        variant="outlined"
                        name="projectTypeId"
                        label="Dòng sản phẩm"
                        control={control}
                        fullWidth
                        inputProps={InputProps}
                        required
                        setValue={formControler.setValue}
                        isClear
                        dataSelect={listMenuBarType.map((el) => { return { label: el?.name, value: el?.id } })}
                    />
                </FormGroup >
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
                <FormGroup sx={{ mb: 2, paddingRight: 2 }} fullWidth>
                    <ControllerSelect
                        variant="outlined"
                        name="khu"
                        label="Khu"
                        control={control}
                        fullWidth
                        inputProps={InputProps}
                        required
                        setValue={formControler.setValue}
                        isClear
                        dataSelect={statusOptions}
                    />
                </FormGroup>
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
                <FormGroup sx={{ mb: 2, paddingRight: 2 }} fullWidth>
                    <ControllerSelect
                        variant="outlined"
                        name="status"
                        label="Trạng thái"
                        control={control}
                        fullWidth
                        inputProps={InputProps}
                        required
                        setValue={formControler.setValue}
                        isClear
                        dataSelect={statusOptions}
                        multiple
                    // renderItemSelect={(item) => {
                    //     return (
                    //         <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    //             <div>{item.label}</div>
                    //             <div>{renderIcon(item)}</div>
                    //         </div>
                    //     )
                    // }}
                    />
                </FormGroup>
            </Grid>
        </Grid >





    )
}

export default Filter;