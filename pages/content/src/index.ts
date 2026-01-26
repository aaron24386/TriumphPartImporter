import { exportBasket } from '@src/exporter';
import { addMessageListener } from '@src/importer';

console.log('content script loaded - exporter');

const currentUrl = window.location.href;
const lizzyRegex = /[a-zA-Z0-9]*?\.nizex\.com/;

if (currentUrl.includes('triumphonline.net')) {
  exportBasket();
} else if (lizzyRegex.test(currentUrl)) {
  addMessageListener();
}
