import { router } from './routes.js';

const main = document.getElementById("root")
window.addEventListener("popstate", router);
window.addEventListener("load", router)




