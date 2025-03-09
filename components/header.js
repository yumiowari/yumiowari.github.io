export async function setHeaderPaths(path){
// define os caminhos específicos para cada nível de diretório

    try{
        const response = await fetch(path);
        const data = await response.json();

        // header stylesheet
        const stylesheet = document.querySelector('header link'); 

        const matching_stylesheet = data.find(item => item.id === 'header_stylesheet');

        stylesheet.setAttribute('href', matching_stylesheet.path);
        //

        // barra de navegação
        const anchors = document.querySelectorAll('header nav ul li a');
    
        anchors.forEach(anchor => {
            const matching_anchor = data.find(item => item.id === anchor.id);

            anchor.setAttribute('href', matching_anchor.path);
        })
        //

        // logotipo
        const logo = document.querySelector('header a img#logo')

        const matching_logo = data.find(item => item.id === 'logo');

        logo.setAttribute('src', matching_logo.path);
        //
    }catch(error){
        return console.error('Falha ao definir os caminhos da barra de navegação:', error);
    }
}