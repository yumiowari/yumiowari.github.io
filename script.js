import { loadComponentByTag, setHeaderPaths } from './components/header.js';
import { animateSignature } from './components/footer.js';

document.addEventListener("DOMContentLoaded", () => {
    Promise.all([
        loadComponentByTag("header", "./components/header.html"),
        loadComponentByTag("footer", "./components/footer.html"),
        setHeaderPaths("./paths.json")
    ]).then(() => {    
        animateSignature();
    })
});
