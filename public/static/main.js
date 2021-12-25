let version = "v0.1.1";
let promptElement = undefined;
let inputElement = undefined;
let connection = undefined;
let nickname = "";

window.addEventListener('load', () => {
    inputElement = document.getElementById("input");
    promptElement = document.getElementById("prompt");
    printBanner();

    let protocol = "ws://";
    if (location.protocol !== "http:") {
        protocol = "wss://"
    }
    connection = new WebSocket(protocol + document.location.host + "/ws");
    if (!connection) {
        print("", "system: failed to initialize connection.");
    }
    connection.onopen = function (e) {
        // print("", "system: connected to server.");
    };
    connection.onclose = function (e) {
        print("", "system: connection closed.");
    };
    connection.onerror = function (e) {
        console.error(e);
        print("", `system: error happened.`);
    };
    connection.onmessage = function (e) {
        if (nickname === "" || !e.data.startsWith(nickname)) {
            print("", e.data, false);
        }
    }
})

function printBanner() {
    print("", `Go Text ${version} on ${navigator.userAgent}`);
    print("", `Type "help", "copyright", "repository" or "license" for more information.`);
}

function processInput(input) {
    if (input === "") input = " ";
    print(input, "");
    let cmd = input.split(' ')[0];
    switch (cmd) {
        case "help":
            print("", `help: print help information.`)
            print("", `nickname: set nickname.`)
            print("", `copyright: print copyright information.`)
            print("", `repository: show repository url.`)
            print("", `license: print license information.`)
            break
        case "copyright":
            print("", `Copyright (c) 2021 JustSong.`)
            print("", "All Rights Reserved.")
            break
        case "repository":
            print("", `See <a href="https://github.com/songquanpeng/go-text">https://github.com/songquanpeng/go-text</a>`)
            break
        case "license":
            print("", `See <a href="https://github.com/songquanpeng/go-text/blob/master/LICENSE">https://github.com/songquanpeng/go-text/blob/master/LICENSE</a>`)
            break
        case "nickname":
            nickname = input.slice(8).trim();
            print("", `system: nickname set to ${nickname}.`)
            break
        default:
            send(input);
    }

}


function send(message) {
    if (nickname !== "") {
        connection.send(`${nickname}: ${message}`);
    } else {
        connection.send(`${message}`);
    }
}


function print(input, output, clearInput = true) {
    if (clearInput) {
        inputElement.value = "";
    }
    if (input !== "") {
        let inputElement = `<div class="line">
        <span class="prompt">&gt;&gt;&gt;</span>
        <span>${input}</span>
    </div>`;
        promptElement.insertAdjacentHTML('beforebegin', inputElement);
    }
    // <!--        <span class="prompt">&lt;</span>-->
    // <!--        <span class="prompt">&nbsp;</span>-->
    if (output !== "") {
        let outputElement = `<div class="line">
        <span>${output}</span>
    </div>`;
        promptElement.insertAdjacentHTML('beforebegin', outputElement);
    }
    inputElement.focus();
    inputElement.scrollIntoView();
}
