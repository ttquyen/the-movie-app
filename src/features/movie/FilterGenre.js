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

  const [value, setValue] = React.useState(
    currentQuery.get("genreId") || "all"
  );
  const handleChange = (e) => {
    setValue(e.target.value);
    // console.log(value);
    // if (e.target.value !== "all") {
    const params = new URLSearchParams(location.search);
    params.set("genreId", e.target.value);
    //   params.delete("title");
    navigate({ pathname: location.pathname, search: params.toString() });
    // }
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
          onChange={handleChange}
        >
          {genres?.map((o) => (
            <FormControlLabel
              key={o.id}
              value={o.id}
              control={<Radio />}
              label={o.name}
            />
          ))}
        </RadioGroup>
      </Stack>
    </Stack>
  );
};

export default FilterGenre;
