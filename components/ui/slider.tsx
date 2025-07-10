"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  onValueChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, value, onValueChange, min = 0, max = 100, step = 1, disabled = false, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.target.value)
      onValueChange(newValue)
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb:appearance-none slider-thumb:h-4 slider-thumb:w-4 slider-thumb:rounded-full slider-thumb:bg-blue-600 slider-thumb:cursor-pointer slider-thumb:border-0 slider-thumb:shadow-md slider-thumb:transition-all slider-thumb:duration-150 slider-thumb:hover:bg-blue-700 slider-thumb:hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(value - min) / (max - min) * 100}%, #e5e7eb ${(value - min) / (max - min) * 100}%, #e5e7eb 100%)`
          }}
        />
        <div className="absolute right-0 top-6 text-xs text-gray-500">
          {value}
        </div>
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider } 