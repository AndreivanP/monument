import { generateToken } from './generateToken';
import { CreateFacility } from './CreateFacility';
import getSetUp from '../../../test.config';
import { request } from '@playwright/test';
import { faker } from '@faker-js/faker';

const facilityName = faker.location.state();

const setUp = getSetUp();

export async function AddLead(leadFirstName: string, leadLastName: string, leadEmail: string) {
    const url = `${setUp.baseURLStgAPI}/leads`;

    // Generate bearer token and Set-Cookie header
    const { accessToken, setCookieHeader } = await generateToken();

    // Create a new Facility and get the response
    const facilityResponse = await CreateFacility(`${facilityName}`);

    // Ensure the facility ID is present
    const facilityId = facilityResponse?.id || facilityResponse?.facilityId;
    if (!facilityId) {
        throw new Error('Facility ID is undefined or not returned from CreateFacility.');
    }

    // Set headers
    const headers = {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-MT,en;q=0.9',
        'content-type': 'application/json',
        authorization: `Bearer ${accessToken}`,
        cookie: `${setCookieHeader}`,
    };

    // Define the payload with lead details
    const payload = {
        person: {
            firstName: `${leadFirstName}`,
            lastName: `${leadLastName}`,
            email: `${leadEmail}`
        },
        facilityUuid: facilityId
    };

    // Create a request context
    const context = await request.newContext();

    // Send POST request to create the lead
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
