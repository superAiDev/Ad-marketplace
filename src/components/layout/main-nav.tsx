"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

export function MainNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isLoggedIn = false // TODO: Replace with real auth check

  const menuItems = [
    { href: "/categories", label: "دسته‌بندی‌ها" },
    { href: "/services", label: "آگهی‌ها" },
    { href: "/pricing", label: "تعرفه‌ها" },
    { href: "/about", label: "درباره ما" },
  ]

  const userMenuItems = isLoggedIn
    ? [
        { href: "/dashboard", label: "داشبورد" },
        { href: "/ads/new", label: "ثبت آگهی" },
        { href: "/bookmarks", label: "نشان‌شده‌ها" },
        { href: "/settings", label: "تنظیمات" },
        { href: "/logout", label: "خروج" },
      ]
    : [
        { href: "/auth/login", label: "ورود" },
        { href: "/auth/register", label: "ثبت نام" },
      ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="fixed inset-y-0 right-0 h-full w-[300px] rounded-none p-0">
            <ScrollArea className="h-full pb-10">
              <div className="space-y-4 py-4">
                <div className="px-4 py-2">
                  <Link href="/" className="flex items-center space-x-2">
                    <span className="font-bold">دیوار</span>
                  </Link>
                </div>
                <div className="px-4">
                  <form className="relative">
                    <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="جستجو..."
                      className="w-full pr-9"
                    />
                  </form>
                </div>
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm hover:bg-accent"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="border-t pt-4">
                  <nav className="space-y-2">
                    {userMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm hover:bg-accent"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
        <div className="flex w-full items-center gap-4 md:gap-6">
          <Link href="/" className="hidden md:block">
            <span className="text-xl font-bold">دیوار</span>
          </Link>
          <form className="hidden w-full max-w-sm md:block">
            <div className="relative">
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="جستجو در همه آگهی‌ها..."
                className="w-full pr-9"
              />
            </div>
          </form>
          <nav className="hidden gap-6 md:flex">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-4">
            {isLoggedIn ? (
              <>
                <Button size="icon" variant="ghost">
                  <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/01.jpg" alt="تصویر کاربر" />
                        <AvatarFallback>ک</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>حساب کاربری</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {userMenuItems.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href}>{item.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/auth/login">ورود</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/register">ثبت نام</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}