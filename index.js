const {Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const by = require('selenium-webdriver/lib/by');

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
        await driver.findElements(By.xpath('//a[descendant::h3]'))
        .then(async items =>
        {
            for(const item of items)
            {
                
                await item.getText().then(text => console.log(text));
                await item.getAttribute('href').then(href => console.log(href));
            }
        })
        await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    } 
    finally 
    {
        await driver.quit();
    }
})();