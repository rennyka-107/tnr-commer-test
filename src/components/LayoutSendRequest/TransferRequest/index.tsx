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
import { Fragment, useEffect, useRef, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { rest } from "lodash";
import { useRouter } from "next/router";
import { apiTransferProductPayment } from "../../../../pages/api/paymentApi";
import useNotification from "hooks/useNotification";
import useOnClickOutside from "hooks/useOnClickOutside";
import LoadingComponent from "@components/LoadingComponent";
import { getOrderByUser } from "@service/Profile";
import ControllerDatePicker from "@components/Form/ControllerDatePicker";
import ControllerDatePickerThamQuan from "@components/Form/ControllerDatePickerThamQuan";
import ControllerDateTimeDatLich from "@components/Form/ControllerDateTimeDatLich";
import ControllerInputDatLich from "@components/Form/ControllerInputDatLich";
import ControllerReactDatePicker from "@components/Form/ControllerReactDatePicker";
import DateFns from "utils/DateFns";
import { format, parse } from "date-fns";

const validationSchema = yup.object().shape({
  fullname: yup.string().required(validateLine.required).default(""),
  email: yup
    .string()
    .nullable()
    .trim(validateLine.trim)
    .strict(true)
    .matches(Regexs.email, "Email không đúng")
    .default(""),
  phoneNumber: yup
    .string()
    .nullable()
    .trim(validateLine.trim)
    .strict(true)
    .max(10, "Số điện thoại quá dài")
    .matches(Regexs.phone, "Số điện thoại không đúng")
    .required(validateLine.required)
    .default(""),
  idNumber: yup.string().required(validateLine.required).nullable().default(""),
  issueDate: yup
    .string()
    .required(validateLine.required)
    .nullable()
    .default(""),
  issuePlace: yup
    .string()
    .required(validateLine.required)
    .nullable()
    .default(""),
});

interface Props {}

interface FormData {
  fullname: string;
  phoneNumber: string;
  email: string;
  idNumber: string;
  issueDate: string;
  issuePlace: string;
}

interface PersonItem extends FormData {
  onyFeId: string;
}

const TransferRequest = (props: Props) => {
  const [isAddingPerson, setIsAddingPerson] = useState<boolean>(false);
  const [listPersonAdded, setListPersonAdded] = useState<PersonItem[]>([]);
  const [activePerson, setActivePerson] = useState<PersonItem | null>(null);
  const {
    query: { txcode },
  } = useRouter();
  const addingBtnRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
  const notification = useNotification();

  const [contact, setContact] = useState<any>();

  const getContract = async () => {
    const data = new FormData();
    data.append("projectId", "");
    data.append("status", "");

    const response = await getOrderByUser(data);
    const contacts = response?.responseData ?? [];
    console.log("contacts", contacts);

    const contact = contacts.find((contact) => contact.bookingCode === txcode);
    setContact(contact);
  };

  useEffect(() => {
    getContract();
  }, []);
  const onSenRequest = (data: FormData) => {
    const newPerson = {
      onyFeId: nanoid(),
      ...data,
      issueDate: DateFns.changeFormatDate(data.issueDate),
    };

    setListPersonAdded([...listPersonAdded, newPerson]);
    setIsAddingPerson(false);
    setActivePerson(newPerson);
  };

  useEffect(() => {
    if (!activePerson) {
      //bugg
      reset({});
      reset({});
    } else {
      reset({
        ...activePerson,
      });
    }
  }, [activePerson, reset]);

  const handleClickBtn = () => {
    console.log("contactcontact", contact);

    if (!contact) return;

    const hasMainUserDate = listPersonAdded.map((person, index) => ({
      ...person,
      mainUser: index === 0 ? 1 : 0,
    }));

    const data = {
      paymentCustomerInfoRequestList: hasMainUserDate,
      transactionId: contact.transactionId,
      transactionCodeLandSoft: contact.transactionCodeLandSoft,
      productId: contact.productId,
      customerIdentity: contact.idNumber,
      customerName: contact.fullname,
    };
    setLoading(true);
    apiTransferProductPayment(data)
      .then((res) => {
        if (res.responseCode === "00") {
          notification({
            severity: "success",
            message: "Gửi yêu cầu chuyển nhượng thành công",
          });
        } else {
          notification({
            severity: "error",
            message: res.responseMessage,
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onAddPerson = (value: string) => {
    console.log("adddd", value);
  };

  const onDeletePerson = (id: string) => () => {
    const newList = listPersonAdded.filter((person) => person.onyFeId !== id);
    setActivePerson(null);
    setListPersonAdded([...newList]);
  };

  const handleClickAddPerson = () => {
    if (isAddingPerson) {
      handleSubmit(onSenRequest)();
    } else {
      setIsAddingPerson(true);
      reset({});
      setActivePerson(null);
    }
  };

  const handleViewAddedPerson = (person: PersonItem) => () => {
    setActivePerson(person);
  };

  const handleClickOutSide = () => {
    if (isAddingPerson) {
      handleSubmit(onSenRequest)();
    }
  };

  // useOnClickOutside(addingBtnRef, handleClickOutSide);

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
              ref={addingBtnRef}
              label={isAddingPerson ? "Xác nhận" : "Thêm"}
              icon={<AddIcon />}
              handleClick={handleClickAddPerson}
            />
            {listPersonAdded.map((person) => {
              const isActive =
                activePerson && activePerson.onyFeId === person.onyFeId;
              return (
                <TNRButton
                  key={person.onyFeId}
                  label={person.fullname}
                  handleClick={handleViewAddedPerson(person)}
                  active={isActive}
                  hasDelete={isActive}
                  onDelete={onDeletePerson(person.onyFeId)}
                  disabled={isAddingPerson}
                />
              );
            })}
            {isAddingPerson && <TNRButton label="Họ và tên..." active />}
            {/* {isAddingPerson && <AddPerson onAddPerson={onAddPerson} />} */}
          </Box>

          {isAddingPerson && (
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
                focused={isAddingPerson}
                disabled={Boolean(activePerson)}
              />
              <ControllerTextField
                variant="outlined"
                hiddenLabel
                name="email"
                control={control}
                fullWidth
                label="Email"
                required
                disabled={Boolean(activePerson)}
              />
              <ControllerTextField
                variant="outlined"
                hiddenLabel
                name="phoneNumber"
                control={control}
                fullWidth
                label="Số điện thoại"
                required
                disabled={Boolean(activePerson)}
              />
              <ControllerTextField
                variant="outlined"
                hiddenLabel
                name="idNumber"
                control={control}
                fullWidth
                label="Số căn cước công dân"
                required
                disabled={Boolean(activePerson)}
              />
              <ControllerDatePicker
                control={control}
                name="issueDate"
                label="Ngày cấp"
              />

              <ControllerTextField
                variant="outlined"
                hiddenLabel
                name="issuePlace"
                control={control}
                fullWidth
                label="Nơi cấp"
                required
                disabled={Boolean(activePerson)}
              />
              <Text14Styled>
                Tất cả người được chuyển nhượng sẽ nhận được thông báo qua Email
                và SMS khi yêu cầu thành công
              </Text14Styled>
            </Box>
          )}
        </PageBorder>

        <PageBorder>
          <SendRequest
            handleClickBtn={handleClickBtn}
            text="Gửi yêu cầu chuyển nhượng"
            loading={loading}
          />
        </PageBorder>
      </form>
    </Box>
  );
};

export default TransferRequest;
