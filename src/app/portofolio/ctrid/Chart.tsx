import ReactECharts, { type EChartsReactProps } from "echarts-for-react";

interface ChartProps {
  option: EChartsReactProps["option"];
  className?: string;
  height?: string;
  isLoading?: boolean;
}

export default function Chart({
  option,
  height,
  isLoading = false,
  ...props
}: ChartProps) {
  return isLoading ? (
    <>
      <div className="flex justify-center items-end p-20 h-full gap-3">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={`insert-${
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              index
            }`}
            style={{ height: `${Math.random() * (110 - 40) + 40}%` }}
            className="w-10 opacity-15 bg-slate-500 rounded-md animate-pulse"
          />
        ))}
      </div>
    </>
  ) : (
    <ReactECharts option={option} {...props} style={{ height: height }} />
  );
}
