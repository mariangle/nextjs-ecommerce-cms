import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuLabel,
  DropdownMenuItem, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export const AttributesDropdown = () => {
  const params = useParams();
  const pathname = usePathname();


  const attributes = [ 
    {
      href: `/${params.storeId}/billboards`,
      label: 'Billboards',
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: 'Sizes',
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: 'Colors',
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/brands`,
      label: 'Brands',
      active: pathname === `/${params.storeId}/brands`,
    },
    {
      href: `/${params.storeId}/storages`,
      label: 'Storages',
      active: pathname === `/${params.storeId}/storages`,
    },
    {
      href: `/${params.storeId}/conditions`,
      label: 'Conditions',
      active: pathname === `/${params.storeId}/conditions`,
    },
  ]
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Customization</DropdownMenuLabel>
        { attributes.map((route) => (
          <Link href={route.href} key={route.label}>
            <DropdownMenuItem>
              {route.label}
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}