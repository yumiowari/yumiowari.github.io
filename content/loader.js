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
});

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    const colors = ['#ec1f26', '#29cc49', '#2185a6'];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    loader.style.setProperty('--loader-color', randomColor);
    
    loader.classList.add("loader-hidden");

    loader.addEventListener("transitionend", () => {
        document.body.removeChild("loader");
    })
});