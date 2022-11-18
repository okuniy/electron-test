const puppeteer = require("puppeteer-core");

const searchKeyword = process.argv.slice(2).join(" ") || 'google it';

const button = document.getElementById('button');

button.addEventListener('click', async () => {
  const launchChrome = puppeteer.launch({
    // MacにインストールされているChromeを使う。
    channel: 'chrome',
    // ブラウザ画面を表示しながら（ヘッドレスモードを無効にする）。
    headless: false,

    args: [
      // ゲストセッションで操作する。
      "--guest",

      // ウインドウサイズをデフォルトより大きめに。
      '--window-size=1280,800',
    ],

    // 人間味のある速度で入力/操作する。
    slowMo: 50,

    devtools: true

  });

  launchChrome.then(async (browser) => {
    // 大抵のサンプルコードはここで単純に browser.newPage() しているだけのものが多いが、
    // ブラウザを開いたときにすでに１つタブが開いている場合には、２つ目のタブが開いてしまう。
    // それを防ぐため、すでにタブが開いている場合にはそれを使うようにする。
    const page = (await browser.pages())[0] || (await browser.newPage());

    await page.setViewport({ width: 1280, height: 800 });

    //    await page.goto("https://www.google.co.jp");
    await page.goto("https://duckduckgo.com/");


    await page.waitFor(100);

    debugger;
    //await page.click('input[id="gbqfbb"]');

    // 検索boxに`puppeteer`を入力
    await page.type('input[name="q"]', 'puppeteer');
    // 「Enter」ボタン押下
    await page.keyboard.press('Enter');

  })





});