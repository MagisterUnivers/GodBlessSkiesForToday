import { Dispatch, SetStateAction } from "react"

export async function getUsersAction(
  amountOfUsers: number,
  page: number | null,
  seed: string | null,
  isFirstLoad: boolean,
  setStateFunc: Dispatch<SetStateAction<UserObject[] | null>>,
  setLoadingState: Dispatch<SetStateAction<boolean>>
): Promise<string | void> {
  try {
    const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}?results=${amountOfUsers}&page=${page}&seed=${seed}&inc=id,gender,name,location,email,picture`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: undefined
    })

    if (!usersResponse.ok) {
      throw new Error('Failed to get users data.')
    }

    const { results: users, info: fetchInfo } = await usersResponse.json()

    const usersWithWeatherPromises = users.map(async (user: UserObject) => {
      const { latitude, longitude } = user.location.coordinates

      try {
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,cloud_cover&daily=temperature_2m_max,temperature_2m_min&current=weather_code`
        )

        if (!weatherResponse.ok) {
          throw new Error(`Failed to fetch weather for ${user.name.first} ${user.name.last}`)
        }

        const weatherData = await weatherResponse.json()
        return { ...user, weather: weatherData }
      } catch (error) {
        console.error(`Error fetching weather for user ${user.name.first} ${user.name.last}:`, error)
        return { ...user, weather: null }
      }
    })

    const usersWithWeather = await Promise.all(usersWithWeatherPromises)

    if (isFirstLoad) {
      setStateFunc(usersWithWeather as UserObject[]);
    } else {
      setStateFunc((prevUsers) => [...(prevUsers || []), ...usersWithWeather] as UserObject[]);
    }

    return fetchInfo.seed
  } catch (error) {
    console.error('Error sending data to backend:', error)
  } finally {
    setLoadingState(false)
  }
}
