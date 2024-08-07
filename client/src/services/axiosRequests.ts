import type { AxiosError } from 'axios'
import axios from 'axios'

export async function makeGetRequest(url: string, headers?: object) {
  try {
    console.log('url', url)
    console.log('headers', headers)
    const res = await axios.get(url, { headers })
    return res.data
  } catch (error) {
    console.log(error)
    const axiosError = error as AxiosError
    throw axiosError
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
    const requestError = axiosError.response?.data
    throw requestError
  }
}

export async function makeDeleteRequest(
  url: string,
  body: object,
  headers?: object
) {
  try {
    const res = await axios.delete(url, { headers, data: body })
    return res.data
  } catch (error) {
    const axiosError = error as AxiosError
    const requestError = axiosError.response?.data
    throw requestError
  }
}
