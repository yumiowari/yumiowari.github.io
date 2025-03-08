import { loadComponentByTag, setHeaderPaths } from '../components/header.js';
import { animateSignature } from '../components/footer.js';

async function loadProjects(path){
// carrega os projetos a partir do arquivo .json

    const left_page = document.querySelector(".page#left");
    const right_page = document.querySelector(".page#right");

    let index = 1;

    try{
        const response = await fetch(path);
        const projects = await response.json();

        projects.forEach(project => {
            const new_section = document.createElement("section");
            new_section.id = project.type;
            // released:   o projeto possui uma versão de lançamento e
            //             está sendo desenvolvido;
            // working-on: o projeto não possui uma versão de lançamento,
            //             mas está sendo desenvolvido;
            // to-do:      o projeto não possui uma versão de lançamento
            //             e não está sendo desenvolvido; e
            // archived:   o projeto possui uma versão de lançamento,
            //             mas não está sendo desenvolvido.

            const title = document.createElement("h2");
            title.textContent = project.title;

            if(project.hot){
                const img = document.createElement("img");
                img.classList.add("hot");

                img.src = "../assets/hot.png";
                        
                title.appendChild(img);
            }

            const link = document.createElement("a");
            link.href = project.link;
            link.appendChild(title);
            link.target = "_blank";

            new_section.appendChild(link);

            const description = document.createElement("p");
            description.textContent = project.description;
            new_section.appendChild(description);

            if(index % 2 === 0){ // se par, página direita
                right_page.appendChild(new_section);
            }else{ // se ímpar, página esquerda
                left_page.appendChild(new_section);
            }

            index++;
        });
    }catch(error){
        return console.error("Falha ao carregar os projetos:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    Promise.all([
        loadComponentByTag("header", "../components/header.html"),
        loadComponentByTag("footer", "../components/footer.html"),
        setHeaderPaths("./paths.json")
    ]).then(() => {
        animateSignature();

        setTimeout(() => {
            loadProjects("./projects.json"); // carrega o próximo projeto
        }, 100); // aguarda 1/10 de segundo
    })
});