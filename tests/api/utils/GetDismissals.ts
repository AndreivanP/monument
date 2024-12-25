import { generateToken } from './generateToken';
import getSetUp from '../../../test.config';
import { request } from '@playwright/test';

const setUp = getSetUp();

// Generic function to create leads
export async function GetDismissal() {
    const url = `${setUp.baseURLStgAPI}/leads/dismissalReasons`;

    // Generate bearer token and Set-Cookie header
    const { accessToken, setCookieHeader } = await generateToken();

    // Set headers
    const headers = {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-MT,en;q=0.9',
        'content-type': 'application/json',
        authorization: `Bearer ${accessToken}`,
        cookie: `${setCookieHeader}`,
    };    
    
    // Create a request context
    const context = await request.newContext();

    const response = await context.get(url, {
        headers
    });

    // Validate the response status code
    if (response.status() !== 200) {
        throw new Error(`Failed to get Dismissal reasons. Status code: ${response.status()}`);
    }

    // Parse and return the response body
    return await response.json();
}