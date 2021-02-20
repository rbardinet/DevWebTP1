// créer les constantes nécessaires
const rememberDiv = document.querySelector('.remember');
const forgetDiv = document.querySelector('.forget');
const form = document.querySelector('form');
const nameInput = document.querySelector('#entername');
const submitBtn = document.querySelector('#submitname');
const forgetBtn = document.querySelector('#forgetname');

const h1 = document.querySelector('h1');
const personalGreeting = document.querySelector('.personal-greeting');

var file;

// Empêcher le form d'être soumis
form.addEventListener('submit', function(e) {
    e.preventDefault();
  });

// exécuter la fonction quand le bouton 'Say hello' est cliqué
submitBtn.addEventListener('click', async function() {
    // récupérer le fichier à l'adresse donnée
    console.log("Clicked on URL fetch button");
    var url = nameInput.value;
    response = await fetch(url);
    file = await response.then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                    return;
                }/////////////////
                return response.json().textContent;

            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });

        
        console.log(file);
  });


  // exécuter la fonction quand le bouton 'Forget' est cliqué
forgetBtn.addEventListener('click', function() {
    // supprimer l'item name du web storage
    localStorage.removeItem('name');
   // exécuter nameDisplayCheck() pour afficher la
   // page personnalisée et changer le formulaire
    nameDisplayCheck();
  });

  // définit la fonction nameDisplayCheck()
function nameDisplayCheck() {
    // vérifie si l'élément 'name' est stocké dans le web storage
    if(localStorage.getItem('name')) {
      // Si c'est le cas, affiche un accueil personnalisé
      let name = localStorage.getItem('name');
      h1.textContent = 'Welcome, ' + name;
      personalGreeting.textContent = 'Welcome to our website, ' + name + '! We hope you have fun while you are here.';
      // cache la partie 'remember' du formulaire et affiche la partie 'forget'
      forgetDiv.style.display = 'block';
      rememberDiv.style.display = 'none';
    } else {
      // Sinon, affiche un accueil générique
      h1.textContent = 'Welcome to our website ';
      personalGreeting.textContent = 'Welcome to our website. We hope you have fun while you are here.';
      // cache la partie 'forget' du formulaire et affiche la partie 'remember'
      forgetDiv.style.display = 'none';
      rememberDiv.style.display = 'block';
    }
  }

  //document.body.onload = nameDisplayCheck;

  //Fonctions pour ouvrir fichiers sur pc
  function dispFile(contents) {
    document.getElementById('contents').innerHTML=contents
  }
  function clickElem(elem) {
      // Thx user1601638 on Stack Overflow (6/6/2018 - https://stackoverflow.com/questions/13405129/javascript-create-and-save-file )
      var eventMouse = document.createEvent("MouseEvents")
      eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      elem.dispatchEvent(eventMouse)
  }
  function openFile(func) {
      readFile = function(e) {
          var file = e.target.files[0];
          if (!file) {
              return;
          }
          var reader = new FileReader();
          reader.onload = function(e) {
              var contents = e.target.result;
              fileInput.func(contents)
              document.body.removeChild(fileInput)
          }
          reader.readAsText(file)
      }
      fileInput = document.createElement("input")
      fileInput.type='file'
      fileInput.style.display='none'
      fileInput.onchange=readFile
      fileInput.func=func
      document.body.appendChild(fileInput)
      clickElem(fileInput)
  }