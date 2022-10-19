import { SpecialOfferI } from "interface/SpecialOffers";
import styled from "@emotion/styled";
import ImageWithHideOnErrorOffers from "hooks/ImageWithHideOnErrorOffers";
import Mask3 from "../../../public/images/mask_g_3.png";
import ContainerSales from "@components/Container/ContainerSales";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";
import { useState } from "react";

type Props = {
  data: SpecialOfferI[];
};

const ContainerStyled = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(4, 1fr);
  @media only screen and (max-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;



const SpecialOffersComponent = ({ data }: Props) => {
	// const defaultData = [
	// 	{
	// 		avatar: "https://online-uat.tng-holdings.vn/static-data/DF5ACE60-3235-4F7A-8176-CC5EF0719F48/702ccf8c-e7e4-4dd6-99c4-48b148484134/3270c5a4-d65d-4fac-96a1-50526cc08214/67f0a8ad-47bf-4982-af0b-066666ac8961/3c6f4e91-7ace-40cd-b258-5e382562f756.png",
	// 	  description: "<p><strong>Với mong muốn mang đến cho khách hàng ",
	// 	  endDate: "16-09-2023",
	// 	  id: "2f856bd1-74b9-4461-af9d-a865b575b6f6",
	// 	  lstProject: [{projectId: "2360ee8d-53f3-42c3-a01a-e1cd1d937844", projectName: null}],
	// 	  0: {projectId: "2360ee8d-53f3-42c3-a01a-e1cd1d937844", projectName: null},
	// 	  name: "Ưu đãi 20% giá thuê căn hộ dịch vụ khi tham gia chương trình “Một người thuê nhà – Hai người nhận quà”",
	// 	  startDate: "16-09-2022",
	// 	  status: 1,
	// 	  video: "",
	// 	  },
	// 	  {
	// 		avatar: "https://online-uat.tng-holdings.vn/static-data/DF5ACE60-3235-4F7A-8176-CC5EF0719F48/702ccf8c-e7e4-4dd6-99c4-48b148484134/3270c5a4-d65d-4fac-96a1-50526cc08214/67f0a8ad-47bf-4982-af0b-066666ac8961/3c6f4e91-7ace-40cd-b258-5e382562f756.png",
	// 	  description: "<p><strong>Với mong muốn mang đến cho khách hàng ",
	// 	  endDate: "16-09-2023",
	// 	  id: "2f856bd1-74b9-4461-af9d-a865b575b6f6",
	// 	  lstProject: [{projectId: "2360ee8d-53f3-42c3-a01a-e1cd1d937844", projectName: null}],
	// 	  0: {projectId: "2360ee8d-53f3-42c3-a01a-e1cd1d937844", projectName: null},
	// 	  name: "Ưu đãi 20% giá thuê căn hộ dịch vụ khi tham gia chương trình “Một người thuê nhà – Hai người nhận quà”",
	// 	  startDate: "16-09-2022",
	// 	  status: 1,
	// 	  video: "",
	// 	  },
	// 	  {
	// 		avatar: "https://online-uat.tng-holdings.vn/static-data/DF5ACE60-3235-4F7A-8176-CC5EF0719F48/702ccf8c-e7e4-4dd6-99c4-48b148484134/3270c5a4-d65d-4fac-96a1-50526cc08214/67f0a8ad-47bf-4982-af0b-066666ac8961/3c6f4e91-7ace-40cd-b258-5e382562f756.png",
	// 	  description: "<p><strong>Với mong muốn mang đến cho khách hàng ",
	// 	  endDate: "16-09-2023",
	// 	  id: "2f856bd1-74b9-4461-af9d-a865b575b6f6",
	// 	  lstProject: [{projectId: "2360ee8d-53f3-42c3-a01a-e1cd1d937844", projectName: null}],
	// 	  0: {projectId: "2360ee8d-53f3-42c3-a01a-e1cd1d937844", projectName: null},
	// 	  name: "Ưu đãi 20% giá thuê căn hộ dịch vụ khi tham gia chương trình “Một người thuê nhà – Hai người nhận quà”",
	// 	  startDate: "16-09-2022",
	// 	  status: 1,
	// 	  video: "",
	// 	  },
	// 	  {
	// 		avatar: "https://online-uat.tng-holdings.vn/static-data/DF5ACE60-3235-4F7A-8176-CC5EF0719F48/702ccf8c-e7e4-4dd6-99c4-48b148484134/3270c5a4-d65d-4fac-96a1-50526cc08214/67f0a8ad-47bf-4982-af0b-066666ac8961/3c6f4e91-7ace-40cd-b258-5e382562f756.png",
	// 	  description: "<p><strong>Với mong muốn mang đến cho khách hàng ",
	// 	  endDate: "16-09-2023",
	// 	  id: "2f856bd1-74b9-4461-af9d-a865b575b6f6",
	// 	  lstProject: [{projectId: "2360ee8d-53f3-42c3-a01a-e1cd1d937844", projectName: null}],
	// 	  0: {projectId: "2360ee8d-53f3-42c3-a01a-e1cd1d937844", projectName: null},
	// 	  name: "Ưu đãi 20% giá thuê căn hộ dịch vụ khi tham gia chương trình “Một người thuê nhà – Hai người nhận quà”",
	// 	  startDate: "16-09-2022",
	// 	  status: 1,
	// 	  video: "",
	// 	  },
	// 	  {
	// 		avatar: "https://online-uat.tng-holdings.vn/static-data/DF5ACE60-3235-4F7A-8176-CC5EF0719F48/702ccf8c-e7e4-4dd6-99c4-48b148484134/3270c5a4-d65d-4fac-96a1-50526cc08214/67f0a8ad-47bf-4982-af0b-066666ac8961/3c6f4e91-7ace-40cd-b258-5e382562f756.png",
	// 	  description: "<p><strong>Với mong muốn mang đến cho khách hàng ",
	// 	  endDate: "16-09-2023",
	// 	  id: "2f856bd1-74b9-4461-af9d-a865b575b6f6",
	// 	  lstProject: [{projectId: "2360ee8d-53f3-42c3-a01a-e1cd1d937844", projectName: null}],
	// 	  0: {projectId: "2360ee8d-53f3-42c3-a01a-e1cd1d937844", projectName: null},
	// 	  name: "Ưu đãi 20% giá thuê căn hộ dịch vụ khi tham gia chương trình “Một người thuê nhà – Hai người nhận quà”",
	// 	  startDate: "16-09-2022",
	// 	  status: 1,
	// 	  video: "",
	// 	  }
	// ]
	
  const Router = useRouter();
  const [Breadcrumbs, setBreadcrumbs] = useState([
    {
      id: 1,
      value: "Trang chủ",
      href: "/",
    },
  ]);

  return (
    <ContainerSales
      title={"Khuyến mãi"}
      checkBread={true}
      breaditem={Breadcrumbs}
    >
      <ContainerStyled>
        {data.map((item, index) => (
          <Tooltip title={item.name} placement="top" key={index}>
            <div
              onClick={() => Router.push(`/sales/${item.id}`)}
              style={{ cursor: "pointer" }}
              key={index}
            >
              <ImageWithHideOnErrorOffers
                key={index}
                className="logo"
                src={item.avatar ? item.avatar : Mask3}
                fallbackSrc={Mask3}
                width={350}
                height={224}
                priority
                layout="fixed"
                unoptimized={true}
              />
            </div>
          </Tooltip>
        ))}
      </ContainerStyled>
    </ContainerSales>
  );
};
export default SpecialOffersComponent;
