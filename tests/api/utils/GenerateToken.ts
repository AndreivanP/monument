// Import necessary modules
import { request } from '@playwright/test';
import getSetUp from '../../../test.config';

const setUp = getSetUp();

export async function generateToken() {
  // Define the API endpoint
  const url = `${setUp.baseURLStgAPI}/auth/login`;

  // Define the payload
  const payload = {
    username: `${setUp.username}`,
    password: `${setUp.password}`,
  };

  // Define headers
  const headers = {
    'accept': 'application/json',
    'content-type': 'application/json',
    'origin': `${setUp.baseURLStgUI}`
  };

  // Create a request context
  const context = await request.newContext();

  // Send POST request to generate the token
  const response = await context.post(url, {
    headers,
    data: payload
  });

  // Validate the response status
  if (response.status() !== 200) {
    const errorBody = await response.text();
    throw new Error(`Failed to generate token. Status: ${response.status()}, Request Body: ${JSON.stringify(payload)}, Response: ${errorBody}`);
  }

  // Parse the response body
  const responseBody = await response.json();

  // Extract the access token
  const accessToken = responseBody.tokens.AccessToken;

  // Extract the Set-Cookie header
  const setCookieHeader = response.headers()['set-cookie'];

  // Return both the access token and the Set-Cookie header
  return { accessToken, setCookieHeader };
}
