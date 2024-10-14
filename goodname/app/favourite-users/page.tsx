'use client'

import { UserCard } from "@/components/Cards/UserCard"
import { useEffect, useState } from "react"
import { Header } from "@/components/Header/Header"
import { BackToTop } from "@/components/Buttons/BackToTop"

export default function Users() {
  const [savedUsers, setSavedUsers] = useState<UserObject[]>([])

  function handleDeleteFromFavourite(id: string): void {
    const newUsersArray = savedUsers.filter(it => it.customId !== id)
    setSavedUsers(newUsersArray)
  }

  function renderFavourites(func1: () => void, func2: () => void): void {
    func1()
    func2()
  }

  useEffect(() => {
    const savedUsersData = localStorage.getItem('savedUsers')

    if (savedUsersData) {
      setSavedUsers(JSON.parse(savedUsersData))
    }
  }, [])

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          {savedUsers.length === 0 ?
            (
              <div>No saved users found.</div>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {savedUsers.map((user) => (
                  <UserCard
                    key={user.customId}
                    onItemDelete={handleDeleteFromFavourite}
                    onFavStateChange={renderFavourites}
                    userObject={user} />
                ))}
              </ul>
            )}
        </div>
        <BackToTop />
      </main>
      <footer />
    </>
  )
}
