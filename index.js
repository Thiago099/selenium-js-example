const {Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

require('chromedriver');

(async function example() 
{
    let driver = await new Builder()
                        .forBrowser('chrome')
                        .setChromeOptions(
                            new chrome.Options()
                                .addArguments('--headless')
                                .addArguments('--no-sandbox')
                                .addArguments('--disable-gpu')
                                .addArguments('--window-size=1920,1080')
                        ).build();
    try 
    {
        await driver.get('http://www.google.com/ncr');
        await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    } 
    finally 
    {
        await driver.quit();
    }
})();