import BoxContainer from "@components/CustomComponent/BoxContainer";
import MenuDropdown from "ItemComponents/MenuDropdown";
import React from "react";
import { useForm } from "react-hook-form";
import { FilterI } from "./[type]";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import dynamic from "next/dynamic";
interface PropsI {
    onSubmit?: (values: FilterI) => void;
}


const DynamicMenuDropdown = dynamic(() =>
    import("ItemComponents/MenuDropdown").then(
        (m) => m.default,
        (e) => null as never
    )
);

const Filter = (props: PropsI) => {
    const { onSubmit } = props
    const formControler = useForm<FilterI>({
        mode: 'onChange',
        resolver: yupResolver(yup.object().shape({})),
    });
    const { control, handleSubmit } = formControler
    return (
        <form onSubmit={handleSubmit((values: FilterI) => onSubmit(values))}>
            <BoxContainer styleCustom={{ borderRadius: 8, display: 'flex', justifyContent: "space-around" }}>
                <DynamicMenuDropdown title="Vị trí" />
                <DynamicMenuDropdown title="Loại" />
                <DynamicMenuDropdown title="Khoảng giá" />
                <DynamicMenuDropdown title="Sắp xếp theo" />
            </BoxContainer>
        </form>

    )
}

export default Filter;