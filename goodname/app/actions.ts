// https://randomuser.me/api/

import { Dispatch, SetStateAction } from "react"

export async function getUsersAction(
  // queryParams: QueryParams,
  // setStateFunc: Dispatch<SetStateAction<UserObject | null>>,
  setLoadingState: Dispatch<SetStateAction<boolean>>
): Promise<void> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}?results=10&inc=gender,name,location,email,picture`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: undefined
    })

    if (!response.ok) {
      throw new Error('Failed to send data')
    }

    // const result = await response.json()
    // setStateFunc(result as UserObject)
  } catch (error) {
    console.error('Error sending data to backend:', error)
  } finally {
    setLoadingState(false)
  }
}
