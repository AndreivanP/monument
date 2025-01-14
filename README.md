# monument
Demo test automation framework using Playwright

# Pre Requirements
- `npm` version greater than 8.13.0 installed.
- `node js` version greater than 18.6.0 installed.

## Setup

1. Clone and access the cloned repo folder:

    `$ git clone git@github.com:AndreivanP/monument.git && cd monument/tests`

2. Install the project dependencies:

    `$ npm install`

3. It's mandatory to create a `.env` file in the root directory containing username and password of an user who is able to sign in on monument app. This file must follow the pattern specified on ".env.example"

## CLI commands
### Test Execution

Run `npx playwright test --ui`, to open Playwright UI Runner.

Run `npx playwright test` to run all the tests including api and e2e. Keep in mind that user should be under the `tests` directory.

## Test Architecture
### Tools

* [Playwright][test-tool], to create and run tests.
* [Faker][data-tool], to generate random data for tests.
* [Dotenv][env-tool], to load environment variables from a .env file.

### Detailed folder structure

```
monument/
├── tests/
│   ├── api/
│   │   ├── utils/
│   ├── e2e/
│   │   ├── page/
│   │   ├── spec/
│   │   ├── utils/
│   ├── .env.example
│   ├── playwright.config.ts
├── .gitignore
├── package-lock.json
├── package.json
├── test.config.ts

```
- :file_folder: [tests/]: Directory with all related test framework folders and files.
    - :file_folder: [api/](tests/api/): Directory with API-related test files and utilities.
        - :file_folder: [utils/](tests/api/utils/): Directory with reusable functions for API setup and execution.
        - :page_with_curl: [AddLead.ts](tests/api/utils/AddLead.ts): Utility for adding leads via API.
        - :page_with_curl: [CreateFacility.ts](tests/api/utils/CreateFacility.ts): Utility for adding Facilities via API.
        - :page_with_curl: [dismissLead.ts](tests/api/utils/dismissLead.ts): Utility for dismissing leads via API.
        - :page_with_curl: [GenerateToken.ts](tests/api/utils/GenerateToken.ts): Utility for generating API tokens.
    - :page_with_curl: [AddLead.api.spec.ts](tests/api/AddLead.api.spec.ts): Test file for validating the Add Lead API functionality.
    - :page_with_curl: [dismissLead.api.spec.ts](tests/api/dismissLead.api.spec.ts): Test file for validating the Dismiss Lead API functionality.
    - :file_folder: [e2e/](tests/e2e/): Directory for End-to-End (E2E) tests.
        - :file_folder: [page/](tests/e2e/page/): Directory with Page Object Model (POM) files for UI pages.
            - :page_with_curl: [AddLeadFormPage.ts](tests/e2e/page/AddLeadFormPage.ts): Defines methods and elements for interacting with the Add Lead Form.
            - :page_with_curl: [DashboardPage.ts](tests/e2e/page/DashboardPage.ts): Defines methods and elements for interacting with the Dashboard page.
            - :page_with_curl: [DismissLeadFormPage.ts](tests/e2e/page/DismissLeadFormPage.ts): Defines methods and elements for interacting with the Dismiss Lead Form.
            - :page_with_curl: [DismissLeadPage.ts](tests/e2e/page/DismissLeadPage.ts): Defines methods and elements for interacting with the Dismiss Lead page.
            - :page_with_curl: [LoginPage.ts](tests/e2e/page/LoginPage.ts): Defines methods and elements for interacting with the Login page.
        - :file_folder: [spec/](tests/e2e/spec/): Directory containing E2E test specifications.
            - :page_with_curl: [AddLead.spec.ts](tests/e2e/spec/AddLead.spec.ts): Test file for verifying the Add Lead functionality in the UI.
            - :page_with_curl: [DismissLead.spec.ts](tests/e2e/spec/DismissLead.spec.ts): Test file for verifying the Dismiss Lead functionality in the UI.
        - :file_folder: [utils/](tests/e2e/utils/): Directory with utility functions for E2E testing.
            - :page_with_curl: [loginViaLocalStorage.ts](tests/e2e/utils/loginViaLocalStorage.ts): Utility function for performing login using local storage for faster and more reliable setup.
- :page_with_curl: [.env.example](/tests/.env.example): File with the environment variables needed for tests to work properly. From this file, create a .env file and populate it with the required variables.
- :page_with_curl: [playwright.config.ts](tests/playwright.config.ts): Main Playwright configuration file. Contains global settings for test execution, including test directory paths, browser settings, and timeouts.
- :page_with_curl: test.config.ts: Additional configuration file specific to this project. Includes baseURL's and "link" to username and password from env file
- :page_with_curl: [.gitignore]: File specifying files and directories to be ignored by Git.
- :page_with_curl: [package.json]: File holding the project's dependencies and scripts.
- :page_with_curl: [package-lock.json]: Automatically generated file that locks the dependency tree.

# Future Improvements

- Create extra tests to increase testing coverage for AddLead tests using API.
- Cover more edge cases in all the tests.
- For the F/E tests perform the log in using API and inserting data in the Local Storage in order to speed up runtime.
- Create Github Actions CI/CD pipelines.

<!-- Links list -->
[test-tool]: https://playwright.dev/
[data-tool]: https://www.npmjs.com/package/@faker-js/faker
[env-tool]: https://www.npmjs.com/package/dotenv
