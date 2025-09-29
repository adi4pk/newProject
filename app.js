//todo:implement hide list
//todo:change description

//selectori
let btnHideList = document.querySelector("#toggleList");

let btnChangeDesc = document.querySelector("#change-list-desc");
let listContainer = document.querySelector("#purple-list");

let btnAddItem = document.querySelector(".addItemButton");

let btnMarkCheck = document.querySelector(".check-btn");
let btnFilterCheck = document.querySelector(".filter-button");


//functions

function appendErrorDescription() {
  let errorText = document.querySelector(".error");
  if (!errorText) {
    let pText = document.createElement("p");
    let containerList = document.querySelector(".list");
    pText.textContent = "Description text is required";
    pText.classList.add("error");

    containerList.insertBefore(pText, purpleList);
    let inputText = document.getElementById("input-box");
    inputText.classList.add("border-red");
  }
}

//function to remove error description
function removeErrorDescription() {
  let containerList = document.querySelector(".list");
  let error = document.querySelector(".error");

  containerList.removeChild(error);
  let inputText = document.getElementById("input-box");
  inputText.classList.remove("border-red");
}


//function to remove error2

function removeErrorAddItem(){
  let parentNode = document.querySelector(".list");

  let error2 = document.querySelector(".error2");
  parentNode.removeChild(error2);

}

//function to append Error description
function appendErrorAddItem(){
  let errorText = document.querySelector('.error2');

  if(!errorText){
    let errorMessage = document.createElement("p");
    let parentNode = document.querySelector('.list');

    errorMessage.textContent="text input is required";
    errorMessage.classList.add("error2");

    parentNode.appendChild(errorMessage);

  }

}


//functie ce creaza un card
function createCard(text) {
  let li = document.createElement("li");
  li.classList.add("unchecked", "element");

  li.innerHTML = `
     <p class="item">${text}</p>
          <button class="check-btn">Mark as checked</button><button class="up">Up</button><button class="down">Down</button><button class="remove">Remove</button>
`;

  return li;
}
//eventuri

btnHideList.addEventListener("click", () => {
  let containerList = document.querySelector(".list");
  containerList.classList.toggle("hide");
  if (containerList.classList.contains("hide")) {
    btnHideList.textContent = "Show List";
  } else {
    btnHideList.textContent = "Hide List";
  }
});

// input text --> change title

btnChangeDesc.addEventListener("click", () => {
  let inputText = document.getElementById("input-box");
  if (!(inputText.value.length == 0)) {
    if (document.querySelector(".error")) {
      removeErrorDescription();
    }
    let descriere = document.getElementById("desc-title");
    descriere.textContent = inputText.value;
    inputText.value = "";
  } else {
    appendErrorDescription();
  }
});

//add element to the list

btnAddItem.addEventListener("click", () => {
  let addItemInput=document.querySelector(".addItemInput");
  if(!(addItemInput.value == 0)){
      listContainer.appendChild(createCard(addItemInput.value));
      addItemInput.value="";
      if(document.querySelector(".error2")){
                removeErrorAddItem();
      }
  }else{
    appendErrorAddItem();
  }
  
});


//list actions validari
listContainer.addEventListener("click", (ev)=>{
  let obj=ev.target;        // the button being pressed -- the event
  let li=obj.parentNode;    // the list item <li> that contains the text and the <button> elements. -- <li> is the parentNode of the button element(node)
    if(obj.classList.contains("up")){
      let prev=li.previousElementSibling;
      listContainer.insertBefore(li,prev);
    }
    if(obj.classList.contains("down")){
      let following=li.nextElementSibling;
      listContainer.insertBefore(following, li);
    }

    if(obj.classList.contains("remove")){
      listContainer.removeChild(li);
    }
})




document.getElementById("purple-list").addEventListener("click", (ev) => {
  if (ev.target.classList.contains("check-btn")) {
    let listObj = ev.target.parentNode; // Get the parent <li> of the clicked button
    let item = listObj.querySelector(".item"); // Get the <p> inside that <li>

    if (listObj.classList.contains("unchecked")) {
      ev.target.textContent = "CHECKED";
      listObj.classList.remove("unchecked");
      item.classList.add("cut-off");
    } else {
      ev.target.textContent = "Mark as checked";
      listObj.classList.add("unchecked");
      item.classList.remove("cut-off");
    }
  }
});



btnFilterAlphabetical.addEventListener("click", () => {

  listContainer = document.getElementById("purple-list");
  items = Array.from(listContainer.children);

  for(let i=0; i<items.length-1; i++){
    for(let j=i+1; j<items.length; j++){
      let elementA = items[i].querySelector(".item").textContent;
      let elementB = items[j].querySelector(".item").textContent;

      if(elementA > elementB){

        //swap
        let aux = items[i];
        items[i] = items[j];
        items[j] = aux;
      }
    }
  }

  for(let i=0; i<items.length; i++){
    listContainer.appendChild(items[i]);
  }
});


