export interface IconActionRulesProps {
  action: string;
}

export enum ActionOption {
  SET_DAILY_BUDGET = "set_daily_budget",
  START_SET_DAILY_BUDGET = '["start","set_daily_budget"]',
  START = "start",
  RESTART = "restart",
  PAUSE = "pause",
}

const IconActionRules = ({ action }: IconActionRulesProps) => {
  if (!action) return null;

  return (
    <div>
      {action === ActionOption.PAUSE && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>pause</title>
          <path
            d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM9 14H7V6H9V14ZM13 14H11V6H13V14Z"
            fill="white"
          />
        </svg>
      )}

      {action === ActionOption.RESTART && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>restart</title>
          <path
            d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM14.82 15.076C16.0944 13.8634 16.8655 12.2154 16.9799 10.46C17.0943 8.70464 16.5436 6.97053 15.4373 5.60279C14.3311 4.23505 12.7504 3.33397 11.0099 3.07885C9.26939 2.82373 7.49663 3.23328 6.04439 4.22601C4.59216 5.21873 3.56693 6.72184 3.17274 8.43622C2.77854 10.1506 3.04427 11.9506 3.91706 13.4779C4.78984 15.0052 6.20568 16.1479 7.88283 16.6787C9.55997 17.2094 11.3755 17.0892 12.968 16.342L11.993 14.587C11.0059 15.016 9.90669 15.1151 8.85878 14.8694C7.81088 14.6237 6.87022 14.0465 6.17663 13.2235C5.48303 12.4004 5.07353 11.3756 5.009 10.3012C4.94446 9.22681 5.22833 8.16028 5.81842 7.26014C6.4085 6.36001 7.27329 5.67431 8.28425 5.30497C9.29521 4.93564 10.3984 4.90238 11.4297 5.21015C12.4611 5.51792 13.3656 6.15028 14.0089 7.01324C14.6521 7.8762 14.9997 8.92369 15 10H12L14.82 15.076Z"
            fill="#F7F7F8"
          />
        </svg>
      )}

      {[
        ActionOption.START.toString(),
        ActionOption.SET_DAILY_BUDGET.toString(),
        ActionOption.START_SET_DAILY_BUDGET.toString(),
      ].includes(action) && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>set bufget</title>
          <path
            d="M10 0C4.475 0 0 4.475 0 10C0 15.525 4.475 20 10 20C15.525 20 20 15.525 20 10C20 4.475 15.525 0 10 0ZM8 14.5V5.5L14 10L8 14.5Z"
            fill="#F7F7F8"
          />
        </svg>
      )}
    </div>
  );
};

export default IconActionRules;
