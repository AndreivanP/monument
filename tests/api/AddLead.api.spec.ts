import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddLead } from '../api/utils/AddLead';


const leadFirstName = faker.person.firstName();
const leadLastName = faker.person.lastName();
const leadEmail = faker.internet.email()

test('Add a Lead with an Unit', async ({ }) => {
  const leadResponse = await AddLead(leadFirstName, leadLastName, leadEmail);
  console.log('Response Lead Name:', leadResponse.primaryPerson.firstName + ' ' + leadResponse.primaryPerson.lastName);

  expect(leadResponse.primaryPerson.firstName).toBe(leadFirstName);
  expect(leadResponse.primaryPerson.lastName).toBe(leadLastName);
  expect(leadResponse.primaryPerson.email).toBe(leadEmail);
});