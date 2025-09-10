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

export function hideLoadScreen(){
    const loader = document.querySelector(".loader");

    const colors = ['#ec1f26', '#29cc49', '#2185a6'];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    loader.style.setProperty('--loader-color', randomColor);
    
    loader.classList.add("loader-hidden");

    loader.addEventListener("transitionend", () => {
        document.body.removeChild("loader");
    })
}