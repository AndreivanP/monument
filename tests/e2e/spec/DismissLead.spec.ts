import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../page/LoginPage';
import { DismissLeadPage } from '../page/DismissLeadPage';
import { DismissLeadFormPage } from '../page/DismissLeadFormPage';
import { AddLead } from '../../api/utils/addLead';

test.beforeEach(async ({ context, page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.performLoginUI(process.env.USERNAME, process.env.PASSWORD);
});

const leadFirstName = faker.person.firstName();
const leadLastName = faker.person.lastName();
const leadEmail = faker.internet.email();

test.beforeEach(async () => {
  await AddLead(leadFirstName, leadLastName, leadEmail);
});

test('Dismiss Not Responsive Lead', async ({ page }) => {
  const dismissLeadPage = new DismissLeadPage(page);
  const dismissLeadFormPage = new DismissLeadFormPage(page);

  await dismissLeadPage.searchLead(`${leadFirstName} ${leadLastName}`);
  await dismissLeadPage.openDismissLeadForm();
  await dismissLeadFormPage.dismissLead();
  await dismissLeadFormPage.assertLeadDismissed();
});

test('Dismiss a Lead due No Longer Needs Storage reason', async ({ page }) => {
  const dismissLeadPage = new DismissLeadPage(page);
  const dismissLeadFormPage = new DismissLeadFormPage(page);

  await dismissLeadPage.searchLead(`${leadFirstName} ${leadLastName}`);
  await dismissLeadPage.openDismissLeadForm();
  await dismissLeadFormPage.selectDismissReason(1);
  await dismissLeadFormPage.dismissLead();
  await dismissLeadFormPage.assertLeadDismissed();
});

test('Dismiss a Lead due Rented at Another Facility reason', async ({ page }) => {
  const dismissLeadPage = new DismissLeadPage(page);
  const dismissLeadFormPage = new DismissLeadFormPage(page);

  await dismissLeadPage.searchLead(`${leadFirstName} ${leadLastName}`);
  await dismissLeadPage.openDismissLeadForm();
  await dismissLeadFormPage.selectDismissReason(2);
  await dismissLeadFormPage.dismissLead();
  await dismissLeadFormPage.assertLeadDismissed();
});

test('Dismiss a Lead due Other reason', async ({ page }) => {
  const dismissLeadPage = new DismissLeadPage(page);
  const dismissLeadFormPage = new DismissLeadFormPage(page);

  await dismissLeadPage.searchLead(`${leadFirstName} ${leadLastName}`);
  await dismissLeadPage.openDismissLeadForm();
  await dismissLeadFormPage.selectDismissReason(3);
  await dismissLeadFormPage.dismissLead();
  await dismissLeadFormPage.assertLeadDismissed();
});
