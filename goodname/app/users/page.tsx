'use client'

import { UserCard } from "@/components/Cards/UserCard"
import { useEffect, useState } from "react"
import { getUsersAction } from "../actions"
import { nanoid } from 'nanoid'
import { Button } from "@/components/ui/button"
import { Header } from "@/components/Header/Header"
import { BackToTop } from "@/components/Buttons/BackToTop"

export default function Users() {
  const [amountOfUsers, setAmountOfUsers] = useState<number>(10)
  const [seedData, setSeedData] = useState<string | null>(null)
  const [usersData, setUsersData] = useState<UserObject[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  function handleIncreaseAmountOfUsers(): void {
    setAmountOfUsers(prev => prev + 10)
  }

  useEffect(() => {
    if (amountOfUsers === 10) {
      getUsersAction(amountOfUsers, amountOfUsers / amountOfUsers, seedData, true, setUsersData, setLoading)
        .then((res) => setSeedData(res as string))
        .catch((err) => console.error(err))
    } else {
      setLoading(true)
      getUsersAction(amountOfUsers, amountOfUsers / amountOfUsers, seedData, false, setUsersData, setLoading)
        .then((res) => {
          setSeedData(res as string)
          setTimeout(() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth'
            })
          }, 500)
        })
        .catch((err) => console.error(err))
    }
  }, [amountOfUsers])

  if (usersData === null) return null

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          {loading ?
            <div>Loading...</div>
            : <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {usersData?.map((user) => (
                <UserCard
                  key={nanoid()}
                  userObject={user} />
              ))}
            </ul>
          }
          <Button
            variant='destructive'
            className="mx-auto font-semibold disabled:cursor-not-allowed"
            disabled={loading}
            onClick={() => handleIncreaseAmountOfUsers()}
          >Load More...</Button>
        </div>
        <BackToTop />
      </main>
      <footer />
    </>
  )
}
