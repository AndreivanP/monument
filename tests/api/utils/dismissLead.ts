// import { generateToken } from './generateToken';
// import { request } from '@playwright/test';

// export async function DismissLead(leadID: string, dismissalID: string) {
//     // Generate bearer token and Set-Cookie header
//     const { accessToken, setCookieHeader } = await generateToken();
  
//     // Set up the request context
//     const context = await request.newContext({
//       baseURL: 'https://api-ext.stg.monument.io',
//       extraHTTPHeaders: {
//         accept: 'application/json, text/plain, */*',
//         'accept-language': 'en-MT,en;q=0.9',
//         'content-type': 'application/json',
//         authorization: `Bearer ${accessToken}`,
//         cookie: setCookieHeader,
//       },
//     });
  
//     try {
//       // Perform the PUT request
//       const response = await context.put(`/leads/${leadID}/dismiss`, {
//         data: {
//           leadDismissalReasonUuid: dismissalID,
//         },
//       });
  
//       // Assert the status code is 200
//       if (response.status() !== 200) {
//         throw new Error(`Failed to dismiss lead: ${response.status()} - ${response.statusText()}`);
//       }
  
//       console.log('Lead dismissed successfully');
//     } catch (error) {
//       console.error('Error dismissing lead:', error);
//     } 
//   }
  

import { generateToken } from './generateToken';
import { request } from '@playwright/test';

export async function DismissLead(leadID: string, dismissalID: string) {
    // Generate bearer token and Set-Cookie header
    const { accessToken, setCookieHeader } = await generateToken();
  
    // Set up the request context
    const context = await request.newContext({
      baseURL: 'https://api-ext.stg.monument.io',
      extraHTTPHeaders: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-MT,en;q=0.9',
        'content-type': 'application/json',
        authorization: `Bearer ${accessToken}`,
        cookie: setCookieHeader,
      },
    });
  
    try {
      // Perform the PUT request
      const response = await context.put(`/leads/${leadID}/dismiss`, {
        data: {
          leadDismissalReasonUuid: dismissalID,
        },
      });
  
      // Return only the response status
      return { status: response.status() };
    } catch (error) {
      console.error('Error dismissing lead:', error);
      throw error; // Re-throw the error for the caller to handle
    } 
  }
  
  