import { Tab } from "@/components/ui/Tab/Tab";
import SortIcon from "@/assets/icons/sort-icon.svg";
import React, { useState } from "react";

export const Filters = () => {
  const [index, setIndex] = useState(0);
  return (
    <Tab
      isScroll
      value={index}
      onChange={e => setIndex(e)}
      tabsTitles={[
        <SortIcon key={"sort"} />,
        "Market",
        "Additional",
        "Type",
        "Stock",
        "Keywords",
        "Rating",
      ]}
    />
  );
};
