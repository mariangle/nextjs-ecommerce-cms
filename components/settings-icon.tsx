"use client"

import Link from "next/link"

import { useParams } from "next/navigation"
import { Button } from "./ui/button"
import { Settings } from "lucide-react"

export const SettingsIcon = () => {
    const params = useParams();

  return (
    <Link href={`/${params.storeId}/settings`}>
        <Button variant="outline" size="icon">
            <Settings className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Settings</span>
        </Button>
    </Link>
  )
}