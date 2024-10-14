'use client'

import { UserCard } from "@/components/Cards/UserCard"
import { useEffect, useState } from "react"
import { getUsersAction } from "../actions"
import { Button } from "@/components/ui/button"

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
      getUsersAction(amountOfUsers, amountOfUsers / amountOfUsers, seedData, false, setUsersData, setLoading)
        .then((res) => setSeedData(res as string))
        .catch((err) => console.error(err))
    }
  }, [amountOfUsers])

  if (usersData === null) return null

  return (
    <>
      <header />
      <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          {loading ?
            <div>Loading...</div>
            : <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {usersData?.map((user, index) => (
                <UserCard
                  key={
                    (user.id.value && user.id.value !== '' ? user.id.value : index.toString()) +
                    (user.id.name && user.id.name !== '' ? user.id.name : (index + 1).toString())
                  }
                  userObject={user} />
              ))}
            </ul>
          }
          <Button
            variant='destructive'
            className="mx-auto font-semibold"
            onClick={() => handleIncreaseAmountOfUsers()}
          >Load More...</Button>
        </div>
      </main>
      <footer />
    </>
  )
}
