import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

  // Kilder https://www.protractortest.org/#/api?view=ElementArrayFinder.prototype.$$

describe('Front - Page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });



  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
        level: logging.Level.SEVERE,
      }as logging.Entry));
  });

  it('should display title: Embedded Stock', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Embedded Stock');
  });

  it('should display button: login', () => {
    page.navigateTo();
    expect(page.getLoginButton().getText()).toEqual('Login');
  });

  it('should route to login', () => {
    page.navigateTo();
    page.getLoginButton().click();
    expect(page.getLoginTitle()).toEqual('Please Login');
  });


  it('should display button: register', () => {
    page.navigateTo();
    expect(page.getRegisterButton().getText()).toEqual('Register');
  });

  it('should route to register', () => {
    page.navigateTo();
    page.getRegisterButton().click();
    expect(page.getRegisterTitle()).toEqual('Please Register');
  });


  it('should login', () => {
    page.navigateTo();
    page.getLoginButton().click();
    page.setLoginData();
    element(by.css('button[type = submit]')).click();
    browser.sleep(2000);
    let listOfButtons = element.all(by.css('.mat-button-wrapper'));
    expect(listOfButtons.get(5).getText()).toEqual('Logout');
  });

});
