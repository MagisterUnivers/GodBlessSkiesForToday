declare interface UserObject {
  name: {
    title: string
    first: string
    last: string
  }
  location: {
    city: string
    state: string
    country: string
    postcode: number
    coordinates: {
      latitude: string
      longitude: string
    }
  }
  email: string
  id: {
    name: string
    value: string
  }
  customId: string
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
  gender: string
  weather: WeatherObject
}

declare interface WeatherObject {
  latitude: number
  longitude: number
  timezone: string
  current_weather_units: {
    time: string
    temperature: string
    is_day: string
    weathercode: string
  }
  current_weather: {
    time: string
    interval: number
    temperature: number
    windspeed: number
    winddirection: number
    is_day: number
    weathercode: number
  }
  daily: {
    temperature_2m_max: number[]
    temperature_2m_min: number[]
  }
}
