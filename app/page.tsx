"use client";

import CardFilter from "@/components/CardFilter";
import { CardGallery } from "@/components/CardGallery";
import data from "@/constants/data.json";
import { useState, useMemo } from "react";

export default function Home() {
  const [filterVals, setFilterVals] = useState(["CSS", "JavaScript", "React"]);

  // filter options are unique of data.languages and data.tools
  const filterOptions = useMemo(() => {
    const options = data.reduce((acc, job) => {
      job.languages.forEach((lang) => {
        if (!acc.includes(lang)) {
          acc.push(lang);
        }
      });
      job.tools.forEach((tool) => {
        if (!acc.includes(tool)) {
          acc.push(tool);
        }
      });
      return acc;
    }, [] as string[]);
    return options;
  }, []);

  return (
    <div className="w-full h-full p-20">
      <CardFilter
        vals={filterVals}
        setVals={setFilterVals}
        options={filterOptions}
      />
      <CardGallery
        data={data}
        filterVals={filterVals}
        setFilterVals={setFilterVals}
      />
    </div>
  );
}
