import { useWindowSize } from "@/shared/hooks/useWindowSize";
import ReactECharts, { type EChartsReactProps } from "echarts-for-react";
import { type RefObject, useEffect, useRef } from "react";

export interface ChartProps {
  option: EChartsReactProps["option"];
  className?: string;
  height?: string;
  onChartWidthChanged?: (width: number, instance: ReactECharts) => void;
  isLoading?: boolean;
}

export default function Chart({
  option,
  height,
  isLoading = false,
  onChartWidthChanged,
  ...props
}: ChartProps) {
  const echartsRef = useRef<InstanceType<typeof ReactECharts>>(null);
  const [width] = useWindowSize();
  useEffect(() => {
    if (!echartsRef.current) return;
    onChartWidthChanged?.(width, echartsRef.current);
  }, [width, onChartWidthChanged]);
  return isLoading ? (
    <>
      <div className="flex justify-center items-end lg:p-8 p-5 h-full gap-1 lg:gap-3 w-full">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={`insert-${
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              index
            }`}
            style={{ height: `${Math.random() * (110 - 40) + 30}%` }}
            className="lg:w-10 flex-1 opacity-15 bg-slate-500 rounded-sm lg:rounded-md animate-pulse"
          />
        ))}
      </div>
    </>
  ) : (
    <ReactECharts
      option={option}
      {...props}
      ref={echartsRef}
      style={{ height: height }}
    />
  );
}
