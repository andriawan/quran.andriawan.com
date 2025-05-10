import clsx from "clsx";
import type { CardProps } from "./Card";
import Card from "./Card";
import type { ChartProps } from "./Chart";
import Chart from "./Chart";
import type EChartsReact from "echarts-for-react";

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
  function onChartWidthChanged(width: number, chart: EChartsReact) {
    const echartsInstance = chart.getEchartsInstance();
    echartsInstance.setOption({
      series: [
        {
          barWidth:
            width < 398
              ? 5
              : width < 477
                ? 8
                : width < 657
                  ? 10
                  : width < 1024
                    ? 12
                    : 14,
        },
      ],
      yAxis: [
        {
          axisLabel: {
            fontSize: width < 398 ? 8 : 10,
          },
        },
        {
          axisLabel: {
            fontSize: width < 398 ? 8 : 10,
          },
        },
      ],
      xAxis: [
        {
          axisLabel: {
            fontSize: width < 398 ? 8 : 10,
          },
        },
      ],
    });
    echartsInstance.resize();
  }
  return (
    <div className="w-full gap-y-4">
      <div className="p-3 text-center">
        <p className="text-xl font-normal">{label}</p>
      </div>
      <div
        className={clsx(
          "grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 gap-2 lg:gap-4",
        )}
      >
        <Card
          {...cardComposition[0]}
          isLoading={loadingCard}
          className="order-first lg:order-none"
        />
        <div className="lg:col-span-3 lg:row-span-2 col-span-2 -order-1 lg:order-none bg-[#1E1F31] rounded">
          <div className="w-[100%] h-[240px] px-3 md:px-0">
            <Chart
              {...chartOptions}
              isLoading={loadingChart}
              onChartWidthChanged={onChartWidthChanged}
            />
          </div>
        </div>
        <Card
          {...cardComposition[1]}
          isLoading={loadingCard}
          className="order-first lg:order-none"
        />
        <Card {...cardComposition[2]} isLoading={loadingCard} />
        <Card {...cardComposition[3]} isLoading={loadingCard} />
        <Card {...cardComposition[4]} isLoading={loadingCard} />
        <Card {...cardComposition[5]} isLoading={loadingCard} />
      </div>
    </div>
  );
}
