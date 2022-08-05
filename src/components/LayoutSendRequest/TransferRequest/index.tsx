import PageBorder from "@components/Element/PageBorder";
import Subtitle from "@components/Element/Subtitle";
import TNRButton from "@components/Element/TNRButton";
import {
  ButtonAction,
  ButtonStyled,
  RowStyled,
  Text14Styled,
  Text18Styled,
} from "@components/StyledLayout/styled";
import { Box, Checkbox } from "@mui/material";
import Link from "next/link";
import SendRequest, { SubmitType } from "../SendRequest";
import AddIcon from "@mui/icons-material/Add";
import ControllerTextField from "@components/Form/ControllerTextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { validateLine } from "utils/constants";
import Regexs from "utils/Regexs";
import styled from "@emotion/styled";
import AddPerson from "./AddPerson";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

const validationSchema = yup.object().shape({
  fullname: yup.string().required(validateLine.required).default(""),
  email: yup
    .string()
    .nullable()
    .trim(validateLine.trim)
    .strict(true)
    .matches(Regexs.email, "Email không đúng")
    .default(""),
  phone: yup
    .string()
    .nullable()
    .trim(validateLine.trim)
    .strict(true)
    .max(10, "Số điện thoại quá dài")
    .matches(Regexs.phone, "Số điện thoại không đúng")
    .required(validateLine.required)
    .default(""),
  idNumber: yup.string().required(validateLine.required).nullable().default(""),
  dateOfIssuance: yup
    .string()
    .required(validateLine.required)
    .nullable()
    .default(""),
  locationOfIssuance: yup
    .string()
    .required(validateLine.required)
    .nullable()
    .default(""),
});

interface Props {}

interface FormData {
  fullname: string;
  phone: string;
  email: string;
  idNumber: string;
  dateOfIssuance: string;
  locationOfIssuance: string;
}

interface PersonItem {
  name: string;
  id: string;
}

const TransferRequest = (props: Props) => {
  const [isAddingPerson, setIsAddingPerson] = useState<boolean>(false);
  const [listPersonAdded, setListPersonAdded] = useState<PersonItem[]>([]);
  const [activePerson, setActivePerson] = useState<PersonItem | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const onSenRequest = (data: FormData) => {
    console.log("dataaa", data);
  };

  const handleClickBtn = (type: SubmitType) => {
    if (type === "request") {
      handleSubmit(onSenRequest)();
    }
  };

  const onAddPerson = (value: string) => {
    console.log("adddd", value);
    setListPersonAdded([
      ...listPersonAdded,
      {
        id: nanoid(),
        name: value,
      },
    ]);
    setIsAddingPerson(false);
  };

  const onDeletePerson = (id: string) => {
    const newList = listPersonAdded.filter((person) => person.id !== id);
    setListPersonAdded([...newList]);
  };

  return (
    <Box>
      <form style={{ width: "100%" }}>
        <PageBorder
          sx={{
            marginBottom: "30px",
          }}
        >
          <Subtitle>Thông tin người được chuyển nhượng</Subtitle>
          <Box
            sx={{
              pt: 3,
              display: "flex",
              columnGap: 2,
              rowGap: 2,
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <TNRButton
              label="Thêm"
              icon={<AddIcon />}
              handleClick={() => setIsAddingPerson(true)}
            />
            {listPersonAdded.map((person) => {
              const isActive = activePerson && activePerson.id === person.id;
              return (
                <TNRButton
                  key={person.id}
                  label={person.name}
                  handleClick={() => setActivePerson(person)}
                  active={isActive}
                  hasDelete={isActive}
                  onDelete={() => onDeletePerson(person.id)}
                />
              );
            })}
            {isAddingPerson && <AddPerson onAddPerson={onAddPerson} />}
          </Box>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: "column",
              rowGap: 2,
            }}
          >
            <ControllerTextField
              variant="outlined"
              hiddenLabel
              name="fullname"
              control={control}
              fullWidth
              label="Họ và tên"
              required
            />
            <ControllerTextField
              variant="outlined"
              hiddenLabel
              name="email"
              control={control}
              fullWidth
              label="Email"
              required
            />
            <ControllerTextField
              variant="outlined"
              hiddenLabel
              name="phone"
              control={control}
              fullWidth
              label="Số điện thoại"
              required
            />
            <ControllerTextField
              variant="outlined"
              hiddenLabel
              name="idNumber"
              control={control}
              fullWidth
              label="Số căn cước công dân"
              required
            />
            <ControllerTextField
              variant="outlined"
              hiddenLabel
              name="dateOfIssuance"
              control={control}
              fullWidth
              label="Ngày cấp"
              required
            />
            <ControllerTextField
              variant="outlined"
              hiddenLabel
              name="locationOfIssuance"
              control={control}
              fullWidth
              label="Nơi cấp"
              required
            />
            <Text14Styled>
              Tất cả người được chuyển nhượng sẽ nhận được thông báo qua Email
              và SMS khi yêu cầu thành công
            </Text14Styled>
          </Box>
        </PageBorder>

        <PageBorder>
          <SendRequest handleClickBtn={handleClickBtn} />
        </PageBorder>
      </form>
    </Box>
  );
};

export default TransferRequest;
