import type { TokenRes } from './types/TokenRes';

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const url = 'https://accounts.spotify.com/api/token';

export async function getAccessToken() {
  const base64Token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  myHeaders.append('Authorization', `Basic ${base64Token}`);

  const urlEncoded = new URLSearchParams();
  urlEncoded.append('grant_type', 'client_credentials');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlEncoded,
  };
  try {
    const resp = await fetch(url, {
      ...requestOptions,
    });
    const data: TokenRes = await resp.json();
    const accessToken = data.access_token;
    return accessToken;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
