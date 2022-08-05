import styled from "@emotion/styled";
import { KeyboardEvent, useState } from "react";

interface Props {
  onAddPerson: (value: string) => void;
}

const AddPerson = ({ onAddPerson }: Props) => {
  const [value, setValue] = useState<string>("");

  const handleEnterDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value) {
      onAddPerson(value);
      setValue("");
    }
  };

  console.log("openopenopenopen", open);

  return (
    <StyledInput
      placeholder="Họ và tên..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleEnterDown}
      autoFocus
    />
  );
};

const StyledInput = styled.input({
  backgroundColor: "#FEC83C",
  border: "none",
  borderRadius: "8px",
  padding: "12px",
  fontSize: "16px",
  maxWidth: "106px",
  "&::placeholder": {
    color: "#0E1D34",
  },
});

export default AddPerson;
