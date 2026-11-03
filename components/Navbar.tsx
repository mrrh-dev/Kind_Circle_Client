"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CalendarDays, Heart, LogOut, PlusCircle, Settings, User } from "lucide-react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { signOut, useSession } from "@/lib/auth-client";
import { clearToken } from "@/lib/token";
import { cn } from "@/lib/utils";
import Avatar from "./Avatar";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const menuLinks = [
  { href: "/create-event", label: "Create Event", icon: PlusCircle },
  { href: "/manage-events", label: "Manage Events", icon: Settings },
  { href: "/joined-events", label: "Joined Events", icon: Heart },
  { href: "/profile", label: "My Profile", icon: User },
];

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    try {
      await signOut();
      clearToken();
      toast.success("You have been logged out. See you soon!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("We could not log you out. Please try again.");
    }
  }

  const user = session?.user;
  const eventsActive = pathname === "/events" || pathname.startsWith("/events/");

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <nav className="page-shell flex h-[72px] items-center justify-between gap-3" aria-label="Main">
        <Logo />

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/events"
            className={cn(buttonVariants({ variant: "ghost" }), "px-3", eventsActive && "text-primary")}
            aria-current={eventsActive ? "page" : undefined}
          >
            <CalendarDays className="hidden h-4 w-4 sm:block" />
            <span className="hidden sm:inline">Upcoming Events</span>
            <span className="sm:hidden">Events</span>
          </Link>

          <ThemeToggle />

          {isPending ? (
            <Skeleton className="size-10 rounded-full" aria-hidden="true" />
          ) : user ? (
            <>
              <DropdownMenu>
                {/* Hovering the picture shows the display name */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="rounded-full ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
                        aria-label={`Open account menu for ${user.name}`}
                      >
                        <Avatar src={user.image} name={user.name} className="size-10" />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">{user.name}</TooltipContent>
                </Tooltip>

                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel className="font-normal">
                    <p className="truncate font-semibold">{user.name}</p>
                    <p className="truncate text-sm text-muted-foreground">{user.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {menuLinks.map(({ href, label, icon: Icon }) => (
                    <DropdownMenuItem key={href} asChild>
                      <Link href={href}>
                        <Icon className="size-4 text-primary" />
                        {label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator className="sm:hidden" />
                  <DropdownMenuItem variant="destructive" onSelect={handleLogout} className="sm:hidden">
                    <LogOut className="size-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button type="button" variant="brand" onClick={handleLogout} className="hidden sm:inline-flex">
                <LogOut className="size-4" />
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login" className={buttonVariants()}>
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
