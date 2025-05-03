import { formatShortNumber } from "../utility";

export const generateArrayOfRandomNumber = (
  length: number,
  accumulator = 1000,
) => {
  return Array.from({ length }, () => Math.floor(Math.random() * accumulator));
};

export const generateDateLabel = (days = 62, short = false) => {
  const startDate = new Date();
  const labelDate = Array.from({ length: days }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() - i);
    let dateFinal = date.toISOString().split("T")[0];
    dateFinal = short ? dateFinal.split("-")[2] : dateFinal;
    return dateFinal;
  });
  return labelDate;
};

export const chartOption = {
  left: "center",
  top: "-40px",
  grid: [{ x: "10%", y: "17%", height: "66%" }],
  tooltip: {
    show: true,
    trigger: "axis",
    confine: false,
  },
  dataZoom: [
    {
      type: "inside",
      endValue: 31,
      startValue: 0,
      zoomLock: true,
      preventDefaultMouseMove: false,
      show: true,
    },
  ],
  xAxis: [
    {
      type: "category",
      axisTick: {
        alignWithLabel: false,
      },
      data: [""],
      axisLabel: {
        color: "#ACACAC",
        fontSize: 10,
        formatter: (value: string) => `${value.split('-')[2]}`,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#2B2D3A",
          type: "dotted",
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#718096",
        },
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "",
      splitNumber: 3,
      splitLine: {
        show: false,
      },
      position: "left",
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#17BAFA",
          type: "dotted",
        },
      },
      axisLabel: {
        fontSize: 10,
        formatter: (value: number) => formatShortNumber(value, 0),
      },
    },
    {
      type: "value",
      name: "",
      position: "right",
      splitLine: {
        show: true,
        lineStyle: {
          color: "#2B2D3A",
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#FF9304",
          type: "dotted",
        },
      },
      splitNumber: 3,
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 10,
        formatter: (value: number) => formatShortNumber(value, 0),
      },
    },
  ],
  visualMap: [
    {
      type: "piecewise",
      show: false,
      dimension: 0,
      seriesIndex: 1,
      pieces: [
        {
          gte: 3,
          lte: 7,
          color: "#ff9304",
        },
      ],
      outOfRange: {
        color: "#583200",
        symbolSize: 0,
      },
    },
    {
      type: "piecewise",
      show: false,
      dimension: 0,
      seriesIndex: 0,
      pieces: [
        {
          gte: 3,
          lte: 7,
          color: "#00AFFF",
        },
      ],
      outOfRange: {
        color: "#0D3554",
        symbolSize: 0,
      },
    },
  ],
  series: [
    {
      name: "Spend",
      type: "bar",
      yAxisIndex: 0,
      data: generateArrayOfRandomNumber(62),
      itemStyle: {
        color: "#00AFFF",
      },
      barWidth: 25,
    },
    {
      name: "ATC",
      smooth: false,
      type: "line",
      yAxisIndex: 1,
      symbolSize: 8,
      lineStyle: {
        width: 3,
      },
      itemStyle: {
        color: "#ff9304",
      },
      data: generateArrayOfRandomNumber(62),
    },
  ],
};

export const generateChartOption = () => {
  const dataLine = generateArrayOfRandomNumber(62, 100);
  const dataBar = generateArrayOfRandomNumber(62, 1000_000);
  chartOption.series[0].data = dataBar;
  chartOption.series[1].data = dataLine;
  chartOption.xAxis[0].data = generateDateLabel(62);
  return chartOption;
};
