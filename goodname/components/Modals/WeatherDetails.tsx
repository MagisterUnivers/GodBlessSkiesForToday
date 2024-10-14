'use client'

import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog"

interface Props {
  userObject: UserObject
}

export function WeatherDetails({ userObject }: Props): React.ReactNode {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-black hover:text-red-400 hover:bg-white whitespace-normal h-auto">Weather details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Weather Details</DialogTitle>
          <DialogDescription>
            Here you see the selected user weather info.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <div className="flex flex-col">
              <p><span className="font-bold">Current temperature:</span> {userObject.weather.current_weather.temperature} °C</p>
              <p><span className="font-bold">Maximum temperature:</span> {userObject.weather.daily.temperature_2m_max[0]} °C</p>
              <p><span className="font-bold">Minimum temperature:</span> {userObject.weather.daily.temperature_2m_min[0]} °C</p>
              <p><span className="font-bold">Pressured wind direction:</span> {userObject.weather.current_weather.winddirection} PHA</p>
              <p><span className="font-bold">Wind speed:</span> {userObject.weather.current_weather.windspeed} km/h</p>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="text-black hover:text-red-400 hover:bg-white">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
