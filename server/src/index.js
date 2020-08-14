import express from 'express';
import puppeteer from 'puppeteer';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PythonShell } from 'python-shell';

const port = 3001;

const app = express();

// cors
app.use(cors());

// parse application/json
app.use(bodyParser.json());

app.post('/', async (req, res) => {
  try {
    let { url } = req.body;
    const { messageLog } = req.body;

    if (!url.includes('http')) {
      url = `https://${url}?koji-screenshot=1`;
    } else {
      url = `${url}?koji-screenshot=1`;
    }

    const browser = await puppeteer.launch({
      headless: true,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    // Set the user agent in case the app being screenshotted wants to use it
    // to show us something different
    const userAgent = await browser.userAgent();
    await page.setUserAgent(`${userAgent} KojiCrawler`);

    // Set the page viewport to be square and retina
    await page.setViewport({
      width: 1200,
      height: 1200,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });

    await page.goto(url);

    await page.evaluate((messages) => {
      messages.forEach((message) => {
        postMessage(message, '*');
      });
    }, messageLog);

    await new Promise((resolve) => setTimeout(() => resolve(), 1000));

    await page.screenshot({
      path: path.join(__dirname, 'example.jpg'),
      type: 'jpeg',
      quality: 100,
    });

    await browser.close();

    PythonShell.run(
      path.join(__dirname, 'script1.py'),
      {
        args: [__dirname],
      },
      (err) => {
        if (err) throw err;
      },
    );

    res.sendFile(path.join(__dirname, 'output.png'));
  } catch (err) {
    console.log('err', err);
    res.json(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
