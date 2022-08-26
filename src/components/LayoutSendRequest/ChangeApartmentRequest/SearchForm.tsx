import styled from "@emotion/styled";
import useDebounce from "hooks/useDebounce";
import { useEffect, useState } from "react";

interface Props {
  handleFilter: (value: string) => void;
}

export const SearchForm = ({ handleFilter }: Props) => {
  const [value, setValue] = useState<string>("");
  const debounceValue = useDebounce(value, 300);

  useEffect(() => {
    handleFilter(debounceValue);
  }, [debounceValue]);

  return (
    <StyledInput
      placeholder="Tìm kiếm"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchForm;

const StyledInput = styled.input({
  padding: "12px",
  borderRadius: "8px",
  flex: 1,
  minWidth: "300px",
});
