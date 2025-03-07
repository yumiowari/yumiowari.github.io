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

            const matching_link = data.find(item => item.text === link_text);

            if(matching_link){
                link.setAttribute('href', matching_link.path);
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
        loadComponentByTag("header", "./components/header.html"),
        loadComponentByTag("footer", "./components/footer.html"),
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
            clearInterval(interval);               // interrompe a animação e
            signature.textContent = original_text; // restaura o texto original
        });
    /*

    */
    })
/*

*/
});
