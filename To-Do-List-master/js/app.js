// CODE EXPLAINED channel

//selectionner l'élément
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//class
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST = [],
  id = 0;

//get item <- localstorage
let data = localStorage.getItem("TODO");

console.log(data);

// check si data n'est pas vide
if (localStorage.length > 0) {
  LIST = JSON.parse(data) || [];
  id = LIST.length; // set the id to the last one in the list
  loadList(LIST); //load the list to the user interface
// } else {
//   //si data est vide
//   LIST = [];
//   id = 0;
}

//load item to the user's interface
function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

//clear localstorage
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

//la date
const option = { weekday: "long", month: "long", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("fr-UE", option);

//fonction to do
function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";
  const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>
                    `;

  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

// Ajouter l'écouteur d'événement
document.addEventListener("keydown", (event) => {
  // Vérifier si la touche pressée est "Entrée"
  if (event.key === "Enter") {
    // Exécuter le code à exécuter lorsque la touche "Entrée" est pressée
    const toDo = input.value;
    //si  la valeur d'input n'est pas empty
    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });
      //add item -> localstorage (must be added everywhere the LIST array is updated)
      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }
    input.value = "";
  }
});

//bouton validé
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}
// supprimer une tâche
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

//target the items created dynamically

list.addEventListener("click", function (event) {
  const element = event.target; // retourne l'élément cliqué dans list
  const elementJob = element.attributes.job.value; // fini ou supprimer

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }

  //add item -> localstorage (must be added everywhere the LIST array is updated)
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
