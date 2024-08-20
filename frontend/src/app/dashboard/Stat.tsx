import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

type StatDetail = {
  title: string;
  value: string;
  changePercentage: number;
  Icon: LucideIcon;
};

type StatProps = {
  title: string;
  mainIcon: JSX.Element;
  details: StatDetail[];
  dateRange: string;
};

const Stat = ({ title, mainIcon, details, dateRange }: StatProps) => {
  return (
    <div className="md:row-span-1 xl:row-span-2 bg-white col-span-1 shadow-md rounded-xl flex flex-col justify-between">
      <div className="flex justify-between items-center mb-2 px-7 pt-5 w-full">
        <h2 className="text-lg font-semibold ">{title}</h2>
        <p className="text-sm">{dateRange}</p>
      </div>
      <hr />
      <div className="flex px-7 py-3 gap-4">
        <div className="w-1/6 flex justify-center items-center">
          <span className=" rounded-full bg-slate-200 p-6 border border-slate-300">
            {mainIcon}
          </span>
        </div>

        <div className="flex-col w-full">
          {details.map((d, i, self) => {
            return (
              <>
                <div
                  key={`${d.title}-${i}`}
                  className="flex py-3 justify-between"
                >
                  <p className="text-slate-500">{d.title}</p>
                  <p className="font-bold">{d.value}</p>
                  <p
                    className={`flex items-center gap-2 ${
                      Number(d.changePercentage) > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <span>
                      <d.Icon />
                    </span>
                    {d.changePercentage}%
                  </p>
                </div>
                {i < self.length - 1 && <hr />}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stat;
