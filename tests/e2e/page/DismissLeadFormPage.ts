import { expect, Locator, Page } from '@playwright/test';

export class DismissLeadFormPage {
  readonly page: Page;
  readonly reasonDropdown: Locator;
  readonly reasonOption: (reasonIndex: number) => Locator;
  readonly dismissButton: Locator;
  readonly dismissConfirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.reasonDropdown = page.locator('[data-testid="single-select-reason"]');
    this.reasonOption = (reasonIndex) =>
      page.locator(`[data-testid="single-select-item-reason-${reasonIndex}"]`);
    this.dismissButton = page.locator('text="Dismiss"');
    this.dismissConfirmationMessage = page.locator('text="Lead dismissed!"');
  }

  async selectDismissReason(reasonIndex: number) {
    await this.reasonDropdown.click();
    await this.reasonOption(reasonIndex).click();
  }

  async dismissLead() {
    await this.dismissButton.click();
  }

  async assertLeadDismissed() {
    await expect(this.dismissConfirmationMessage).toBeVisible();
  }
}
