import { cn } from "@/lib/utils";
import { FC } from "react";
import { DayPicker } from "react-day-picker";

type CalendarProps = React.ComponentProps<typeof DayPicker> & {};

const Calendar: FC<CalendarProps> = ({
  showOutsideDays = true,
  className,
  classNames,
  ...props
}) => {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 w-fit border rounded-md bg-white", className)}
      classNames={{
        months: "flex flex-col relative",
        nav: "absolute top-0 left-0 w-full flex justify-between",
        month: "flex flex-col gap-4 items-center",
        month_caption: "px-8 text-center text-sm font-medium",
        month_grid: "flex flex-col gap-1 w-full",
        weekdays: "flex",
        weekday: "font-medium text-sm select-none w-9",
        week: "flex w-full mt-2",
        day: "rounded-md h-9 w-9 p-0 font-normal cursor-pointer text-center text-sm p-0 hover:bg-zinc-100 transition-colors duration-200",
        outside: "text-zinc-400 aria-selected:text-white",
        selected: "bg-blue-500 text-white hover:bg-blue-500",
        chevron:
          "fill-blue-500 hover:bg-zinc-100 rounded-md h-5 w-5 transition-colors duration-200",
        day_button:
          "flex justify-center items-center w-full h-full select-none",
        ...classNames,
      }}
      {...props}
    />
  );
};

export default Calendar;
