export async function setFooterPaths(path){
    // define os caminhos específicos para cada nível de diretório
    
        try{
            const response = await fetch(path);
            const data = await response.json();
    
            // footer stylesheet
            const stylesheet = document.querySelector('footer link'); 
    
            const matching_stylesheet = data.find(item => item.id === 'footer_stylesheet');
    
            stylesheet.setAttribute('href', matching_stylesheet.path);
            //
        }catch(error){
            return console.error('Falha ao definir os caminhos do rodapé:', error);
        }
    }

export function animateSignature(){
// anima a assinatura "Yumiowari" no rodapé

    const signature = document.getElementById('signature');
    const original_text = signature.textContent;
    let interval;

    signature.addEventListener('mouseover', () => {
        let current_text = original_text;
        let index = 0;

        interval = setInterval(() => {
            current_text = current_text.slice(-1) + current_text.slice(0, -1); // "rotaciona" o texto
            signature.textContent = current_text;
            index++;

            if(index >= original_text.length)index = 0;
        }, 200); // tempo entre os frames (200ms)
    });

    signature.addEventListener('mouseout', () => {
        clearInterval(interval);               // interrompe a animação e
        signature.textContent = original_text; // restaura o texto original
    });
}