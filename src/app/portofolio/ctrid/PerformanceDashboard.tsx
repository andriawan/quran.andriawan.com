import clsx from "clsx";
import type { CardProps } from "./Card";
import Card from "./Card";
import type { ChartProps } from "./Chart";
import Chart from "./Chart";

interface PerformanceDashboardProps {
  label: string;
  cardComposition: CardProps[];
  loadingCard?: boolean;
  loadingChart?: boolean;
  chartOptions: ChartProps;
}

export default function PerformanceDashboard({
  label = "Performance Dashboard",
  cardComposition = [],
  loadingCard = false,
  loadingChart = false,
  chartOptions,
}: PerformanceDashboardProps) {
  return (
    <div className="w-full gap-y-4">
      <div className="p-3 text-center">
        <p className="text-xl font-normal">{label}</p>
      </div>
      <div className={clsx("grid grid-cols-4 grid-rows-3 gap-4")}>
        <Card {...cardComposition[0]} isLoading={loadingCard} />
        <div className="col-span-3 row-span-2 bg-[#1E1F31] rounded">
          <div className="w-[100%] h-[240px]">
            <Chart className="" {...chartOptions} isLoading={loadingChart} />
          </div>
        </div>
        <Card {...cardComposition[1]} isLoading={loadingCard} />
        <Card {...cardComposition[2]} isLoading={loadingCard} />
        <Card {...cardComposition[3]} isLoading={loadingCard} />
        <Card {...cardComposition[4]} isLoading={loadingCard} />
        <Card {...cardComposition[5]} isLoading={loadingCard} />
      </div>
    </div>
  );
}
