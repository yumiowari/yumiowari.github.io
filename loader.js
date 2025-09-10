import { loadComponentByTag, hideLoadScreen } from './core.js';
import { setHeaderPaths } from './components/header.js';
import { setFooterPaths, animateSignature } from './components/footer.js';

window.addEventListener("load", () => {
    Promise.all([
        loadComponentByTag('header', './components/header.html')
            .then(() => setHeaderPaths('./paths.json')),
        loadComponentByTag('footer', './components/footer.html')
            .then(() => setFooterPaths('./paths.json')),
    ]).then(() => {    
        animateSignature();
        hideLoadScreen();
    });
});