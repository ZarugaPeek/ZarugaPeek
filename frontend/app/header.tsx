import Image from "next/image"
import Link from "next/link"
import { Avatar } from "@components/ui/avatar"
import { buttonVariants } from "@components/ui/button"
import { cn } from "@lib/utils"
import { Bell } from "lucide-react"

import { Switcher } from "./switcher"


function Navigation({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}>
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary">
        Overview
      </Link>
      <Link
        href="/"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Prompt
      </Link>
      <Link
        href="/"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Analysis
      </Link>
      <Link
        href="/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Settings
      </Link>
    </nav>
  )
}

export function Header() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur">
      <div className="container flex h-16 items-center space-x-4">
        <Link href="/">
          <Avatar className={"h-12 w-12"}>
            <Image src={"/icon_cubone.png"} alt={"@icon"} fill />
          </Avatar>
        </Link>
        <span className={"font-mono text-foreground"}>piriwata /</span>
        <Switcher />
        <Navigation />

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div
            className={cn(
              buttonVariants({ size: "sm", variant: "ghost" }),
              "h-12 w-12 cursor-pointer px-0"
            )}>
            <Bell className={"h-6 w-6"} aria-label={"Notification"} />
          </div>
        </div>
      </div>
    </header>
  )
}
