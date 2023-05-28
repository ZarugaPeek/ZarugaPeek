import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const Switch = ({ className, children, ...props }: React.HTMLAttributes<HTMLButtonElement>) => (
  <Button
    variant="outline"
    size="sm"
    role="combobox"
    aria-label="Select a team"
    className={cn("w-48 justify-between", className)}
    {...props}
  >
    {children}
    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
  </Button>
)

export const Switcher = () => {
  return (
      <Popover>
        <PopoverTrigger asChild>
          <Switch>selected</Switch>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-0">
          opened
        </PopoverContent>
      </Popover>
  )
}
