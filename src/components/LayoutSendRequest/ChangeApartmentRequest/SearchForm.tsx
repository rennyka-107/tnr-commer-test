import styled from "@emotion/styled";
import useDebounce from "hooks/useDebounce";
import isEmpty from "lodash.isempty";
import { useEffect, useState } from "react";

interface Props {
  handleFilter: (value: string) => void;
  filterName: string;
}

export const SearchForm = ({ handleFilter, filterName }: Props) => {
  const [value, setValue] = useState<string>("");
  const debounceValue = useDebounce(value, 300);
console.log(filterName, "filtername")
  useEffect(() => {
    if(!isEmpty(filterName)) {
      setValue(filterName)
    } else {
      setValue("")
    }
  }, [filterName])

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
