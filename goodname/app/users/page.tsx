'use client'

import { UserCard } from "@/components/Cards/UserCard"
import { useEffect, useState } from "react"
import { getUsersAction } from "../actions"

export default function Users() {
  const [usersData, setUsersData] = useState<UserObject[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getUsersAction(setUsersData, setLoading).catch((err) => console.error(err))
  }, [])

  if (usersData === null) return null

  return (
    <>
      <header />
      <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          {loading ?
            <div>Loading...</div>
            : <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {usersData?.map((user) => (
                <UserCard key={Number(user.id.value)} userObject={user} />
              ))}
            </ul>
          }
        </div>
      </main>
      <footer />
    </>
  )
}
