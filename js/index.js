/*
When the page loads, show the first 50 monsters. 
Each monster's name, age, and description should be shown.
Above your list of monsters, you should have a form to create a new monster. 
You should have fields for name, age, and description, and a 'Create Monster Button'. 
When you click the button, the monster should be added to the list and saved in the API.
At the end of the list of monsters, show a button. When clicked, 
the button should load the next 50 monsters and show them.
*/
const monsterDiv = document.querySelector('#create-monster')
let monsterContainer = document.querySelector('#monster-container')

const inputForm = document.createElement('form')
const inputName = document.createElement('input')
const inputAge = document.createElement('input') 
const inputBio = document.createElement('input')
const submitBtn = document.createElement('button')

inputName.setAttribute('id', 'name')
inputName.setAttribute('placeholder', 'name...')
inputAge.setAttribute('id', 'age')
inputAge.setAttribute('placeholder', 'age...')
inputBio.setAttribute('id', 'description')
inputBio.setAttribute('placeholder', 'description...')
submitBtn.setAttribute('id', 'monster-form')
submitBtn.innerText = 'create'

monsterDiv.append(inputForm)
const formArray = [inputName, inputAge, inputBio, submitBtn]
inputForm.replaceChildren(...formArray)


let nLimit //limit the number of monsters returned
let pageNumber //offset your request for monsters to some page (must specify a limit)


inputForm.addEventListener('submit', handleSubmit)
//adds new monster from user input
function handleSubmit(e){
    e.preventDefault()

    let monsterObject = {
        name:e.target.name.value,
        age:e.target.age.value,
        description:e.target.description.value,
    }
    renderOneMonster(monsterObject)
    uploadMonster(monsterObject)
}

//renders monsters to the DOM
function renderOneMonster(monster){

  let mBio = document.createElement('div')
    mBio.innerHTML = `
        <h2>${monster.id} ${monster.name}</h2>
        <h4>Age ${monster.age}<h4>
        <p>Bio ${monster.description}</p>
    `
    monsterContainer.appendChild(mBio)
}

//GET fetch request
function getMonsters(){
    
    fetch(`http://localhost:3000/monsters/?_limit=${nLimit}&_page=${pageNumber}`)
    .then(res => res.json())
    .then(data => data.forEach(monster => renderOneMonster(monster)))
}

//POST new monster
function uploadMonster(monsterObject){

    fetch('http://localhost:3000/monsters',{
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body:JSON.stringify(monsterObject)
    })
    .then(res => res.json())
    .then(monster => console.log(monster))
}

//pageBtns
forwardBtn = document.querySelector('#forward')
forwardBtn.addEventListener('click', turnPage)
backBtn = document.querySelector('#back')
backBtn.addEventListener('click', turnPage)

//turns page if page is turnable
function turnPage(e){
  e.preventDefault()

  btnText = e.target.innerText
    
    if(pageNumber >= 1 && btnText === '=>'){
        
        pageNumber += 1
    
    }else if(btnText === '<='){

        if(pageNumber >=2){
            pageNumber -=1

        }else{
            alert('Cant go back! \nThat page doesnt exist.')  
        }
}
monsterContainer.replaceChildren()
getMonsters()
}

function initialize(){
  
    nLimit = 50
    pageNumber = 1
    getMonsters()

}

initialize()

//note
//from MDN
//replaceChildren() provides a very convenient mechanism for emptying a document of all its children. You call it on the document without any argument specified:
///document.replaceChildren();
// document.children; // HTMLCollection []//