const { test, expect, request } = require('@playwright/test');
import { AddLead } from './utils/addLead';
import { DismissLead } from './utils/dismissLead';
import { faker } from '@faker-js/faker';

const leadFirstName = faker.person.firstName();
const leadLastName = faker.person.lastName();
const leadEmail = faker.internet.email();

let addLeadResponse: any = '';

test.beforeEach(async () => {
  addLeadResponse = await AddLead(leadFirstName, leadLastName, leadEmail);
});

test('Dismiss a Not Responsive Lead', async () => {
  const { status } = await DismissLead(addLeadResponse.leadUuid, '33132f20-c1a3-11ef-a881-4782397ca885');

  // Perform validation on the status to make sure Lead is dismissed
  expect(status).toBe(200);
});

test('Dismiss a Lead due No Longer Needs Storage reason', async ({}) => {
  const { status } = await DismissLead(addLeadResponse.leadUuid, '33135630-c1a3-11ef-a881-4782397ca885');

  // Perform validation on the status to make sure Lead is dismissed
  expect(status).toBe(200);
});

test('Dismiss a Lead due Rented at Another Facility reason', async ({}) => {
  const { status } = await DismissLead(addLeadResponse.leadUuid, '33135631-c1a3-11ef-a881-4782397ca885');

  // Perform validation on the status to make sure Lead is dismissed
  expect(status).toBe(200);
});

test('Dismiss a Lead due Other reason', async ({}) => {
  const { status } = await DismissLead(addLeadResponse.leadUuid,'33135632-c1a3-11ef-a881-4782397ca885');

  // Perform validation on the status to make sure Lead is dismissed
  expect(status).toBe(200);
});

test('Try to dismiss a lead with invalid reason', async ({}) => {
  const { status } = await DismissLead(addLeadResponse.leadUuid,'23135632-c1a3-11ef-a881-4782397ca800');

  // Perform validation on the status to make sure Lead isn't dismissed
  expect(status).toBe(406);
});

test('Try to dismiss a non-existent lead', async ({}) => {
  const { status } = await DismissLead('33135632-c1a3-11ef-a881-4782397ca800','33135632-c1a3-11ef-a881-4782397ca885');

  // Perform validation on the status to make sure Lead isn't dismissed
  expect(status).toBe(404);
});