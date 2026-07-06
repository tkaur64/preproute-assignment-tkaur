import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  InputAdornment,
  TextField,
} from "@mui/material";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({
  value,
  onChange,
}: SearchBarProps) => {
  return (
    <TextField
      fullWidth
      placeholder="Search by test name or subject..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon color="action" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchBar;