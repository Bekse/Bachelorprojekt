import {browser,by,element} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText();
  }

  getLoginButton() {
    return element(by.css('[routerlink="login"]'));
  }
  getRegisterButton() {
    return element(by.css('[routerlink="register"]'));
  }

  getLoginTitle() {
    return element(by.css('app-login mat-card-title')).getText();
  }
  getRegisterTitle() {
    return element(by.css('app-register mat-card-title')).getText();
  }
  getComponentButton() {
    return element(by.buttonText('Components'));
  }

  setLoginData() {
    var auid = element(by.name('AuId'));
    var password = element(by.name('Password'));
    auid.sendKeys("auAdmin");
    password.sendKeys("test");
  }
}
