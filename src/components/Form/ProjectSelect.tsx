import { Radio, RadioProps } from "@mui/material";
import { useEffect, useState } from "react";
import {
  apiGetListProjectByProjectType,
  apiGetPropductCategory,
} from "../../../pages/api/getDataSelectApi";
import ControllerSelect from "./ControllerSelect";
import { styled } from "@mui/material/styles";

interface PropsI {
  name: string;
  label: string;
  control: any;
  setValue: any;
  idProject: string;
  required?: boolean;
  isClear?: boolean;
  idChecked: any;
  style: any;
}

interface optionI {
  label: string;
  value: number;
}
const BpIcon = styled("span")(({ theme }) => ({
	borderRadius: "50%",
	width: 24,
	height: 24,
	border: "1px solid #0063F7",
	backgroundColor: theme.palette.mode === "dark" ? "#f5f8fa" : "#f5f8fa",
	".Mui-focusVisible &": {
	  outline: "2px auto rgba(19,124,189,.6)",
	  outlineOffset: 2,
	},
	"input:hover ~ &": {
	  backgroundColor: theme.palette.mode === "dark" ? "#f5f8fa" : "#ebf1f5",
	},
	"input:disabled ~ &": {
	  boxShadow: "none",
	  background:
		theme.palette.mode === "dark"
		  ? "rgba(57,75,89,.5)"
		  : "rgba(206,217,224,.5)",
	},
  }));
  
  const BpCheckedIcon = styled(BpIcon)({
	backgroundColor: "#0063F7",
	backgroundImage:
	  "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
	"&:before": {
	  display: "block",
	  width: 22,
	  height: 22,
	  backgroundImage: "radial-gradient(#FFFFFF,#FFFFFF 40%,transparent 50%)",
	  content: '""',
	},
	"input:hover ~ &": {
	  backgroundColor: "#0063F7",
	},
  });

const ProjectSelect = (props: PropsI) => {
  const {
    control,
    label,
    name,
    setValue,
    idProject,
    required,
    isClear,
    idChecked,
	style
  } = props;

  const [data, setData] = useState<optionI[]>([]);
  const getList = (id: string) => {
    try {
      apiGetListProjectByProjectType(id).then((response) => {
        if (response?.responseCode === "00") {
          const temp = response?.responseData?.map((el) => {
            const district: optionI = {
              label: el?.name,
              value: el?.id,
            };
            return district;
          });
          setData(temp);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!!idProject) {
      getList(idProject);
      return;
    }
    if (data?.length != 0) setData([]);
  }, [idProject]);

  const BpRadio = (props: RadioProps) => {
    return (
      <Radio
        sx={{
          "&:hover": {
            bgcolor: "transparent",
          },
        }}
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        {...props}
      />
    );
  };
  return (
    <ControllerSelect
      variant="outlined"
	  style={style}
      name={name}
      label={label}
      control={control}
      setValue={setValue}
      dataSelect={data}
      required={required}
      isClear={isClear}
      renderItemSelect={(item: any) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                gap: 2,
              }}
            >
              <div>
                <BpRadio checked={idChecked?.includes(item?.value)} />
              </div>
              <div>{item.label}</div>
            </div>
            {/* <div>{renderIcon(item)}</div> */}
          </div>
        );
      }}
    />
  );
};

export default ProjectSelect;
