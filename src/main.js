import { router } from './routes.js';

window.addEventListener('popstate', router);
window.addEventListener('load', router);
