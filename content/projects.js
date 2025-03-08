import { loadComponentByTag, setHeaderPaths } from '../components/header.js';
import { animateSignature } from '../components/footer.js';

document.addEventListener("DOMContentLoaded", () => {
    Promise.all([
        loadComponentByTag("header", "../components/header.html"),
        loadComponentByTag("footer", "../components/footer.html"),
        setHeaderPaths("./paths.json")
    ]).then(() => {
        animateSignature();

    /*
        carrega os projetos a partir dos arquivos .json
    */
        const left_page = document.querySelector(".page#left");
        const right_page = document.querySelector(".page#right");
        let index = 1;

        function loadProjects(i) {
            fetch(`./projects-json/${i}.json`)
                .then(response => {
                    if(!response.ok) throw new Error(`O arquivo "content/projects-json/${i}.json" não foi encontrado.`);

                    return response.json();
                })
                .then(data => {
                    const new_section = document.createElement("section");
                    new_section.id = data.type;
                    // released:   o projeto possui uma versão de lançamento e
                    //             está sendo desenvolvido;
                    // working-on: o projeto não possui uma versão de lançamento,
                    //             mas está sendo desenvolvido;
                    // to-do:      o projeto não possui uma versão de lançamento
                    //             e não está sendo desenvolvido; e
                    // archived:   o projeto possui uma versão de lançamento,
                    //             mas não está sendo desenvolvido.

                    const title = document.createElement("h2");
                    title.textContent = data.title;

                    if(data.is_hot){
                        const img = document.createElement("img");
                        img.classList.add("HOT");

                        img.src = "../assets/HOT.png";
                        
                        title.appendChild(img);
                    }

                    const link = document.createElement("a");
                    link.href = data.link;
                    link.appendChild(title);
                    link.target = "_blank";

                    new_section.appendChild(link);

                    const description = document.createElement("p");
                    description.textContent = data.description;
                    new_section.appendChild(description);

                    if(i % 2 === 0){ // se par, página direita
                        right_page.appendChild(new_section);
                    }else{ // se ímpar, página esquerda
                        left_page.appendChild(new_section);
                    }

                    setTimeout(() => {
                        loadProjects(i + 1); // carrega o próximo projeto
                    }, 100); // aguarda 1/10 de segundo
                    
                })
                .catch(() => console.log(`Fim da lista de projetos no ${i}º elemento.`));
        }

        loadProjects(index); // inicia o carregamento dos projetos
    /*

    */
    })
});