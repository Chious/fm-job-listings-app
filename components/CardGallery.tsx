import React, { useMemo } from "react";
import Button from "./ui/Button";
import clsx from "clsx";

export interface Job {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
}

interface CardGalleryProps {
  data: Job[];
  filterVals: string[];
  setFilterVals: React.Dispatch<React.SetStateAction<string[]>>;
}

interface CardProps {
  data: Job;
  filterVals: string[];
  setFilterVals: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CardGallery = ({
  data,
  filterVals,
  setFilterVals,
}: CardGalleryProps) => {
  // some of the data.languages and some of data.tools is included in data, that would be in filteredData
  const filteredData = useMemo(() => {
    return data.filter((job) => {
      const allVals = [...job.languages, ...job.tools];
      return filterVals.every((val) => allVals.includes(val));
    });
  }, [data, filterVals]);

  return (
    <section className="mt-4 flex flex-col gap-4">
      {filteredData &&
        filteredData.map((item: Job, index) => (
          <Card
            key={index}
            data={item}
            setFilterVals={setFilterVals}
            filterVals={filterVals}
          />
        ))}
    </section>
  );
};

export const Card = ({ data, filterVals, setFilterVals }: CardProps) => {
  const handleFilter = (val: string) => {
    if (filterVals.includes(val)) {
      setFilterVals(filterVals.filter((v) => v !== val));
    } else {
      setFilterVals([...filterVals, val]);
    }
  };

  return (
    <div className="relative bg-white p-8 w-full h-auto md:h-40 lg:h-40 shadow-md flex gap-3 flex-col md:flex-row lg:flex-row mt-12 md:mt-0 lg:mt-0">
      <div className=" absolute -top-12 md:static lg:static">
        <img
          src={data.logo}
          alt="placeholder"
          className=" rounded-full h-20 md:h-full lg:h-full object-contain"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between gap-3">
        <div className="flex items-center gap-4">
          <h3 className="text-desaturate-dark-cyan">{data.company}</h3>
          <button
            className={clsx(
              "bg-desaturate-dark-cyan text-white rounded-full px-2 py-1",
              data.new ? "visible" : "hidden"
            )}
          >
            NEW!
          </button>
          <button
            className={clsx(
              "bg-black text-white rounded-full px-2 py-1",
              data.featured ? "visible" : "hidden"
            )}
          >
            FEATURED
          </button>
        </div>
        <h2 className="text-black hover:text-desaturate-dark-cyan font-bold">
          {data.position}
        </h2>
        <p className="text-gray-500">
          {data.postedAt} ago ・ {data.contract} ・ {data.location}
        </p>
      </div>
      <div className="divider border border-gray-500/20 w-full border-solid h-0 block md:hidden lg:hidden" />
      <footer className="flex-1 h-full flex items-center md:justify-end lg:justify-end justify-start gap-3">
        {data &&
          data.languages.map((item, index) => (
            <Button
              key={index}
              onClick={() => {
                handleFilter(item);
              }}
            >
              {item}
            </Button>
          ))}
      </footer>
    </div>
  );
};
