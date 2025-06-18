"use client"

import * as React from "react"
import { addDays, format } from "date-fns"

import { cn } from "../lib/utils"
import { Calendar } from "./ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"
export default function DatePickerWithRange({ className, dateRange, setDateRange }) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <button
            id="date"
            className={cn(
              "flex items-center px-3 py-2 min-w-[15.5rem] bg-white border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800 font-medium text-sm text-left justify-start rounded-lg shadow-sm",
              !dateRange && "text-gray-400"
            )}
          >
            <svg
              className="fill-current text-gray-400 ml-1 mr-2"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M5 4a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5Z"></path>
              <path d="M4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z"></path>
            </svg>

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
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
