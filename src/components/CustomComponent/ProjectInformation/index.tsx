import styled from "@emotion/styled";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Divider,
} from "@mui/material";

type Props = {
  location: string;
  constructArea: number;
  density: number;
  scale: string;
  funcDivision: string;
  description: string;
  projectType: string;
  landArea: string;
  ownership: string;
};

const ContainerPJ = styled.div`
  height: auto;
  width: 100%;
  padding: 31px 31px 0 31px;
  border: 1px solid #c7c9d9;
  border-radius: 20px;
  margin-top: 1rem;
`;

const bold = { fontWeight: "500" };

const ProjectInformation = ({
  location,
  constructArea,
  density,
  scale,
  funcDivision,
  description,
  projectType,
  landArea,
  ownership
}: Props) => {
  function renderList() {
    return [
      { key: "Vị trí", value: location ?? "" },
      { key: "Diện tích đất xây dựng", value: constructArea ?? "" },
      { key: "Mật độ xây dựng", value: density ?? "" },
      { key: "Loại hình phát triển", value: projectType ?? "" },
      { key: "Quy mô", value: scale ?? "" },
      { key: "Diện tích sản phẩm", value: landArea ?? "" },
      {
        key: "Phân khu chức năng",
        value: funcDivision ?? "",
      },
      { key: "Hình thức sở hữu", value: ownership ?? "" },
    ].map(({ key, value }, idx) => (
      <ListItem sx={{ pl: 0 }} key={idx}>
        <ListItemIcon sx={{ minWidth: "30px" }}>
          <IconList />
        </ListItemIcon>
        <Typography sx={bold}>{key}</Typography> {": " + value}
      </ListItem>
    ));
  }
  return (
    <ContainerPJ>
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{ fontWeight: "500", fontSize: "18px" }}
          color="#FEC83C"
        >
          Tổng quan dự án
        </Typography>
        <List sx={{ pl: 0 }}>{renderList()}</List>
      </Box>
      <Divider />
      <Box sx={{ mt: 3, mb: 3 }}>
        <Typography
          sx={{ fontWeight: "500", fontSize: "18px", mb: 3 }}
          color="#FEC83C"
        >
          Mô tả dự án
        </Typography>
        <Typography>{description ?? ""}</Typography>
      </Box>
    </ContainerPJ>
  );
};

export default ProjectInformation;

const IconList = () => {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="4" r="4" fill="#FEC83C" />
    </svg>
  );
};
