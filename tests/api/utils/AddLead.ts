import { generateToken } from './generateToken';
import getSetUp from '../../../test.config';
import { request } from '@playwright/test';

const setUp = getSetUp();

// Generic function to create leads
export async function AddLead(leadFirstName: string, leadLastName: string, leadEmail: string) {
    const url = `${setUp.baseURLStgAPI}/leads`;

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

    // Define the payload with default or provided lead details
    const payload = {
        person: {
            firstName: `${leadFirstName}`,
            lastName: `${leadLastName}`,
            email: `${leadEmail}`
        },
        facilityUuid: '334bf26e-c1a3-11ef-a881-4782397ca885'
    };

    // Create a request context
    const context = await request.newContext();

    // Send POST request to generate the token
    const response = await context.post(url, {
        headers,
        data: payload
    });

    // Validate the response status code
    if (response.status() !== 201) {
        throw new Error(`Failed to create lead. Status code: ${response.status()}`);
    }

    // Parse and return the response body
    return await response.json();
}