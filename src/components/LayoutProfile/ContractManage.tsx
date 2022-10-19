import BoxContainer from "@components/CustomComponent/BoxContainer";
import styled from "@emotion/styled";
import { ContractI, getContractByUser, getOrderByUser } from "@service/Profile";
import MenuDropdown from "ItemComponents/MenuDropdown";
import MenuDropdownStatus from "ItemComponents/MenuDropdownStatus";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoApi } from "../../../pages/api/profileApi";
import { setOrderByUser } from "../../../store/orderByUserSlice";
import { getUserInfo } from "../../../store/profileSlice";
import { RootState } from "../../../store/store";

const DynamicProductCard = dynamic(() =>
  import("./ProductCard").then(
    (m) => m.default,
    (e) => null as never
  )
);

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderTitle = styled.span`
  color: #1b3459;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 33px;
`;

const statusTrans = [
  {
    id: "",
    value: "Tất Cả",
  },
  {
    id: "0",
    value: "Chưa hoàn thành hồ sơ",
  },
  {
    id: "1",
    value: "Đã hoàn thiện hồ sơ",
  },
  {
    id: "2",
    value: "Hết thời gian thanh toán",
  },
  {
    id: "3",
    value: "Đã duyệt",
  },
  {
    id: "4",
    value: "Đã tạo phiếu thanh toán",
  },
  {
    id: "5",
    value: "Đã tạo bản nháp thông tin mua hàng",
  },
];

const ContractManage = () => {
  const [contracts, setContracts] = useState<ContractI[]>([]);
  const { listMenuBarType } = useSelector((state: RootState) => state.menubar);
  const router = useRouter();
  const dispatch = useDispatch();

  const [bodySearch, setBodySearch] = useState<any>({
    projectId: "",
    status: "",
  });

  const getContract = async () => {
    const data = new FormData();
    data.append("projectId", bodySearch.projectId);
    data.append("status", bodySearch.status);

    const response = await getOrderByUser(data);
    setContracts(response?.responseData ?? []);
  };

  useEffect(() => {
    getContract();
  }, [bodySearch, router]);

  const handleSelectProject = (e: any) => {
    if (e.id === "1") {
      setBodySearch({ ...bodySearch, projectId: "" });
    } else {
      setBodySearch({ ...bodySearch, projectId: e.id });
    }
  };
  const handleSelectStatus = (e: any) => {
    // if(e.id === " "){
    // 	setBodySearch({ ...bodySearch, status: '' });
    // }else {
    setBodySearch({ ...bodySearch, status: e.id });
    // }
  };

  useEffect(() => {
    (async () => {
      const responseUser = await getUserInfoApi();
      dispatch(getUserInfo(responseUser.responseData));
    })();
  }, []);

  return (
    <BoxContainer
	
      HeaderCustom={
        <HeaderContainer>
          <HeaderTitle>Quản lý giao dịch</HeaderTitle>
          <BoxContainer
            styleCustom={{
              display: "flex",
              padding: "12px 20px",
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <MenuDropdown
              title={"Dự án"}
              data={listMenuBarType}
              onSelect={(item) => {
                handleSelectProject(item);
              }}
            />
            <MenuDropdownStatus
              title={"Trạng thái"}
              data={statusTrans}
              onSelect={(item) => {
                handleSelectStatus(item);
              }}
            />
          </BoxContainer>
        </HeaderContainer>
      }
      styleCustom={{ padding: "21px 24px" }}
    >
      {(contracts || []).map((item: ContractI, index) => (
        <DynamicProductCard
          item={item}
          isLast={index == contracts.length - 1}
          key={item.id}
        />
      ))}
    </BoxContainer>
  );
};

export default ContractManage;
