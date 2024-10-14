'use client'

import { Cloud, CloudRainWind, SunMedium } from "lucide-react"
import Image from "next/image"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { WeatherDetails } from "../Modals/WeatherDetails"
import { nanoid } from "nanoid"

interface Props {
  userObject: UserObject | null
  onItemDelete?: (id: string) => void
  onFavStateChange?: (func1: () => void, func2: () => void) => void
}

export function UserCard({ userObject, onItemDelete, onFavStateChange }: Props): React.ReactNode {
  const [isUserSaved, setIsUserSaved] = useState<boolean>(false)
  const saveButtonStyles = isUserSaved
    ? 'text-red-400 font-semibold hover:bg-white'
    : 'text-black hover:text-red-400 hover:bg-white'

  function checkIfUserIsSaved(): void {
    const savedUsers = localStorage.getItem('savedUsers')
    if (savedUsers) {
      const usersArray = JSON.parse(savedUsers) as UserObject[]
      const userExists = usersArray.some((user) => user.id.value === userObject?.id.value)
      setIsUserSaved(userExists)
    }
  }

  function handleSaveUser(): void {
    const savedUsers = localStorage.getItem('savedUsers')
    const usersArray = savedUsers ? JSON.parse(savedUsers) : []

    if (isUserSaved) {
      const updatedUsers = usersArray.filter((user: UserObject) => user.customId !== userObject?.customId)
      localStorage.setItem('savedUsers', JSON.stringify(updatedUsers))
      setIsUserSaved(false)
    } else {
      const userWithCustomId = { ...userObject, customId: nanoid() }
      usersArray.push(userWithCustomId)
      localStorage.setItem('savedUsers', JSON.stringify(usersArray))
      setIsUserSaved(true)
    }
  }

  useEffect(() => {
    checkIfUserIsSaved()
  }, [])

  if (userObject === null) return null

  return (
    <div className="flex flex-col gap-4 items-center rounded-xl border-b-neutral-100 bg-neutral-100 border p-5 hover:cursor-pointer shadow shadow-blue-500/40 hover:shadow-red-500 duration-300">
      <div className="w-full h-auto rounded-lg overflow-hidden">
        <Image
          src={userObject.picture.large}
          alt='User avatar'
          width={200}
          height={200}
          quality={100}
          className="w-full h-auto min-w-[200px] min-h-[200px]"
        />
      </div>
      <div className="flex flex-col">
        <h2 className="text-black"><span className="font-bold">Name:</span> {userObject.name.first + ' ' + userObject.name.last}</h2>
        <p className="text-black"><span className="font-bold">Gender:</span> {userObject.gender}</p>
        <p className="text-black"><span className="font-bold">Email:</span> {userObject.email}</p>
      </div>
      <div className="w-auto h-auto flex flex-col gap-3 justify-center items-center">
        <h3 className="text-black text-2xl font-semibold">Weather information</h3>
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="h-auto w-auto flex gap-2 justify-center items-center">
            {userObject.weather.current_weather.weathercode > 0 && userObject.weather.current_weather.weathercode < 60
              ? <Cloud className="stroke-black" />
              : userObject.weather.current_weather.weathercode >= 60 ?
                <CloudRainWind className="stroke-black" />
                : <SunMedium className="stroke-black" />
            }
            <div className="flex flex-col gap-1">
              <p className="w-full text-black">
                {userObject.location.country + ' ' + userObject.location.city + ', '}
              </p>
              <p className="w-full text-black">{userObject.location.postcode}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <p><span className="font-bold">Current temperature:</span> {userObject.weather.current_weather.temperature} °C</p>
            <p><span className="font-bold">Maximum temperature:</span> {userObject.weather.daily.temperature_2m_max[0]} °C</p>
            <p><span className="font-bold">Minimum temperature:</span> {userObject.weather.daily.temperature_2m_min[0]} °C</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <Button
          variant="outline"
          className={saveButtonStyles}
          onClick={() => onFavStateChange !== undefined
            ? onFavStateChange(handleSaveUser, () => onItemDelete?.(userObject.customId))
            : handleSaveUser()}>
          {isUserSaved ? 'Remove from favourites' : 'Save to favourites'}
        </Button>
        <WeatherDetails userObject={userObject} />
      </div>
    </div>
  )
}
