import React, { useState } from "react";
import PropTypes from "prop-types";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDays, subDays } from "date-fns";

const DateRangeFilter = ({ onChange, open }: any) => {
  const [state, setState] = useState([
    {
      startDate: subDays(new Date(), 7),
      endDate: addDays(new Date(), 1),
      key: "selection"
    }
  ]);

  const handleOnChange = (ranges: any) => {
    const { selection } = ranges;
    onChange(selection);
    setState([selection]);
  };

  return (
    <DateRangePicker
      onChange={handleOnChange}
      moveRangeOnFirstSelection={false}
      months={1}
      ranges={state}
      direction="horizontal"
      showMonthArrow={false}
      inputRanges={[]}
      className={open ? "date-range-picker show" : "date-range-picker"}
    />
  );
};

DateRangeFilter.propTypes = {
  onChange: PropTypes.func,
  open: PropTypes.bool
};

export default DateRangeFilter;
