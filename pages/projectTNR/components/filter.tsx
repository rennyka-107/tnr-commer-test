import BoxContainer from "@components/CustomComponent/BoxContainer";
import MenuDropdown from "ItemComponents/MenuDropdown";
import React from "react";

const Filter = () => {
    return (
        <BoxContainer styleCustom={{ padding: "15px 0px", borderRadius: 8, display: 'flex', justifyContent: "space-around" }}>
            <MenuDropdown title="Vị trí" />
            <MenuDropdown title="Loại" />
            <MenuDropdown title="Khoảng giá" />
            <MenuDropdown title="Sắp xếp theo" />
        </BoxContainer>
    )
}

export default Filter;