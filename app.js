//todo:implement hide list
//todo:change description

//selectori
let btnHideList = document.querySelector("#toggleList");

let btnChangeDesc = document.querySelector("#change-list-desc");
let listContainer = document.querySelector("#purple-list");

let btnAddItem = document.querySelector(".addItemButton");

let btnMarkCheck = document.querySelector(".check-btn");
let btnFilterAlphabetical = document.querySelector(".filter-button");
let btnFilterCheck = document.querySelector(".checked-button");
let btnEdit = document.querySelector(".edit-button");

let originalItems=[];


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
          <button class="check-btn">Mark as checked</button><button class="up">Up</button><button class="down">Down</button><button class="edit-button">Edit</button><button class="remove">Remove</button>
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
  let li=obj.parentNode;    // the list item <li> that contains the <p> text and the <button> elements. -- <li> is the parentNode of the button element(node)
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
});

listContainer.addEventListener("click", (ev) =>{
  if (ev.target.classList.contains("edit-button")) {
  let obj=ev.target;
  let parentElement = obj.parentNode;               // <li> element 
  let parItem=parentElement.querySelector(".item");

  if(! (obj.classList.contains("save-button")) ){

    obj.classList.add("save-button");
    obj.textContent="SAVE Changes";

  let editableElement = document.createElement("input");
  editableElement.classList.add("editable");
  editableElement.setAttribute("type", "text");
  editableElement.setAttribute("value", parItem.textContent);

  textboxElement = parentElement.appendChild(editableElement);    //remove this -- explanation needed
  parItem.replaceWith(textboxElement);

  }else{
    obj.classList.toggle("save-button");
    obj.textContent="Edit";

    console.log(parentElement.children);
    console.log(textboxElement);    //--- error - not defined

    let savedElement = document.createElement("p");
    savedElement.classList.add("saved-element", "item");
    savedElement.textContent=(textboxElement.value);

    parentElement.appendChild(savedElement);
    textboxElement.replaceWith(savedElement);

    console.log(savedElement);

    }
  }
  

});


//create an input once edit is clicked
// enter the text in the input box
// remove.child input box

//edit --> textbox.createlement --> textbox.append --> 
// element p.replaceWith(textbox) & remove li.child --> input text --> 'save changes' -->
// -->  new.createElement
// textbox.replaceWith(new); parentNode.appendChild(new)




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



btnFilterAlphabetical.addEventListener("click",()=>{

  listContainer = document.getElementById("purple-list");
  

  if(! (listContainer.classList.contains("filtered-list") )){
    listContainer.classList.add("filtered-list");

    originalItems = Array.from(listContainer.children); //stores original order 

    items = Array.from(listContainer.children); // stores the sorted elements

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


  }else{
    listContainer.classList.remove("filtered-list");
    for(let i=0; i<originalItems.length; i++){
      listContainer.appendChild(originalItems[i]); //must be inside the loop
    }

    
  }

  
});


btnFilterCheck.addEventListener("click", () =>{
  listContainer = document.getElementById("purple-list");
  elements = Array.from(listContainer.children);

  if(! (btnFilterCheck.getAttribute("id") === "checked-button") ){
    btnFilterCheck.setAttribute("id", "checked-button");
    btnFilterCheck.textContent="see all items"; 

    for(let i=0; i<elements.length; i++){
      
      if(elements[i].classList.contains("unchecked")){
        elements[i].classList.add("hide");
      }
    }
  }
  else{
    for(let i=0; i<elements.length; i++){
      
      if(elements[i].classList.contains("unchecked")){
        elements[i].classList.toggle("hide");
      }
    }
    btnFilterCheck.removeAttribute("id");
    btnFilterCheck.textContent="checked items"
  }
  

});


//todo add filters and sorting buttons 
//editare
//checked si unchecked
// element is 'checked' --> css style: line-through text.

//add a function for checked || uncheck --- toggle .checked class
//add a func to sort 'checked' items
//add a func to sort 'unchecked' items



//text is required -- sa apara sub textbox

// .classList.add("") --- adds a class to the element's class list.
// element.classList.toggle(""); ---  adds or removes a class from an element

// event listener |


//// ad edit button
// add  -- .setAttribute ('id', 'value');