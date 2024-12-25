import { generateToken } from './generateToken';
import getSetUp from '../../../test.config';
import { request } from '@playwright/test';

const setUp = getSetUp();

// Generic function to create leads
export async function CreateFacility(facilityName: string) {
    const url = `${setUp.baseURLStgAPI}/facilities`;

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
        facilityName: `${facilityName}`,
        addressLine1: "afsd",
        city: "LA",
        state: "KS",
        zip: "31341",
        country: "United States",
        email: "test@gmail.com",
        phone: "141324123",
        websiteUrl: "https://www.google.com",
        timeZone: "America/Adak",
        operatingHours: {
            Sun: {
                isOpen: true,
                openTime: "08:00 AM",
                closeTime: "05:00 PM"
            },
            Mon: {
                isOpen: false
            },
            Tues: {
                isOpen: false
            },
            Wed: {
                isOpen: false
            },
            Thurs: {
                isOpen: false
            },
            Fri: {
                isOpen: false
            },
            Sat: {
                isOpen: false
            }
        },
        numberOfFloors: 3,
        unitAmenities: [
            "Accessibility Features",
            "Heated"
        ]
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
        throw new Error(`Failed to create Facility. Status code: ${response.status()}`);
    }

    // Parse and return the response body
    return await response.json();
}