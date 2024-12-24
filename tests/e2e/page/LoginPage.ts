import { Locator, Page, expect } from '@playwright/test'
import getSetUp from '../../../test.config';

const setUp = getSetUp();

export class LoginPage {
  readonly page: Page
  readonly username: Locator
  readonly password: Locator
  readonly btnLogin: Locator
  readonly validateLogin: Locator


  constructor(page: Page) {
    this.page = page
    this.username = page.locator('[data-testid="email-input"]');
    this.password = page.locator('[data-testid="password-input"]');
    this.btnLogin = page.locator('text="Sign In"');
    this.validateLogin = page.locator('text="Economic Occupancy"');

  }

  async goto() {
    await this.page.goto(`${setUp.baseURLStgUI}/login`)
  }

  async performLoginUI(username: string, password: string) {
    this.goto();
    await this.username.fill(username)
    await this.password.fill(password)
    await this.btnLogin.click()
    await expect(this.validateLogin).toBeVisible({ timeout: 35000 });
  }

}
