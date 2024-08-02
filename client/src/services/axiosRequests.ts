import type { AxiosError } from 'axios'
import axios from 'axios'

export async function makeGetRequest(url: string, headers?: object) {
  try {
    const res = await axios.get(url, { headers })
    return res.data
  } catch (error) {
    const axiosError = error as AxiosError
    const playlistsItemsError = axiosError.response?.data
    throw playlistsItemsError
  }
}
export async function makePostRequest(
  url: string,
  body: object,
  headers?: object
) {
  try {
    const res = await axios.post(url, body, { headers })
    return res.data
  } catch (error) {
    const axiosError = error as AxiosError
    const playlistsItemsError = axiosError.response?.data
    throw playlistsItemsError
  }
}
