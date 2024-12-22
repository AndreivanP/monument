import { test, expect } from '@playwright/test';
import loginViaLocalStorage from '../helper/loginViaLocalStorage';
import { faker } from '@faker-js/faker';
import {LoginPage} from '../page/LoginPage'
import { DashboardPage } from '../page/DashboardPage';
import { AddLeadFormPage } from '../page/AddLeadFormPage';

test.beforeEach(async ({ context, page }) => {
    //await loginViaLocalStorage(context);
    const loginPage = new LoginPage(page)
    await loginPage.performLoginUI(process.env.USERNAME, process.env.PASSWORD)
});

const leadFirstName = faker.person.firstName();
const leadLastName = faker.person.lastName();
const leadEmail = faker.internet.email()

test('Add a Lead', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const addLeadForm = new AddLeadFormPage(page);

    // Interact with the dashboard
    await dashboard.clickTargetRegularIcon();
    await addLeadForm.openAddLeadForm();
    await addLeadForm.fillLeadDetails(leadFirstName, leadLastName, leadEmail);
    await addLeadForm.searchFacility('Austin Facility 1');
    
    //Select the required Facility
    await addLeadForm.selectFacility()

    //Save Form
    await addLeadForm.saveForm();

    // Assert the Lead creation
    await dashboard.assertLeadCreated(leadFirstName, leadLastName);
});

test('Add a Lead with an Unit Group', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const addLeadForm = new AddLeadFormPage(page);

    // Interact with the dashboard
    await dashboard.clickTargetRegularIcon();
    await addLeadForm.openAddLeadForm();
    await addLeadForm.fillLeadDetails(leadFirstName, leadLastName, leadEmail);
    await addLeadForm.searchFacility('Austin Facility 1');
    
    //Select the required Facility
    await addLeadForm.selectFacility();
    
    //Select the optional Unit Group
    await addLeadForm.selectUnitGroup();
    
    //Deselect the default Unit
    await addLeadForm.deselectDefaultUnit();

    //Save Form
    await addLeadForm.saveForm();

    // Assert the Lead creation
    await dashboard.assertLeadCreated(leadFirstName, leadLastName);
});

test('Add a Lead with an Unit', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const addLeadForm = new AddLeadFormPage(page);

    // Interact with the dashboard
    await dashboard.clickTargetRegularIcon();
    await addLeadForm.openAddLeadForm();
    await addLeadForm.fillLeadDetails(leadFirstName, leadLastName, leadEmail);
    await addLeadForm.searchFacility('Austin Facility 1');
    
    //Select the required Facility
    await addLeadForm.selectFacility();
    
    //Select the optional Unit Group
    await addLeadForm.selectUnitGroup();
    
    //Save Form
    await addLeadForm.saveForm();

    // Assert the Lead creation
    await dashboard.assertLeadCreated(leadFirstName, leadLastName);
});


//await page.waitForTimeout(3000); // Waits for 2 seconds

//Move it to a new File?
test('Dismiss a Lead', async ({ page }) => {
    await page.locator('[data-testid="TargetRegularIcon"]').click();
    await page.locator('[name="fullName"]').fill('Mike Rohan');
    await page.waitForFunction(() => {
        const elements = document.querySelectorAll('.MuiTableRow-root.css-fmepe5');
        return elements.length === 1;
    });
    await page.locator('[data-testid="MoreVerticalRegularIcon"]').click();
    await page.locator('text="Dismiss Lead"').click();
    await page.locator('text="Dismiss"').click();
    await expect(page.locator('text="Lead dismissed!"')).toBeVisible();
});
