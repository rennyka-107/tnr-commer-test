import type { CheckboxProps } from '@mui/material/Checkbox';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import type { Control, FieldErrors } from 'react-hook-form';
import { Controller } from 'react-hook-form';

type Props = {
  errors?: FieldErrors;
  error?: boolean;
  control?: Control<any>;
  name?: string;
  label?: string;
  colorLabel?: string;
  labelCustom?: JSX.Element;
} & CheckboxProps;

const ControllerCheckbox = (props: Props) => {
  const { errors, error, control, name, label, colorLabel, labelCustom, ...rest } = props;

  return (
    <Controller
      render={({ field }) => (
        <FormControlLabel
          control={<Checkbox {...field} {...rest} />}
          label={labelCustom ? labelCustom : <Typography color={colorLabel} variant="body2">{label}</Typography>}
        />
      )}
      name={name}
      control={control}
    />
  );
};

export default ControllerCheckbox;
