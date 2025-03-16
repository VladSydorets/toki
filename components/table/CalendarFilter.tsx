import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { format, endOfDay } from "date-fns";
import { Column } from "@tanstack/react-table";

interface CalendarFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
}
export default function CalendarFilter<TData, TValue>({
  column,
}: CalendarFilterProps<TData, TValue>) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  useEffect(() => {
    const filterValue = column?.getFilterValue() as DateRange | undefined;
    if (!filterValue?.from && !filterValue?.to) {
      setDateRange(undefined);
    }
  }, [column?.getFilterValue()]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);

    if (range?.from && range?.to) {
      const adjustedRange: DateRange = {
        from: range.from,
        to: endOfDay(range.to),
      };
      column?.setFilterValue(adjustedRange);
    } else {
      column?.setFilterValue(undefined);
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start items-center text-left font-normal"
        >
          <CalendarIcon className="size-4 mb-[2px]" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "LLL dd, y")} -{" "}
                {format(dateRange.to, "LLL dd, y")}
              </>
            ) : (
              format(dateRange.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          autoFocus
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={handleDateRangeChange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
