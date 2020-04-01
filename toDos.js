var listElement = document.querySelector("#app ul");
var inputElement = document.querySelector("#app input");
var buttonElement = document.querySelector("#app button");

var toDos = JSON.parse(localStorage.getItem('listToDos')) || [];

function renderToDos() {
    listElement.innerHTML = '';
    for(toDo of toDos){
        var toDoElement = document.createElement('li');
        var toDoText = document.createTextNode(toDo + ' | ');

        var linkElement = document.createElement('a');

        linkElement.setAttribute("href", "#")

        var position = toDos.indexOf(toDo);
        linkElement.setAttribute('onclick', 'deleteToDo('+ position +')');

        var linkText = document.createTextNode('Excluir');
        
        linkElement.appendChild(linkText);

        toDoElement.appendChild(toDoText);
        toDoElement.appendChild(linkElement);

        listElement.appendChild(toDoElement);

        
    }
}

renderToDos();

function addToDo(){
    if(inputElement.value !== ''){
        var toDosText = inputElement.value;

    toDos.push(toDosText);
    inputElement.value = '';

    renderToDos();
    saveToStorage();
    }
}

buttonElement.onclick = addToDo;

inputElement.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        buttonElement.click();
    }
});
// buttonElement.addEventListener("keyup", function(event){
//     if(event.keyCode === 13){
//         event.preventDefault();
//         buttonElement.click();
//     }
// }                  

function deleteToDo(position){
    toDos.splice(position, 1);
    renderToDos();
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('listToDos', JSON.stringify(toDos));
}