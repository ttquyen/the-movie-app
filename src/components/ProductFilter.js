import { Stack, Typography } from "@mui/material";
import { FRadioGroup } from "./form";

export const FILTER_GENDER_OPTIONS = ["Men", "Women", "Kids"];

export const FILTER_CATEGORY_OPTIONS = [
  "All",
  "Shose",
  "Apparel",
  "Accessories",
];

export const FILTER_PRICE_OPTIONS = [
  { value: "below", label: "Below $25" },
  { value: "between", label: "Between $25 - $75" },
  { value: "above", label: "Above $75" },
];

function ProductFilter({ resetFilter, filterOptions }) {
  return (
    <Stack spacing={3} sx={{ p: 3, width: 250 }}>
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Genres
        </Typography>
        <FRadioGroup
          name="genre"
          options={filterOptions}
          getOptionLabel={filterOptions?.map((o) => o.name)}
        ></FRadioGroup>
        {/* <FSelect name="genre">
          <option key="all" value="All">
            All
          </option>
          {filterOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </FSelect> */}
      </Stack>
    </Stack>
  );
}

export default ProductFilter;
