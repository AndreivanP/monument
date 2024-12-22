import { BrowserContext } from '@playwright/test';

const loginViaLocalStorage = async (context: BrowserContext) => {
  // The URL where the local storage will be set
  const localStorageUrl = 'https://automatedtests.stg.monument.io/';

  // The local storage key-value pair
  const localStorageKey = 'monument_value';
  const localStorageValue = JSON.stringify({
    id: '5e680360-bef3-11ef-967b-7792c96abf2c',
    firstName: 'Andreivan',
    lastName: 'Pedon',
    email: 'darby.hadley+3@monument.io',
    roleName: 'admin',
    organizationUuids: [
      'b55e3cd0-bf47-11ef-bff1-0d1a9f0d7bed',
      // ... (rest of the organization UUIDs)
    ],
    hasAllFacilityAccess: true,
    permissions: {
      dashboard: { canView: true, canEdit: true, canCreate: true, canDelete: true },
      // ... (rest of the permissions)
    },
    isLoggedIn: true,
  });

  // Set the cookie details
  const cookie = {
    name: 'connect.sid',
    value: 's%3AdR2JdLM5WMd458sz5YeY_gdtMs74HCuS.Rn%2BItW04JP7IwlNGRpD%2BKoZSBSVqrSSdWJbAeXKAbyc',
    domain: 'api-ext.stg.monument.io',
    path: '/',
    httpOnly: true,
    secure: true, // Ensure secure is true if testing in HTTPS environments
    expires: Math.floor((Date.now() + 24 * 60 * 60 * 1000) / 1000), // Current date + 1 day (in seconds)
  };

  // Open a new page to set the local storage
  const page = await context.newPage();
  await page.goto(localStorageUrl);

  // Set local storage
  await page.evaluate(([key, value]) => {
    localStorage.setItem(key, value);
  }, [localStorageKey, localStorageValue]);

  // Add the cookie to the context
  await context.addCookies([cookie]);

  // Close the page
  await page.close();
};

export default loginViaLocalStorage;