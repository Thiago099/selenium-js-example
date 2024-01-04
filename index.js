const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

(async function example() {
  let driver = await new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(
      new firefox.Options()
        .headless()
        .windowSize({ width: 1920, height: 1080 })
    )
    .build();

  try {
    await driver.get('http://www.google.com/ncr');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);

    const items = await driver.findElements(By.xpath('//a[descendant::h3]'));
    for (const item of items) {
      const text = await item.getText();
      const href = await item.getAttribute('href');
      console.log(text);
      console.log(href);
    }

    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  } finally {
    await driver.quit();
  }
})();
