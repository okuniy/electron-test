import { BrowserWindow, app } from "electron";
import * as pie from "puppeteer-in-electron";
import * as puppeteer from "puppeteer-core";

const main = async () => {
  await pie.initialize(app);
  const browser = await pie.connect(app, puppeteer);

  const window = new BrowserWindow();
  const url = "https://www.google.co.jp";
  await window.loadURL(url);

  const page = await pie.getPage(browser, window);
  console.log(page.url());


  // 検索ワードを入力　以下の例では"Puppeteer"
  await page.type('input[title="検索"]', "goodle it!", { delay: 50 });

  //　検索ボタンをクリック
  await page.evaluate(() => {
    document.querySelector('input[value^="Google"]').click();
  });

  // ページ遷移を待ちます。
  await page.waitForNavigation({ timeout: 600000, waitUntil: "domcontentloaded" });

  console.log('検索結果がブラウザに表示されました。');


};

main();