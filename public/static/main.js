let promptElement = undefined;
let inputElement = undefined;
let connection = undefined;
let prefix = ""

window.addEventListener('load', () => {
    inputElement = document.getElementById("input");
    promptElement = document.getElementById("prompt");
    document.addEventListener("mousedown", function (event) {
        console.log("mousedown")
        inputElement.focus();
    })

    connection = new WebSocket("ws://" + document.location.host + "/ws");
    connection.onopen = function (e) {
        print("", "system: connected to server.");
    };
    connection.onclose = function (e) {
        print("", "system: connection closed.");
    };
    connection.onerror = function (e) {
        console.error(e);
        print("", `system: error happened.`);
    };
    connection.onmessage = function (e) {
        console.log(e.data);
        print("", e.data);
    }
})

function processInput(input) {
    if (input === "") input = " ";
    print(input, "");
    if (input.startsWith("!")) {
        let cmd = input.split(' ')[0];
        switch (cmd) {
            case "!help":
                print("", `!help: print help information.`)
                print("", `!prefix: set prefix.`)
                break
            case "!prefix":
                prefix = input.slice(7).trim();
                print("", `system: prefix set to ${prefix}.`)
                break
            default:
                print("", `system: command "${cmd}" not found.`)
        }
    } else {
        send(input);
    }
}


function send(message) {
    if (prefix !== "") {
        connection.send(`${prefix}: ${message}`);
    } else {
        connection.send(`${message}`);
    }
}


function print(input, output) {
    inputElement.value = "";
    if (input !== "") {
        let inputElement = `<div class="line">
        <span class="prompt">&gt;</span>
        <span>${input}</span>
    </div>`;
        promptElement.insertAdjacentHTML('beforebegin', inputElement);
    }
    if (output !== "") {
        let outputElement = `<div class="line">
<!--        <span class="prompt">&lt;</span>-->
        <span class="prompt">&nbsp;</span>
        <span>${output}</span>
    </div>`;
        promptElement.insertAdjacentHTML('beforebegin', outputElement);
    }
    inputElement.focus();
    inputElement.scrollIntoView();
}
