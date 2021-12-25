function print(input, output) {
    const promptElement = document.getElementById("prompt");
    document.getElementById("input").value = "";
    let inputElement = `<div class="line">
        <span class="prompt">&gt;</span>
        <span>${input}</span>
    </div>`;
    promptElement.insertAdjacentHTML('beforebegin', inputElement);
    if (output !== "") {
        let outputElement = `<div class="line">
        <span class="prompt">&lt;</span>
        <span>${output}</span>
    </div>`;
        promptElement.insertAdjacentHTML('beforebegin', outputElement);
    }
    document.getElementById("input").focus();
    document.getElementById("input").scrollIntoView();
}
