import BoxContainer from "@components/CustomComponent/BoxContainer";
import Column from "@components/CustomComponent/Column";
import CustomButton from "@components/CustomComponent/CustomButton";
import HorizontalLine from "@components/CustomComponent/HorizontalLine";
import Row from "@components/CustomComponent/Row";
import ControllerCheckbox from "@components/Form/ControllerCheckbox";
import ControllerSelect from "@components/Form/ControllerSelect";
import ControllerSelectAutoComplete from "@components/Form/ControllerSelectAutoComplete";
import ControllerTextField from "@components/Form/ControllerTextField";
import FormGroup from "@components/Form/FormGroup";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { InputProps, validateLine } from "utils/constants";
import * as yup from 'yup';

const AvataContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    padding:47px 0px;
`;


const EditProfile = () => {
    const validationSchema = yup.object().shape({
        DanhXung: yup.string().required(validateLine.required),
        doiTuong: yup.string().required(validateLine.required),
        quanHuyen: yup.string().required(validateLine.required),
    });

    const formControler = useForm<any>({
        mode: 'onChange',
        resolver: yupResolver(validationSchema),
        defaultValues: validationSchema.getDefault(),
    });

    const { control, handleSubmit } = formControler

    const onSubmit = (FormValues) => {
        console.log(FormValues, 'FormValues');
    }

    const dataDanhXung = [
        { label: "lựa chọn 1", value: 1 },
        { label: "lựa chọn 2", value: 2 },
        { label: "lựa chọn 3", value: 3 },
        { label: "lựa chọn 4", value: 4 },
        { label: "lựa chọn 5", value: 5 },
        { label: "lựa chọn 6", value: 6 }
    ];

    return (
        <form onSubmit={handleSubmit((values) => onSubmit(values))}>
            <BoxContainer titleHeader="Chỉnh sửa hồ sơ">
                <AvataContainer>
                    <Image src={"/images/avatar.png"} alt="" width={125} height={125} style={{ borderRadius: 20 }} />
                </AvataContainer>
                <Row>
                    <Column>
                        <FormGroup sx={{ mb: 2 }} fullWidth>
                            <ControllerSelect
                                variant="outlined"
                                name="doiTuong"
                                label="Đối tượng khách hàng"
                                control={control}
                                fullWidth
                                inputProps={InputProps}
                                required
                                setValue={formControler.setValue}
                                isClear
                                dataSelect={dataDanhXung}
                            />
                        </FormGroup>
                    </Column>
                    <Column>
                        <FormGroup sx={{ mb: 2 }} fullWidth>
                            <ControllerSelect
                                variant="outlined"
                                name="DanhXung"
                                label="Danh xưng"
                                control={control}
                                fullWidth
                                inputProps={InputProps}
                                required
                                setValue={formControler.setValue}
                                isClear
                                dataSelect={dataDanhXung}
                            />
                        </FormGroup>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <FormGroup sx={{ mb: 2 }} fullWidth>
                            <ControllerTextField
                                variant="outlined"
                                hiddenLabel
                                name=""
                                control={control}
                                placeholder="Họ và tên"
                                required
                                fullWidth
                                label="Họ và tên"
                                InputProps={InputProps}
                            />
                        </FormGroup>
                    </Column>
                    <Column>
                        <FormGroup sx={{ mb: 2 }} fullWidth>
                            <ControllerTextField
                                variant="outlined"
                                hiddenLabel
                                name=""
                                control={control}
                                placeholder="Ngày sinh"
                                fullWidth
                                label="Ngày sinh"
                                InputProps={InputProps}
                            />
                        </FormGroup>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <FormGroup fullWidth>
                            <ControllerTextField
                                variant="outlined"
                                hiddenLabel
                                name=""
                                control={control}
                                placeholder="Điện thoại"
                                required
                                fullWidth
                                label="Điện thoại"
                                InputProps={InputProps}
                            />
                        </FormGroup>
                    </Column>
                    <Column>
                        <FormGroup fullWidth>
                            <ControllerTextField
                                variant="outlined"
                                hiddenLabel
                                name=""
                                control={control}
                                placeholder="Email"
                                fullWidth
                                label="Email"
                                InputProps={InputProps}
                            />
                        </FormGroup>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <HorizontalLine mb={36} mt={36} />
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <FormGroup sx={{ mb: 2 }} fullWidth>
                            <ControllerTextField
                                variant="outlined"
                                hiddenLabel
                                name=""
                                control={control}
                                placeholder="Số CCCD/CMND"
                                fullWidth
                                label="Số CCCD/CMND"
                                InputProps={InputProps}
                            />
                        </FormGroup>
                    </Column>
                    <Column>
                        <FormGroup sx={{ mb: 2 }} fullWidth>
                            <ControllerTextField
                                variant="outlined"
                                hiddenLabel
                                name=""
                                control={control}
                                placeholder="Đính kèm"
                                fullWidth
                                label="Đính kèm"
                                InputProps={InputProps}
                            />
                        </FormGroup>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <FormGroup sx={{ mb: 2 }} fullWidth>
                            <ControllerTextField
                                variant="outlined"
                                hiddenLabel
                                name=""
                                control={control}
                                placeholder="Nơi cấp"
                                fullWidth
                                label="Nơi cấp"
                                InputProps={InputProps}
                            />
                        </FormGroup>
                    </Column>
                    <Column>
                        <FormGroup sx={{ mb: 2 }} fullWidth>
                            <ControllerTextField
                                variant="outlined"
                                hiddenLabel
                                name=""
                                control={control}
                                placeholder="Ngày cấp"
                                fullWidth
                                label="Ngày cấp"
                                InputProps={InputProps}
                            />
                        </FormGroup>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <FormGroup sx={{ mb: 2 }} fullWidth>
                            <ControllerTextField
                                variant="outlined"
                                hiddenLabel
                                name=""
                                control={control}
                                placeholder="Địa chỉ thường chú"
                                fullWidth
                                label="Địa chỉ thường chú"
                                InputProps={InputProps}
                            />
                        </FormGroup>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <FormGroup sx={{ mb: 2 }} fullWidth>
                            <ControllerTextField
                                variant="outlined"
                                hiddenLabel
                                name=""
                                control={control}
                                placeholder="Địa chỉ liên lạc"
                                fullWidth
                                label="Địa chỉ liên lạc"
                                InputProps={InputProps}
                            />
                        </FormGroup>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <FormGroup sx={{ mb: 2 }} fullWidth>
                            <ControllerTextField
                                variant="outlined"
                                hiddenLabel
                                name=""
                                control={control}
                                placeholder="Thành phố/Tỉnh"
                                fullWidth
                                label="Thành phố/Tỉnh"
                                InputProps={InputProps}
                            />
                        </FormGroup>
                    </Column>
                    <Column>
                        <FormGroup fullWidth>
                            <ControllerSelectAutoComplete
                                variant="outlined"
                                name="quanHuyen"
                                control={control}
                                required
                                label="Quận/Huyện"
                                setValue={formControler.setValue}
                                options={dataDanhXung}
                            />
                        </FormGroup>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <CustomButton label="Cập nhật"
                            style={{ background: "#1B3459", width: 255, marginTop: 57 }}
                            type="submit"
                        />
                    </Column>
                </Row>
            </BoxContainer>
        </form>
    )
}

export default EditProfile;