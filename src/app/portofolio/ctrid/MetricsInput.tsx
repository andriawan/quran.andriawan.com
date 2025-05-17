import Select, { type ItemListParams } from "@/app/components/Select";
import type RuleCondition from "@/shared/entity/robot";
import { generateRandomString } from "@/shared/utility";
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
      triggerClassName="bg-[#00AFFF] border border-[#00AFFF] rounded-l text-white flex-1"
      withSearchInput
      autoOpenOnFocus
      data={metrics}
      onSelected={(item) => {
        const newMetric: RuleCondition = {
          id: generateRandomString(10),
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
        };
        setRuleCondition(newMetric);
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
        triggerClassName="border border-[#00AFFF] text-white"
        popoverTriggerClassName="w-[200px]"
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
        triggerClassName="border border-[#00AFFF] text-white rounded-r"
        popoverTriggerClassName="w-[200px]"
        withSearchInput
        autoOpenOnFocus
        data={days}
        onSelected={(item) => {
          if (!ruleCondition) return;
          setRuleCondition({
            ...ruleCondition,
            weekdays: [item, ...(ruleCondition.weekdays ?? [])],
          });
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
        triggerClassName="border border-[#00AFFF] bg-[#00AFFF] text-white"
        popoverTriggerClassName="w-full"
        customWidthClassName="w-[70px]"
        withSearchInput
        autoOpenOnFocus
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
        multiple
        selected={{
          id: condition.operation ?? "",
          value: condition.operation ?? "",
          text: condition.operationText ?? "",
        }}
      />
    );
  }
  if (condition.hour !== 0 && condition.metricValue === "time") {
    selectTimeComponent = (
      <Select
        triggerClassName="border border-[#00AFFF] bg-[#00AFFF] text-white rounded-r"
        popoverTriggerClassName="w-full"
        withSearchInput
        autoOpenOnFocus
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
        multiple
        selected={{
          id: condition.timeValue ?? "",
          value: condition.timeValue ?? "",
          text: condition.timeText ?? "",
        }}
      />
    );
  }
  if (
    condition.value !== undefined &&
    condition.metricValue !== "campaignStatus"
  ) {
    inputValueComponent = (
      <input
        placeholder="Enter Value"
        type="text"
        className="px-4 w-full bg-transparent text-right outline-none"
      />
    );
  }
  return (
    <div className="hidden lg:flex h-[42px] md:h-[36px] w-full leading-tight items-center bg-logo-color rounded-l">
      {selectMetricComponent}
      {selectPeriodComponent}
      {statusCampaignComponent}
      {selectDaysComponent}
      {selectOperatorComponent}
      {selectTimeComponent}
      {inputValueComponent}
    </div>
  );
}
