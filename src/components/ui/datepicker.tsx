// import React from 'react'
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Label } from "./label";
import { DatePicker, DatesRangeValue } from '@mantine/dates';
import { Button } from "./button";
import { cn } from "@/lib/utils";

type DatePickerProps = {
    label: string;
    // value: Date | null;
    // setValue: (date: Date | null) => void;
    type?: 'default' | 'range' | 'multiple';
    // minDate?: Date;
    // maxDate?: Date;
    value: DatesRangeValue;
  onChange: (value: DatesRangeValue) => void;
    popoverTriggerElement?: React.ReactNode;
}

const DatePickerComponent = ({ label, type = "range", popoverTriggerElement, value, onChange }: DatePickerProps) => {
    const [open, setOpen] = useState(false);
  
    return (
     <Popover open={open} onOpenChange={setOpen}>
      <div className=" grid ">
        {/* <label className="text-sm font-semibold text-gray-800">{label}</label> */}
       {label &&  <div className="mb-1">

        <Label >{label}</Label> 
        </div>}
        <PopoverTrigger asChild>
            {popoverTriggerElement || 
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              " flex justify-between text-black w-full items-center border-gray-200 bg-input-field rounded-md px-3 py-2.5 text-sm font-normal shadow-none dark:bg-grey-500 dark:text-white whitespace-nowrap"
            )}
          >
            {/* {value ? moment(value).format("L") : "Select a date"} */}
            {/* {value ?  formatDateToYYYYMMDD(value) : 'Select a date'} */}
            Select a date
          </Button> }
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            // ` max-h-[--radix-popover-content-available-height] overflow-y-scroll p-0 min-w-[var(--radix-popover-trigger-width)]  z-[100]  pl-3`
            ` max-h-[--radix-popover-content-available-height] overflow-y-scroll p-0 min-w-[320px]  z-[100]  pl-3`
          )}
          align="start"
        >
          <DatePicker
        //   className="!bg-tertiary"
          allowSingleDateInRange
          type={'range'}
            value={value}
            onChange={onChange}
          />
        </PopoverContent>
        {/* {errors && (
                    <span className="text-red-500 text-xs font-medium">{errors}</span>
                )} */}
      </div>
    </Popover>
  )
}

export default DatePickerComponent