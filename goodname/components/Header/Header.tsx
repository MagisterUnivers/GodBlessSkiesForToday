'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header(): React.ReactNode {
  const pathname = usePathname()
  const headerNavLinkUsersStyle = pathname === '/users'
    ? 'flex items-center gap-2 text-lg font-semibold md:text-base text-black'
    : 'text-muted-foreground transition-colors hover:text-foreground text-black'
  const headerNavLinkFavUsersStyle = pathname === '/favourite-users'
    ? 'flex items-center gap-2 text-lg font-semibold md:text-base text-black'
    : 'text-muted-foreground transition-colors hover:text-foreground text-black'

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/users"
          className={headerNavLinkUsersStyle}
        >
          Browse Users
        </Link>
        <Link
          href="/favourite-users"
          className={headerNavLinkFavUsersStyle}
        >
          Favourite Users
        </Link>
      </nav>
    </header>
  )
}
