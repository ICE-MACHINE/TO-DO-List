"use strict";
(function () {
    document.title = "To Do List";
    let textTask = document.querySelector("#text");
    let addTaskButton = document.querySelector("#submit");
    let containerTask = document.querySelector(".container");
    let emptyMessage = document.querySelector(".message");
    function emptyInput() {
        return textTask.value.trim() === "";
    }
    let arrayInfo = [];
    if (localStorage.getItem("tasks") !== null) {
        const tasks = localStorage.getItem("tasks");
        if (tasks) {
            arrayInfo = JSON.parse(tasks);
        }
    }
    addTaskButton.addEventListener("click", (event) => {
        event.preventDefault();
        if (!emptyInput()) {
            arrayInfo.push(textTask.value.trim());
            localStorage.setItem("tasks", JSON.stringify(arrayInfo));
            pushToContainer();
            sessionStorage.clear();
        }
        else {
            emptyMessage.classList.remove("empty");
        }
        textTask.value = "";
        textTask.focus();
    });
    textTask.oninput = function () {
        if (!emptyInput()) {
            emptyMessage.classList.add("empty");
            sessionStorage.setItem("textTask", textTask.value);
        }
        else {
            sessionStorage.removeItem("textTask");
        }
    };
    function getText() {
        const savedText = sessionStorage.getItem("textTask");
        if (savedText) {
            textTask.value = savedText;
        }
    }
    function pushToContainer() {
        if (arrayInfo.length === 0) {
            containerTask.innerHTML = `<p>There is no task.</p>`;
            return;
        }
        let tab = `
    <table id="table">
    <tr> 
    <th> ID </th>
    <th> TEXT </th>
    <th> DELETE </th>
    </tr>
    </table>
    `;
        containerTask.innerHTML = tab;
        let table = document.querySelector("#table");
        let id = 0;
        arrayInfo.forEach(element => {
            table.innerHTML += `
        <tr> 
        <td> ${++id} </td>
        <td> ${element} </td>
        <td> <button class="delete-btn" onclick="deleteTask(${id - 1})">DELETE</button> </td>
        </tr>
        `;
        });
        table.innerHTML += `
    <tfoot>
        <tr>
            <td colspan="3">
                <button id="clear-all-btn">Clear All</button>
            </td>
        </tr>
    </tfoot>
    `;
        const clearAllButton = document.querySelector("#clear-all-btn");
        clearAllButton.addEventListener("click", () => {
            arrayInfo = [];
            localStorage.removeItem("tasks");
            table.innerHTML = "";
            pushToContainer();
        });
    }
    function deleteTask(index) {
        arrayInfo.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(arrayInfo));
        document.querySelector("#table").innerHTML = "";
        pushToContainer();
    }
    window.onload = () => {
        textTask.focus();
        getText();
        pushToContainer();
    };
})();
//# sourceMappingURL=main.js.map