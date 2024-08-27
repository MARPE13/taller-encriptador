function encriptar(traduccion) {
    resetWarning();
    const textarea = document.querySelector("#texto");
    const texto = textarea.value;
    
    if (!validarTexto(texto)) return;

    let out = "";
    for (let i = 0; i < texto.length; i++) {
        const charLower = texto[i].toLowerCase();
        switch (charLower) {
            case 'a':
            case 'e':
            case 'i':
            case 'o':
            case 'u':
                out += mantenerMayusculas(texto[i], traduccion[charLower]);
                break;
            default:
                out += texto[i];
        }
    }

    mostrarResultado(out);
}

function desencriptar(traduccion) {
    resetWarning();
    const textarea = document.querySelector("#texto");
    let texto = textarea.value;

    if (!validarTexto(texto)) return;

    for (let [key, value] of Object.entries(traduccion)) {
        const regex = new RegExp(value, "gi");
        texto = texto.replace(regex, match => mantenerMayusculas(match, key));
    }

    mostrarResultado(texto);
}

function clipboard() {
    const texto_out = document.querySelector("#texto_out").textContent;
    navigator.clipboard.writeText(texto_out).then(() => {
        alert("Texto copiado al portapapeles");
    });
}

function validarTexto(texto) {
    if (texto === "" || texto.replace(/ /g, "") === "") {
        toggleAreas(true);
        return false;
    }

    if (/[^a-zA-Z ]/.test(texto)) {
        mostrarAdvertencia();
        return false;
    }

    return true;
}

function mostrarAdvertencia() {
    const warning = document.querySelector("#warning");
    warning.style.color = "red";
    warning.style.fontSize = "16px";
}

function resetWarning() {
    document.querySelector("#warning").removeAttribute("style");
}

function toggleAreas(showDefault) {
    const area_default = document.querySelector("#default");
    const area_result = document.querySelector("#result");
    if (showDefault) {
        area_default.classList.remove("invisible");
        area_result.classList.add("invisible");
    } else {
        area_default.classList.add("invisible");
        area_result.classList.remove("invisible");
    }
}

function mostrarResultado(texto) {
    toggleAreas(false);
    document.querySelector("#texto_out").textContent = texto;
}

function mantenerMayusculas(original, nuevo) {
    if (original === original.toUpperCase()) {
        return nuevo.toUpperCase();
    }
    return nuevo;
}

function borrarTexto() {
    document.querySelector("#texto").value = "";
    resetWarning();
    toggleAreas(true);
}

const traduccion = { "a": "ai", "e": "enter", "i": "imes", "o": "ober", "u": "ufat" };

document.querySelector('#enc').addEventListener('click', () => encriptar(traduccion));
document.querySelector('#des').addEventListener('click', () => desencriptar(traduccion));
document.querySelector('#copiar').addEventListener('click', clipboard);
document.querySelector('#borrar').addEventListener('click', () => borrarTexto(traduccion));
