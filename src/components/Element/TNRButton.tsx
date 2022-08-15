import { Box } from "@mui/system";
import ClearIcon from "@mui/icons-material/Clear";
import { forwardRef, MouseEvent } from "react";

interface Props {
  active?: boolean;
  handleClick?: () => void;
  icon?: JSX.Element;
  label?: string;
  hasDelete?: boolean;
  onDelete?: () => void;
  disabled?: boolean;
  sx?: object;
}

const TNRButton = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    active = false,
    handleClick,
    icon = null,
    label = "",
    hasDelete = false,
    onDelete,
    sx = {},
    disabled = false,
  } = props;
  const handleClickBtn = () => {
    if (handleClick && !disabled) {
      handleClick();
    }
  };

  const handleClickDeleteBtn = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (onDelete && !disabled) {
      onDelete();
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        width: "auto",
        background: active ? "#FEC83C" : "#F3F4F6",
        borderRadius: "8px",
        p: "12px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        cursor: disabled ? "default" : "pointer",
        fontWeight: 500,
        gap: 1,
        ...(!disabled &&
          !active && {
            "&:hover": {
              backgroundColor: "#ffde8c",
            },
          }),
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
});

export default TNRButton;
