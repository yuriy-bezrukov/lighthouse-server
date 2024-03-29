import { IOptionsRun, ILighthouse } from "./models/Lighthouse";

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

export const lighthouseHelper = (url: string, opts: IOptionsRun, config = null): Promise<ILighthouse> => {
  return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results => {
      // use results.lhr for the JS-consumeable output
      // https://github.com/GoogleChrome/lighthouse/blob/master/types/lhr.d.ts
      // use results.report for the HTML/JSON/CSV output as a string
      // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
      return chrome.kill().then(() => results.lhr)
    });
  });
}