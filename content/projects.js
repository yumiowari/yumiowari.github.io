async function loadComponentByTag(tag, path){
    try{
        const response = await fetch(path);
        const data = await response.text();
        const element = document.querySelector(tag);

        if(element)element.outerHTML = data;
    }catch(error){
        return console.error(`Falha ao carregar ${path}:`, error);
    }
}

async function setHeaderPaths(path){
    try{
        const response = await fetch(path);
        const data = await response.json(); // carrega o arquivo JSON

        const links = document.querySelectorAll("header nav ul li a"); // seleciona todos os links
    
        links.forEach(link => {
        // define os caminhos dos links

            const link_text = link.textContent.trim();

            const match = data.find(item => item.text === link_text);

            if(match){
                link.setAttribute('href', match.path);
            }
        })

        // define o caminho da logo
        const logo = document.querySelector("header a img")

        const match = data.find(item => item.text === "Logo");

        logo.setAttribute('src', match.path);
        //
    }catch(error){
        return console.error("Falha ao definir os caminhos da barra de navegação:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
/*
    carrega os componentes predefinidos da página
*/
Promise.all([
    loadComponentByTag("header", "../components/header.html"),
    loadComponentByTag("footer", "../components/footer.html"),
    setHeaderPaths("./paths.json")
]).then(() => {
    /*
        anima a assinatura "Yumiowari" no rodapé da página
    */
        const signature = document.getElementById("signature");
        const original_text = signature.textContent;
        let interval;

        signature.addEventListener("mouseover", () => {
            let current_text = original_text;
            let index = 0;

            interval = setInterval(() => {
                current_text = current_text.slice(-1) + current_text.slice(0, -1); // "rotaciona" o texto
                signature.textContent = current_text;
                index++;

                if(index >= original_text.length)index = 0;
            }, 200); // tempo entre os frames (em milissegundos)
        });

        signature.addEventListener("mouseout", () => {
            clearInterval(interval); // interrompe a animação
            signature.textContent = original_text; // restaura o texto original
        });
    /*

    */



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
/*

*/
});