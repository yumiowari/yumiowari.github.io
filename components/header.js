export async function loadComponentByTag(tag, path){
// carrega os componentes predefinidos

    try{
        const response = await fetch(path);
        const data = await response.text();
        const element = document.querySelector(tag);

        if(element)element.outerHTML = data;
    }catch(error){
        return console.error(`Falha ao carregar ${path}:`, error);
    }
}

export async function setHeaderPaths(path){
// define os caminhos específicos para cada nível de diretório

    try{
        const response = await fetch(path);
        const data = await response.json();

        // barra de navegação
        const links = document.querySelectorAll("header nav ul li a");
    
        links.forEach(link => {
            const link_text = link.textContent.trim();

            const matching_link = data.find(item => item.text === link_text);

            if(matching_link){
                link.setAttribute('href', matching_link.path);
            }
        })
        //

        // logotipo
        const logo = document.querySelector("header a img")

        const match = data.find(item => item.text === "Logo");

        logo.setAttribute('src', match.path);
        //
    }catch(error){
        return console.error("Falha ao definir os caminhos da barra de navegação:", error);
    }
}