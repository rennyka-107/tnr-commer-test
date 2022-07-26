import { Checkbox, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import type { FormControlLabelProps } from "@mui/material/FormControlLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Radio from "@mui/material/Radio";
import type { RadioGroupProps } from "@mui/material/RadioGroup";
import RadioGroup from "@mui/material/RadioGroup";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

export interface Option {
  value: number;
  label: string;
}

interface Props<T> extends Omit<FormControlLabelProps, "control" | "label"> {
  control: Control<T>;
  name: FieldPath<T>;
  options: Option[];
  colorLabel?: any;
  label?: any;
  onChangeSelect?: (value: number | null) => void;
  labelCustom?: JSX.Element;
}

const ControllerCheckboxF = <T extends FieldValues>(props: Props<T>) => {
  const {
    control,
    name,
    options,
    onChangeSelect,
    labelCustom,
    colorLabel,
    label,
    ...rest
  } = props;

  return (
    <Controller
      render={({ field, fieldState: { error } }) => (
        <FormControl error={Boolean(error)}>
          <FormControlLabel
            {...rest}
            control={<Checkbox {...field}  />}
            label={
              labelCustom ? (
                labelCustom
              ) : (
                <Typography color={colorLabel} variant="body2">
                  {label}
                </Typography>
              )
            }
          />
          <FormHelperText variant="standard">{error?.message}</FormHelperText>
        </FormControl>
      )}
      name={name}
      control={control}
    />
  );
};

export default ControllerCheckboxF;
