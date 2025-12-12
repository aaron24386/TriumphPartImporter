import { exportBasket } from '@src/exporter';
console.log('getting here');
import { messageListener } from '@src/importer';

console.log('content script loaded - exporter');

const currentUrl = window.location.href;
const lizzyRegex = /lizzy[1-9]\.nizex\.com/;

if (currentUrl.includes('triumphonline.net')) {
  exportBasket();
} else if (lizzyRegex.test(currentUrl)) {
  messageListener;
}

// TODO: check if webpage is lizzy if so add listener for onMessage
