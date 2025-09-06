import { loadComponentByTag } from '../core.js';
import { setHeaderPaths } from '../components/header.js';
import { animateSignature, setFooterPaths } from '../components/footer.js';

Promise.all([
    loadComponentByTag('header', '../components/header.html')
        .then(() => setHeaderPaths('./paths.json')),
    loadComponentByTag('footer', '../components/footer.html')
        .then(() => setFooterPaths('./paths.json'))
]).then(() => {
    animateSignature();
    loadProjects('./projects.json');
})