document.addEventListener("DOMContentLoaded", () => {
/*
    função para animar a assinatura "Yumiowari" no rodapé da página
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
});
