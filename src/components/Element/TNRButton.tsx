import { Box } from "@mui/system";
import ClearIcon from "@mui/icons-material/Clear";

interface Props {
  active?: boolean;
  handleClick?: () => void;
  icon?: JSX.Element;
  label?: string;
  hasDelete?: boolean;
  onDelete?: () => void;
  sx?: object;
}

const TNRButton = ({
  active = false,
  handleClick,
  icon = null,
  label = "",
  hasDelete = false,
  onDelete,
  sx = {},
}: Props) => {
  const handleClickBtn = () => {
    if (handleClick) {
      handleClick();
    }
  };

  const handleClickDeleteBtn = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <Box
      sx={{
        width: "auto",
        background: active ? "#FEC83C" : "#F3F4F6",
        borderRadius: "8px",
        p: "12px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        cursor: "pointer",
        fontWeight: 500,
        gap: 1,
        ...sx,
      }}
      onClick={handleClickBtn}
    >
      {icon && icon}
      {label}

      {hasDelete && (
        <Box sx={{ width: 24, height: 24 }} onClick={handleClickDeleteBtn}>
          <ClearIcon />
        </Box>
      )}
    </Box>
  );
};

export default TNRButton;
