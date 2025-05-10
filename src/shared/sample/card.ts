import type { CardProps } from "@/app/portofolio/ctrid/Card";

function randomElementBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElementInArray<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export default function generateRandomCardData(number = 6): CardProps[] {
  const list = Array.from<number>({ length: number }).map<CardProps>(
    (_val, index) => {
      return {
        label: randomElementInArray([
          "Impressions",
          "Clicks",
          "Spend",
          "Reach",
          "Frequency",
          "CPM",
          "CTR",
          "CPC",
          "Conversions",
          "Conversion Rate",
          "Cost Per Conversion",
          "Video Plays",
          "Video Plays At 25",
          "Video Plays At 50",
          "Video Plays At 75",
          "Video Plays At 100",
          "Post Engagements",
          "Page Likes",
          "Link Clicks",
          "Landing Page Views",
        ]),
        amount: randomElementBetween(10, 1000000),
        amountMode: randomElementInArray(["normal", "short"]),
        amounType: randomElementInArray(["default", "percentage", "currency"]),
        currency: randomElementInArray(["USD", "EUR", "IDR"]),
        percentage: randomElementBetween(1, 100),
        percentageState: randomElementInArray([
          "negative",
          "positive",
          "neutral",
        ]),
        amountClass:
          index === 0 ? "text-[#00AFFF]" : index === 1 ? "text-[#FF9304]" : "",
      };
    },
  );
  return list;
}
