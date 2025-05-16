import { Field, Popover } from "@base-ui-components/react";
import clsx from "clsx";
import { useState } from "react";
import ChevronDown from "../portofolio/ctrid/ChevronDown";
import Check from "../portofolio/ctrid/Check";

export interface ItemListParams {
  id: string;
  text: string;
  subText?: string;
  value: string;
  metaData?: Record<string, string | number | string[] | number[] | boolean>;
}

interface SelectProps {
  data: ItemListParams[];
  selected: ItemListParams | ItemListParams[];
  onSelected: (value: ItemListParams) => void;
  withSearchInput?: boolean;
  multiple?: boolean;
  autoOpenOnFocus?: boolean;
  triggerClassName?: string;
  popoverTriggerClassName?: string;
  placeholder?: string;
}

export default function Select({
  data,
  selected,
  onSelected,
  withSearchInput,
  autoOpenOnFocus,
  triggerClassName,
  popoverTriggerClassName,
  placeholder,
}: SelectProps) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isAutoFocusActive, setIsAutoFocusActive] = useState(true);

  const filterData = data.filter((item) =>
    item.text.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );

  const handleArrowDownSearchInput = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "ArrowDown") {
      const nextElement = e.currentTarget.parentElement
        ?.nextElementSibling as HTMLElement;

      setTimeout(() => {
        nextElement?.focus();
      }, 100);
    }
  };

  const handleEnterKeyOnList = (
    e: React.KeyboardEvent<HTMLElement>,
    item: ItemListParams,
  ) => {
    e.preventDefault();
    onSelectedBehavior(item);
  };

  const handleEscapeKeyOnList = (e: React.KeyboardEvent<HTMLElement>) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const handleArrowDownKeyOnList = (e: React.KeyboardEvent<HTMLElement>) => {
    e.preventDefault();
    const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
    nextElement?.focus();
  };

  const handleArrowUpKeyOnList = (e: React.KeyboardEvent<HTMLElement>) => {
    e.preventDefault();
    const inputSearchElement = e.currentTarget.previousElementSibling
      ?.children[0] as HTMLInputElement;
    if (inputSearchElement?.type === "text") {
      inputSearchElement.focus();
      return;
    }
    const prevElement = e.currentTarget.previousElementSibling as HTMLElement;
    prevElement?.focus();
  };

  const handleKeyboardInteractionList = (
    e: React.KeyboardEvent<HTMLElement>,
    item: ItemListParams,
  ) => {
    const key = e.key;
    const mapHandler: Record<
      string,
      (event: React.KeyboardEvent<HTMLElement>, payload: ItemListParams) => void
    > = {
      Enter: handleEnterKeyOnList,
      Escape: handleEscapeKeyOnList,
      ArrowDown: handleArrowDownKeyOnList,
      ArrowUp: handleArrowUpKeyOnList,
    };
    return mapHandler[key]?.(e, item);
  };

  const onSelectedBehavior = (item: ItemListParams) => {
    onSelected(item);
    setIsOpen(false);
    setSearch("");
    setIsAutoFocusActive(false);
  };

  const onOpenChangeBehavior = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setTimeout(() => {
        const selectedElement = document.querySelector(
          ".active-selection",
        ) as HTMLElement;
        selectedElement?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        selectedElement?.focus({
          preventScroll: true,
        });
      }, 100);
    }
  };

  const renderText = (items: ItemListParams | ItemListParams[]) => {
    if (Array.isArray(items)) {
      return items.map((item) => item.text).join(", ") || placeholder || "";
    }
    return items.text || placeholder || "";
  };

  const checkSelectedId = (item: ItemListParams) => {
    if (Array.isArray(selected)) {
      return selected.some((selectedItem) => selectedItem.id === item.id);
    }
    return selected.id === item.id;
  };

  return (
    <Popover.Root
      delay={0}
      onOpenChange={(open) => {
        onOpenChangeBehavior(open);
      }}
      open={isOpen}
    >
      <Popover.Trigger
        className={clsx(popoverTriggerClassName)}
        onBlur={() => setIsAutoFocusActive(true)}
        onKeyUp={(e) => {
          if (e.key === "Tab" && autoOpenOnFocus && isAutoFocusActive) {
            setIsOpen(true);
          }
        }}
      >
        <div
          className={clsx(
            triggerClassName || "bg-[#1E1F31] data-[popup-open]:rounded-t w-0",
            "truncate flex items-center p-2 px-3 min-w-[200px] text-white text-start",
          )}
        >
          <p className="flex-1 truncate" title={renderText(selected)}>
            {renderText(selected)}
          </p>
          <ChevronDown
            className={clsx("w-4 h-4 cursor-pointer", isOpen && "rotate-180")}
          />
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner
          className={clsx("outline-none w-[var(--anchor-width)]")}
        >
          <Popover.Popup
            className={clsx(" bg-[#1E1F31] text-white rounded-b flex flex-col")}
          >
            <div className="max-h-[200px] overflow-y-auto flex flex-col">
              {withSearchInput && (
                <Field.Root className="flex w-full max-w-64 flex-col items-start gap-1 sticky top-0 bg-[#1E1F31]">
                  <Field.Control
                    required
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => handleArrowDownSearchInput(e)}
                    placeholder="Search"
                    className="h-10 bg-transparent w-full rounded-md pl-3.5 text-base text-white outline-none focus-within:outline-none"
                  />
                </Field.Root>
              )}
              {filterData.map((item) => {
                return (
                  <button
                    className={clsx(
                      "scroll-mt-[40px] px-3 group py-2 text-wrap cursor-pointer focus-within:outline-none",
                      checkSelectedId(item)
                        ? "bg-[#1f88b9] active-selection"
                        : "focus-within:bg-[#00AFFF] hover:bg-[#00AFFF]",
                    )}
                    tabIndex={0}
                    type="button"
                    onKeyDown={(e) => {
                      handleKeyboardInteractionList(e, item);
                    }}
                    onClick={() => {
                      onSelectedBehavior(item);
                    }}
                    key={item.value}
                  >
                    <div className="flex items-center">
                      <p className="text-start flex-1">{item.text}</p>
                      {checkSelectedId(item) && <Check className="size-4" />}
                    </div>
                    <p className="text-sm text-start text-gray-400 group-hover:text-neutral-50 group-focus-within:text-neutral-50">
                      {item.subText}
                    </p>
                  </button>
                );
              })}
              {filterData.length === 0 && (
                <div className="flex items-center justify-center py-2">
                  <p className="text-sm text-center">No results found</p>
                </div>
              )}
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
