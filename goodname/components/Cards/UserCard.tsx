'use client'

import { Cloud, CloudRainWind, SunMedium } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "../ui/button"

interface Props {
  userObject: UserObject | null
}

export function UserCard({ userObject }: Props): React.ReactNode {
  // const [weatherCode, setWeatherCode] = useState<number>(60)

  if (userObject === null) return null

  return (
    <div className="flex flex-col gap-4 items-center justify-center rounded-xl border-b-neutral-100 bg-neutral-100 border p-5 hover:cursor-pointer shadow shadow-blue-500/40 hover:shadow-red-500 duration-300">
      <div className="flex gap-2">
        <h2 className="text-black">Name: {userObject.name.first + ' ' + userObject.name.last}</h2>
        <p className="text-black">Gender: {userObject.gender}</p>
      </div>
      <div className="h-auto w-auto max-w-[200px] max-h-[200px] rounded-lg overflow-hidden">
        <Image
          src={userObject.picture.large}
          alt='User avatar'
          width={200}
          height={200}
          className="w-full h-full min-w-[200px] min-h-[200px]"
        />
      </div>
      <div className="h-auto w-auto flex gap-1 justify-center items-center">
        {userObject.weather.current_weather.weathercode > 0 && userObject.weather.current_weather.weathercode < 60
          ? <Cloud className="stroke-black" />
          : userObject.weather.current_weather.weathercode >= 60 ?
            <CloudRainWind className="stroke-black" />
            : <SunMedium className="stroke-black" />
        }
        <p className="w-full text-black">
          {userObject.location.country + ' ' + userObject.location.city + ', ' + userObject.location.postcode}
        </p>
      </div>
      <div className="flex gap-2 mt-3">
        <Button variant="outline" className="text-black hover:text-red-400">Save button</Button>
        <Button variant="outline" className="text-black hover:text-red-400">Details button</Button>
      </div>
    </div>
  )
}
