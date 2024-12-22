import { expect, Locator, Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly targetRegularIcon: Locator;
  readonly leadCreatedMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.targetRegularIcon = page.locator('[data-testid="TargetRegularIcon"]');
    this.leadCreatedMessage = page.locator('text="Lead created!"');
  }

  async clickTargetRegularIcon() {
    await this.targetRegularIcon.click();
  }

  async assertLeadCreated(leadFirstName: string, leadLastName: string) {
    await expect(this.leadCreatedMessage).toBeVisible();
    await expect(this.page.locator(`text="${leadFirstName + ' ' + leadLastName}"`)).toBeVisible();
  }
}