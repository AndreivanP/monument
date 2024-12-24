import { Locator, Page } from '@playwright/test';

export class AddLeadFormPage {
  readonly page: Page;
  readonly addLeadButton: Locator;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly emailField: Locator;
  readonly searchField: Locator;
  readonly selectFacilityButton: Locator;
  readonly selectUnitGroupButton: Locator;
  readonly deselectUnitButton: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addLeadButton = page.locator('#main-container').getByText('Add Lead');
    this.firstNameField = page.locator('[name="person.firstName"]');
    this.lastNameField = page.locator('[name="person.lastName"]');
    this.emailField = page.locator('[name="person.email"]');
    this.searchField = page.locator('[name="search"]');
    this.selectFacilityButton = page.locator('[id^="select-facility-btn"]');
    this.selectUnitGroupButton = page.locator('[data-testid="row-0"] >> text="Select"').first();
    this.deselectUnitButton = page.locator('button:has-text("Selected")').last();
    this.submitButton = page.locator('button[type="submit"]');
  }

  async openAddLeadForm() {
    await this.addLeadButton.click();
  }

  async fillLeadDetails(firstName: string, lastName: string, email: string) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.emailField.fill(email);
  }

  async searchFacility(facilityName: string) {
    await this.searchField.fill(facilityName);
    await this.page.waitForFunction(() => {
      const elements = document.querySelectorAll('.MuiTableRow-root.css-fmepe5');
      return elements.length === 1;
    });
  }

  async selectFacility() {
    await this.selectFacilityButton.click();
  }

  async selectUnitGroup() {
    await this.selectUnitGroupButton.click();
  }

  async deselectDefaultUnit() {
    await this.deselectUnitButton.click();
  }

  async saveForm() {
    await this.submitButton.click();
  }
}