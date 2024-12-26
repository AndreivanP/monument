import { generateToken } from './generateToken';
import getSetUp from '../../../test.config';
import { request } from '@playwright/test';

const setUp = getSetUp();

// Define the facility structure
interface Facility {
    description: string;
    id: string;
    orgId: string;
    facilityName: string;
    location: string;
    phone: string;
    email: string;
    state: string;
    city: string;
    zip: string;
    organizationUuid: string;
    vacantUnits: number;
    timeZone: string;
}

// Function to get the ID of a facility by its name
export async function GetUserFacilities(facilityName: string): Promise<string> {
    const url = `${setUp.baseURLStgAPI}/facilities/user-facilities`;

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

    // Perform GET request
    const response = await context.get(url, { headers });

    // Validate the response status code
    if (response.status() !== 200) {
        throw new Error(`Failed to get user facilities. Status code: ${response.status()}`);
    }

    // Parse the response body as an array of Facility
    const facilities: Facility[] = await response.json();

    // Filter by facilityName and return the id
    const facility = facilities.find(facility => facility.facilityName === facilityName);
    if (!facility) {
        throw new Error(`Facility with name "${facilityName}" not found.`);
    }

    return facility.id;
}
