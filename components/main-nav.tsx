"use client";
import { Menu } from "lucide-react";
import { AttributesDropdown } from "./attributes-dropdown";
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import Link from "next/link"

import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Overview',
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: 'Categories',
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/products`,
      label: 'Products',
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: 'Orders',
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`,
    },
  ]

  return (
    <div className="flex justify-end md:justify-start w-full">
      <NavigationMenu className="hidden md:block">
        <NavigationMenuList>
          {routes.map((route) => (
            <NavigationMenuItem
              key={route.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
              )}
            >
            <Link href={route.href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {route.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          ))}
          <AttributesDropdown />
        </NavigationMenuList>
      </NavigationMenu>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
              <div className="flex flex-col gap-4 items-center justify-center h-full">
                {routes.map((route) => (
                  <SheetClose>
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        'text-sm font-medium transition-colors hover:text-primary',
                        route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
                      )}
                    >
                      {route.label}
                    </Link>
                  </SheetClose>
                ))}
                <AttributesDropdown />
              </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
};