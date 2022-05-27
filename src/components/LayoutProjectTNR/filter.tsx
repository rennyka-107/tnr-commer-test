import BoxContainer from "@components/CustomComponent/BoxContainer";
import { BodyListProjectI } from "@service/ProjectList";
import dynamic from "next/dynamic";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
interface PropsI {
    onSubmit?: (values: BodyListProjectI) => void;
    body?: BodyListProjectI;
}


const DynamicMenuDropdown = dynamic(() =>
    import("ItemComponents/MenuDropdown").then(
        (m) => m.default,
        (e) => null as never
    )
);

const Filter = (props: PropsI) => {
    const { onSubmit, body } = props
    const { listMenuBarProjectType } = useSelector(
        (state: RootState) => state.menubar
    );


    return (
        <BoxContainer styleCustom={{ borderRadius: 8, display: 'flex', justifyContent: "space-around" }}>
            <DynamicMenuDropdown title="Vị trí" />
            <DynamicMenuDropdown title="Loại"
                data={listMenuBarProjectType}
                onSelect={(values) => {
                    onSubmit({ ...body, projectTypeId: values.id })
                }}
            />
            <DynamicMenuDropdown title="Khoảng giá" />
            <DynamicMenuDropdown title="Sắp xếp theo" />
        </BoxContainer>

    )
}

export default Filter;