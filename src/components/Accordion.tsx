import { cn } from "@/lib/utils";
import React, { HTMLAttributes, useMemo, useRef, useState } from "react";

// Usage
{
  /* <Accordion>
    <AccordionItem value="form-1">
        <AccordionTrigger>Edit</AccordionTrigger>
        <AccordionContent>
            Form step 1
        </AccordionContent>
    </AccordionItem>
    <AccordionItem value="form-2">
        <AccordionTrigger>Edit</AccordionTrigger>
        <AccordionContent>
            Form step 2
        </AccordionContent>
    </AccordionItem>
</Accordion>; */
}

type AccordionContextProps = {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

const AccordionContext = React.createContext<AccordionContextProps | null>(
  null
);

const useAccordion = () => {
  const context = React.useContext(AccordionContext);

  if (!context) {
    throw Error(
      "Must use AccordionContext with in a AccordionContext provider."
    );
  }

  return context;
};

/**
 * Accordion
 */

type AccordionProps = {
  children: React.ReactNode;
};

export const Accordion: React.FC<AccordionProps> = ({ children }) => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <AccordionContext.Provider value={{ selected, setSelected }}>
      {children}
    </AccordionContext.Provider>
  );
};

/**
 * AccordionItem
 */

type AccordionItemProps = {
  children: React.ReactNode;
  value: string;
};

export const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  children,
}) => {
  return <div aria-label={value}>{children}</div>;
};

/**
 * AccordionTrigger
 */

type AccordionTriggerProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  children,
  className,
  ...props
}) => {
  const { setSelected, selected } = useAccordion();
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = () => {
    if (!ref.current) return;

    const value = ref.current.parentElement?.getAttribute("aria-label");

    if (value) {
      if (selected.includes(value)) {
        setSelected((prev) => prev.filter((v) => v !== value));
      } else {
        setSelected((prev) => [...prev, value]);
      }
    }
  };

  return (
    <div
      className={cn("cursor-pointer select-none", className)}
      onClick={handleSelect}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * AccordionContent
 */

type AccordionContentProps = {
  children: React.ReactNode;
  className?: string;
};

export const AccordionContent: React.FC<AccordionContentProps> = ({
  children,
  className,
}) => {
  const { selected } = useAccordion();
  const ref = useRef<HTMLDivElement>(null);
  const isExpanded = useMemo(() => {
    if (!ref.current) return false;
    const value = ref.current.parentElement?.getAttribute("aria-label") ?? "";
    if (selected.includes(value)) return true;
    return false;
  }, [ref.current, selected]);

  return (
    <div
      className={cn(
        "overflow-hidden grid grid-rows-[0fr] opacity-0 transition-all duration-300",
        { "grid-rows-[1fr] opacity-100": isExpanded },
        className
      )}
      ref={ref}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
};
