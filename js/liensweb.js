/*
Activité 1
*/

// Liste des liens Web à afficher. Un lien est défini par :
// - son titre
// - son URL
// - son auteur (la personne qui l'a publié)

var navigation = document.getElementById('navigation');
var addButton = navigation.getElementsByTagName('button')[0];
var form = navigation.getElementsByTagName('form')[0];
var urlElt = form.querySelector('input[name=url]');

var submit = form.querySelector('input[type="submit"]');

var trueReg = false;

var message = document.getElementById('message');

var contenuElt = document.getElementById('contenu');

/* --------------------- BOITE A COULEUR ---------------------  */
var blueShadow = '0 0 3px 1px rgba(66,139,202,1)';
var redShadow = '0 0 3px 1px rgba(255,0,0,1)';

/* --------------------- OBJET ET STRUCTURE ---------------------  */
//création de l'objet link
var link = {
  init: function (titre, url, auteur)
  {
    this.titre = titre;
    this.url = url;
    this.auteur = auteur;
  },
};

//liste de liens de base
var links = [
  new link.init(
    'So Foot',
    'http://sofoot.com',
    'yann.usaille'
  ),
  new link.init(
    'Guide d\'autodéfense numérique',
    'http://guide.boum.org',
    'paulochon'
  ),
  new link.init(
    'L\'encyclopédie en ligne Wikipedia',
    'http://Wikipedia.org',
    'annie.zette'
  ),
];

//insertion de nouveaux objets link dans la liste links
function insertNewLink(titre, url, auteur)
{
  links.push(new link.init(titre, url, auteur));
}

// permet de créer un HTMLElement a
function createLinkBox(titre, url)
{
  var strong = document.createElement('strong');
  strong.textContent = titre;
  strong.style.fontSize = '20px';
  strong.style.fontWeight = 'bold';
  strong.style.color = '#428bca';
  strong.style.textDecoration = 'none';
  strong.style.margin = '0 .3em 0 0';
  var p = document.createElement('p');
  p.textContent = url;

  var a = document.createElement('a');
  a.href = url;
  a.target = '_balnk';
  a.style.display = 'flex';
  a.style.alignItems = 'baseline';
  a.appendChild(strong);
  a.appendChild(p);
  return a;
}

//insèree un span dans #contenu
function insertSpan(titre, url, auteur, where)
{
  where = where || 0;
  var span = document.createElement('span');
  span.classList.add('lien');
  span.style.display = 'block';
  span.appendChild(createLinkBox(titre, url));

  var p = document.createElement('p');
  p.textContent = 'Ajoutée par ' + auteur;

  span.appendChild(p);

  //si on rentre 'before' en dernier paramètre
  (where == 'before') ?
    contenuElt.insertBefore(span, contenuElt.children[0]) :
    contenuElt.appendChild(span);
}

//affichage intial
function displayContent()
{
  for (i = 0; i < links.length; i++) {
    var l = links[i];
    insertSpan(l.titre, l.url, l.auteur);
  }
}

//test regex de l'url
function testUrl(isStart)
{
  isStart = isStart || 0;
  var regex = new RegExp(/^(http:\/\/|https:\/\/)?[\w.\-_/]+\.[a-z]{2,}/);
  if (regex.test(urlElt.value)) {
    if (isStart !== true) {
      urlElt.style.boxShadow = blueShadow;
    }

    trueReg = true;
  } else {
    if (isStart !== true) {
      urlElt.style.boxShadow = redShadow;
    }

    trueReg = false;
  }
}

//déclaration de la liste des options d'HTMLElement dans #navigation
var options = [
  addButton,
  form,
  message,
];

//permet d'alterner les HTMLElement dans #navigation
function alternateNav(selection)
{
  for (i = 0; i < options.length; i++) {
    if (i === selection - 1) {
      options[i].removeAttribute('style');
    } else {
      options[i].style.display = 'none';
    }
  }
}

/* ------------------- GESTION DES EVENTS ------------------- */

//on gère les display au click
addButton.addEventListener('click', function () { alternateNav(2); });

//on ajoute des comportements event à tous les input du form sauf le dernier - c'est le submit
for (i = 0; i < form.children.length - 1; i++) {
  form.children[i].addEventListener('focusin', function ()
    {
      if (this.getAttribute('name') !== 'url') {
        this.style.boxShadow = blueShadow;
      } else {
        testUrl();
      }
    }
  );
  form.children[i].addEventListener('focusout', function ()
    {
      if (!this.value) {
        this.style.boxShadow = redShadow;
      } else if (this.name === 'url') {
        testUrl;
      }else {
        this.style.boxShadow = 'none';
      }
    }
  );
}

//test sur la syntaxe de l'url ; trueReg = true si valide, false si invalide
form.querySelector('input[name=url]').addEventListener('input', function ()
  {
    testUrl();
  }
);

//gestion de l'envois
submit.addEventListener('click', function (e)
  {
    e.preventDefault();
    var author = form.children[0].value;
    var title = form.children[1].value;
    var url = form.children[2].value;

    if (author && title && url && trueReg === true) {
      var regex = new RegExp(/^http[s]?:\/\//);
      (regex.test(url)) ? console.log(url) : url = 'http://' + url;

      insertSpan(title, url, author, 'before');

      addButton.style.display = 'none';
      form.style.display = 'none';

      message.innerHTML = '<p>Le lien <strong>' + title + '</strong> a bien été ajouté</p>';

      alternateNav(3);
      for (i = 0; i < 3; i++) {
        form.children[i].value = null;
      }

      setTimeout(function ()
        {
          alternateNav(1);
        },

      2000);
    } else {
      if (!author) {
        form.children[0].style.boxShadow = redShadow;
      }

      if (!title) {
        form.children[1].style.boxShadow = redShadow;
      }

      if (!url) {
        form.children[2].style.boxShadow = redShadow;
      }
    }
  }
);

/* ------------------- EXECUTION INITIALE ------------------- */
alternateNav(1);
testUrl(true);
displayContent();
