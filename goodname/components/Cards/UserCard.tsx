'use client'

import { Cloud, CloudRainWind, SunMedium } from "lucide-react"
import Image from "next/image"
import { Button } from "../ui/button"

interface Props {
  userObject: UserObject | null
}

export function UserCard({ userObject }: Props): React.ReactNode {

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
        <h2 className="text-black"><strong>Name:</strong> {userObject.name.first + ' ' + userObject.name.last}</h2>
        <p className="text-black"><strong>Gender:</strong> {userObject.gender}</p>
        <p className="text-black"><strong>Email:</strong> {userObject.email}</p>
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
            <p><strong>Current temperature:</strong> {userObject.weather.current_weather.temperature} °C</p>
            <p><strong>Maximum temperature:</strong> {userObject.weather.daily.temperature_2m_max[0]} °C</p>
            <p><strong>Minimum temperature:</strong> {userObject.weather.daily.temperature_2m_min[0]} °C</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <Button variant="outline" className="text-black hover:text-red-400">Save button</Button>
        <Button variant="outline" className="text-black hover:text-red-400">Details button</Button>
      </div>
    </div>
  )
}
