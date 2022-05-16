import styled from "@emotion/styled";
import { TextFieldProps, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import ControllerTextField from "./ControllerTextField";
interface Props<T> extends Omit<TextFieldProps, 'name'> {
    control: Control<T>;
    name: FieldPath<T>;
    label?: string;
    labelColor?: string;
}

const PasswordTextField = <T extends FieldValues>(props: Props<T>) => {
    const { control, name, ...res } = props;
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    return (
        <ControllerTextField
            {...res}
            variant="outlined"
            hiddenLabel
            name={name}
            control={control}
            type={showPassword ? "text" : "password"}
            InputProps={{ // <-- This is where the toggle button is added.
                ...res.InputProps,
                endAdornment: showPassword ? (
                    <Typography onClick={handleClickShowPassword}
                        style={{
                            cursor: "pointer",
                            marginLeft: 10,
                        }}
                    >
                        <Image alt="" src="/icons/eye_Opening.png" width={16.5} height={11} />
                    </Typography>
                ) : (
                    <Typography onClick={handleClickShowPassword}
                        style={{
                            cursor: "pointer",
                            marginLeft: 10,
                        }}
                    >
                        <Image alt="" src="/icons/eye_closed.png" width={16.5} height={11} />
                    </Typography>
                )
            }}
        />
    )
}
export default PasswordTextField