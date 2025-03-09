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