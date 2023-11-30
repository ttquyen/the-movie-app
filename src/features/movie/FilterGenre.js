import { Stack, Typography } from "@mui/material";
// import { FRadioGroup } from "../../components/form";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useLocation, useNavigate } from "react-router-dom";
const FilterGenre = ({ genres }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentQuery = new URLSearchParams(location.search);

  const [value, setValue] = React.useState(currentQuery.get("genreId") || "");
  const handleChange = (e) => {
    const params = new URLSearchParams(location.search);
    if (e.target.value === value) {
      setValue("");
      params.delete("genreId", e.target.value);
      navigate({ pathname: location.pathname, search: params.toString() });
    } else {
      setValue(e.target.value);
      params.set("genreId", e.target.value);
      navigate({ pathname: location.pathname, search: params.toString() });
    }
  };
  return (
    <Stack spacing={3} sx={{ p: 3, width: 250 }}>
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Genres
        </Typography>
        <RadioGroup
          // name="controlled-radio-buttons-group"
          value={value}
          // onChange={handleChange}
        >
          {genres?.map((o) => (
            <FormControlLabel
              key={o.id}
              value={o.id}
              control={<Radio onClick={handleChange} />}
              label={o.name}
            />
          ))}
        </RadioGroup>
      </Stack>
    </Stack>
  );
};

export default FilterGenre;
