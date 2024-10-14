'use client'

import { Cloud, CloudRainWind, SunMedium } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface Props {
  // something
}

export function UserCard({ }: Props): React.ReactNode {
  const [weatherCode, setWeatherCode] = useState<number>(60)

  return (
    <div className="flex flex-col gap-4 items-center justify-center rounded-xl border-b-neutral-100 bg-neutral-100 border p-5 hover:cursor-pointer">
      <div className="flex gap-2">
        <h2 className="text-black">Name: Pidarka</h2>
        <p className="text-black">Gender: Female</p>
      </div>
      <div className="h-auto w-auto max-w-[200px] max-h-[200px] rounded-lg overflow-hidden">
        <Image
          src='https://randomuser.me/api/portraits/women/63.jpg'
          alt='User avatar'
          width={200}
          height={200}
          className="w-full h-full min-w-[200px] min-h-[200px]"
        />
      </div>
      <div className="h-auto w-auto flex gap-1 justify-center items-center">
        {weatherCode > 0 && weatherCode < 60
          ? <Cloud className="stroke-black" />
          : weatherCode >= 60 ?
            <CloudRainWind className="stroke-black" />
            : <SunMedium className="stroke-black" />
        }
        <p className="w-full text-black">Country, City, postcode</p>
      </div>
      <div className="flex gap-2 mt-3">
        <p className="text-red-400">Save button</p>
        <p className="text-red-400">Details button</p>
      </div>
    </div>
  )
}
