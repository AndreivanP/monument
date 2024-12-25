import { Locator, Page } from '@playwright/test';

export class DismissLeadPage {
  readonly page: Page;
  readonly targetRegularIcon: Locator;
  readonly fullNameField: Locator;
  readonly moreVerticalIcon: Locator;
  readonly dismissLeadButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.targetRegularIcon = page.locator('[data-testid="TargetRegularIcon"]');
    this.fullNameField = page.locator('[name="fullName"]');
    this.moreVerticalIcon = page.locator('[data-testid="MoreVerticalRegularIcon"]');
    this.dismissLeadButton = page.locator('text="Dismiss Lead"');
  }

  async searchLead(fullName: string) {
    await this.targetRegularIcon.click();
    await this.page.waitForFunction(() => {
      const elements = document.querySelectorAll('.MuiTableRow-root.css-fmepe5');
      return elements.length >= 1;
    });
    
    await this.fullNameField.fill(fullName);
    await this.page.waitForFunction(() => {
      const elements = document.querySelectorAll('.MuiTableRow-root.css-fmepe5');
      return elements.length === 1;
    });
  }

  async openDismissLeadForm() {
    await this.moreVerticalIcon.click();
    await this.dismissLeadButton.click();
  }
}




