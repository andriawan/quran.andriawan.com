import Select, { type ItemListParams } from "@/app/components/Select";
import type RuleCondition from "@/shared/entity/robot";
import { generateRandomString } from "@/shared/utility";
import clsx from "clsx";
import type { WritableAtom } from "jotai";
import { useAtom, type PrimitiveAtom } from "jotai";

interface MetricsInputProps {
  metrics: ItemListParams[];
  periods: ItemListParams[];
  statusCampaigns: ItemListParams[];
  comparations: ItemListParams[];
  days: ItemListParams[];
  clocks: ItemListParams[];
  index: number;
  level: number;
  condition: RuleCondition;
  atomRuleCondition: WritableAtom<
    RuleCondition | undefined,
    [update: RuleCondition],
    void
  >;
}

export default function MetricsInput({
  metrics,
  periods,
  clocks,
  comparations,
  days,
  statusCampaigns,
  atomRuleCondition,
  condition,
  level,
}: MetricsInputProps) {
  const [ruleCondition, setRuleCondition] = useAtom(atomRuleCondition);
  let selectPeriodComponent = null;
  let statusCampaignComponent = null;
  let selectDaysComponent = null;
  let selectOperatorComponent = null;
  let selectTimeComponent = null;
  let inputValueComponent = null;
  const selectMetricComponent = (
    <Select
      triggerClassName="bg-[#00AFFF] border border-[#00AFFF] rounded-tl lg:rounded-l text-white flex-1"
      customWidthClassName={clsx(
        level === 2 && "lg:w-[168px] group-[.is-mobile]:col-span-1",
        level === 1 && "lg:min-w-[200px]",
      )}
      withSearchInput
      autoOpenOnFocus
      data={metrics}
      onSelected={(item) => {
        if (!ruleCondition) return;
        setRuleCondition({
          ...ruleCondition,
          metricValue: item.value,
          value: "",
          metricText: item.text,
          ...(item.metaData?.operation !== undefined && {
            operation: "EQUAL",
            operationText: "=",
          }),
          ...(item.metaData?.hour !== undefined && {
            hour: item.metaData?.hour?.toString() ?? "",
          }),
          ...(item.metaData?.minute !== undefined && {
            minute: item.metaData?.minute?.toString() ?? "",
            weekdays: [],
          }),
          ...(item.metaData?.period !== undefined && {
            period: item.metaData?.period?.toString() ?? "",
          }),
        });
      }}
      placeholder="Select Metrics..."
      selected={{
        id: condition.id,
        value: condition.metricValue ?? "",
        text: condition.metricText ?? "",
      }}
    />
  );
  if (
    condition.period !== undefined &&
    !["ageCampaign", "campaignStatus"].includes(condition.metricValue ?? "")
  ) {
    selectPeriodComponent = (
      <Select
        triggerClassName="border border-[#00AFFF] text-white rounded-tr lg:rounded-none"
        popoverTriggerClassName="lg:w-[200px]"
        customWidthClassName="col-span-1 lg:min-w-[200px]"
        withSearchInput
        autoOpenOnFocus
        data={periods}
        onSelected={(item) => {
          if (!ruleCondition) return;
          setRuleCondition({
            ...ruleCondition,
            period: item.value,
            periodText: item.text,
          });
        }}
        placeholder="Select Period..."
        selected={{
          id: condition.period ?? "",
          value: condition.period ?? "",
          text: condition.periodText ?? "",
        }}
      />
    );
  }
  if (condition.metricValue === "campaignStatus") {
    statusCampaignComponent = (
      <Select
        triggerClassName="border border-[#183d5a] bg-[#183d5a] text-white rounded-r"
        popoverTriggerClassName="w-full"
        customWidthClassName="col-span-1"
        withSearchInput
        autoOpenOnFocus
        data={statusCampaigns}
        onSelected={(item) => {
          if (!ruleCondition) return;
          setRuleCondition({
            ...ruleCondition,
            value: item.value,
            statusCampaignText: item.text,
          });
        }}
        placeholder="Select Status Campaign..."
        selected={{
          id: condition.value ?? "",
          value: condition.value ?? "",
          text: condition.statusCampaignText ?? "",
        }}
      />
    );
  }
  if (condition.metricValue === "time") {
    selectDaysComponent = (
      <Select
        triggerClassName="border border-[#00AFFF] text-white lg:rounded-tr-none rounded-tr"
        popoverTriggerClassName="lg:w-[200px]"
        customWidthClassName="col-span-1"
        withSearchInput
        autoOpenOnFocus
        data={days}
        onSelected={(item) => {
          if (!ruleCondition) return;
          const isInArray = ruleCondition.weekdays?.find(
            (day) => day.value === item.value,
          );
          if (isInArray) {
            setRuleCondition({
              ...ruleCondition,
              weekdays: ruleCondition.weekdays?.filter(
                (day) => day.value !== item.value,
              ),
            });
          } else {
            setRuleCondition({
              ...ruleCondition,
              weekdays: [item, ...(ruleCondition.weekdays ?? [])],
            });
          }
        }}
        placeholder="Select Days.."
        multiple
        selected={condition.weekdays ?? []}
      />
    );
  }
  if (
    condition.operation !== undefined &&
    condition.metricValue !== "campaignStatus"
  ) {
    selectOperatorComponent = (
      <Select
        triggerClassName={clsx(
          "border border-[#00AFFF] bg-[#00AFFF] lg:rounded-none text-white",
          {
            "rounded-tr": condition.metricValue === "ageCampaign",
            "rounded-bl": condition.metricValue !== "ageCampaign",
          },
        )}
        customWidthClassName="col-span-1 lg:w-[70px]"
        disabledTriggerClassName="border border-slate-600 text-slate-600 rounded-bl lg:rounded-none"
        withSearchInput
        autoOpenOnFocus
        disabled={
          condition.weekdays?.length === 0 &&
          condition.metricValue === "time" &&
          (condition.weekdays?.length === 0 || !condition.period)
        }
        data={comparations}
        onSelected={(item) => {
          if (!ruleCondition) return;
          setRuleCondition({
            ...ruleCondition,
            operation: item.value,
            operationText: item.metaData?.shortText.toString() ?? item.text,
          });
        }}
        placeholder="Select Operator..."
        selected={{
          id: condition.operation ?? "",
          value: condition.operation ?? "",
          text: condition.operationText ?? "",
        }}
      />
    );
  }
  if (condition.metricValue === "time") {
    selectTimeComponent = (
      <Select
        triggerClassName="border border-[#00AFFF] text-white lg:rounded-r rounded-br"
        popoverTriggerClassName="w-full"
        customWidthClassName="col-span-1"
        disabledTriggerClassName="border border-slate-600 text-slate-600 lg:rounded-r rounded-br"
        withSearchInput
        autoOpenOnFocus
        disabled={condition.weekdays?.length === 0}
        data={clocks}
        onSelected={(item) => {
          const [hours, minutes] = item.value.split(":");
          if (!ruleCondition) return;
          setRuleCondition({
            ...ruleCondition,
            hour: Number.parseInt(hours) ?? 0,
            minute: Number.parseInt(minutes) ?? 0,
            timeText: item.text,
            timeValue: item.value,
          });
        }}
        placeholder="Select Time..."
        selected={{
          id: condition.timeValue ?? "",
          value: condition.timeValue ?? "",
          text: condition.timeText ?? "",
        }}
      />
    );
  }
  if (
    !["campaignStatus", "time"].includes(condition.metricValue ?? "") &&
    (condition.period !== undefined || condition.metricValue === "ageCampaign")
  ) {
    inputValueComponent = (
      <input
        placeholder="Enter Value"
        readOnly={!condition.period && condition.metricValue !== "ageCampaign"}
        onInput={(e) => {
          if (!ruleCondition) return;
          const element = e.target as HTMLInputElement;
          const angka = element.value.replace(/[^\d]+/gi, "");
          element.value = Intl.NumberFormat().format(Number(angka));
          setRuleCondition({
            ...ruleCondition,
            value: angka,
          });
        }}
        type="text"
        className={clsx(
          "h-full broder px-4 w-full bg-transparent text-right outline-none",
          {
            "col-span-2": condition.metricValue === "ageCampaign",
            "col-span-1": condition.metricValue !== "ageCampaign",
          },
          {
            "placeholder:text-slate-600 border border-slate-600 rounded-br":
              !condition.period && condition.metricValue !== "ageCampaign",
          },
          {
            "border-[#00AFFF] h-full border rounded-br lg:rounded-r lg:rounded-l-none":
              condition.period || condition.metricValue === "ageCampaign",
          },
        )}
      />
    );
  }
  return (
    <>
      <div className="hidden lg:flex w-full h-full leading-tight items-center border rounded-md border-gray-600">
        {selectMetricComponent}
        {selectPeriodComponent}
        {statusCampaignComponent}
        {selectDaysComponent}
        {selectOperatorComponent}
        {selectTimeComponent}
        {inputValueComponent}
      </div>
      <div
        className={clsx(
          "lg:hidden group is-mobile grid grid-cols-2 rounded gap-y-2 w-full",
          {
            "grid-rows-1": condition.metricValue === "",
            "grid-rows-2":
              condition.metricValue !== "" &&
              condition.metricValue !== "campaignStatus",
            "border border-[#00AFFF]": condition.metricValue === "",
          },
        )}
      >
        {selectMetricComponent}
        {selectPeriodComponent}
        {statusCampaignComponent}
        {selectDaysComponent}
        {selectOperatorComponent}
        {selectTimeComponent}
        {inputValueComponent}
      </div>
    </>
  );
}
