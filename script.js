document.addEventListener("DOMContentLoaded", () => {
    const signature = document.getElementById("signature");
    const originalText = signature.textContent;
    let interval;

    signature.addEventListener("mouseover", () => {
        let currentText = originalText;
        let index = 0;

        interval = setInterval(() => {
            currentText = currentText.slice(-1) + currentText.slice(0, -1); // "rotaciona" o texto
            signature.textContent = currentText;
            index++;

            if(index >= originalText.length)index = 0;
        }, 200); // tempo entre os frames (em milissegundos)
    });

    signature.addEventListener("mouseout", () => {
        clearInterval(interval); // interrompe a animação
        signature.textContent = originalText; // restaura o texto original
    });
});
