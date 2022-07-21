import styled from "@emotion/styled";
import { Stack, Typography, Box, CardMedia } from "@mui/material";
import { IconX } from "@components/Icons";

interface PopUpItemProps {
  onRemove: () => void;
  data: any;
}

export const ItemWrapper = styled("div")`
  width: 198px;
  // height: 174px;
  padding: 10px;
  border: 1px solid #e7e9ec;
  border-radius: 20px;
  position: relative;
`;

const Title = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #1b3459;
`;

const Description = styled(Typography)`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #8190a7;
`;

const PopUpItem = ({ data, onRemove }: PopUpItemProps) => {
  return (
    <ItemWrapper>
      <Stack
        direction="column"
        spacing={1}
        justifyContent="space-between"
        style={{ height: "100%" }}
      >
        <Stack direction="column" spacing={1}>
          <Title>{data.name}</Title>
          <Description>{data.projectName}</Description>
        </Stack>
        <Box>
          <CardMedia
            component={"img"}
            height={100}
            style={{ borderRadius: "15px 15px 15px 15px" }}
            image={data.thumbnail ?? "https://picsum.photos/308/200"}
            alt={"green image"}
          />
        </Box>
        <Box
          style={{
            position: "absolute",
            left: "165px",
            top: "0px",
            cursor: "pointer",
          }}
          onClick={onRemove}
        >
          <IconX style={{ stroke: "black", width: "12px", height: "12px" }} />
        </Box>
      </Stack>
    </ItemWrapper>
  );
};

export default PopUpItem;
