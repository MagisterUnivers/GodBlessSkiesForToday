declare interface QueryParams {
  id: string;
  first_name: string;
  last_name: string;
  telegram_id: string;
  telegram_username: string | null;
  profile_picture: string | null;
  auth_date: string;
  hash: string;
}

declare interface UserObject {
  auth_date: string
  first_name: string
  hash: string
  id: number
  isActive: boolean
  last_name: string
  profile_picture: string | null
  telegram_id: string
  telegram_username: string | null
}
