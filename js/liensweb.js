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

var contenuElt = document.getElementById('contenu');

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
  var a = document.createElement('a');
  a.href = url;
  a.setAttribute('target', '_blank');
  a.textContent = titre;
  a.style.fontSize = '20px';
  a.style.fontWeight = 'bold';
  a.style.color = '#428bca';
  a.style.textDecoration = 'none';
  a.style.margin = '0 .3em 0 0';
  var p = document.createElement('p');
  p.textContent = url;

  var div = document.createElement('div');
  div.style.display = 'flex';
  div.style.alignItems = 'baseline';
  div.appendChild(a);
  div.appendChild(p);
  return div;
}

//insèree un span dans #contenu
function insertSpan(titre, url, auteur)
{
  var span = document.createElement('span');
  span.classList.add('lien');
  span.style.display = 'block';
  span.appendChild(createLinkBox(titre, url));

  var p = document.createElement('p');
  p.textContent = 'Ajoutée par ' + auteur;

  span.appendChild(p);

  contenuElt.appendChild(span);
}

function displayContent()
{
  for (i = 0; i < links.length; i++) {
    var l = links[i];
    insertSpan(l.titre, l.url, l.auteur);
  }
}

function testUrl(url)
{
  var regex = new RegExp(/^(http:\/\/|https:\/\/)?[\w.\-_/]+[.]{1}[a-z]{2,}$/);
  if (regex.test(url)) {
    urlElt.style.boxShadow = '0 0 3px 1px rgba(66,139,202,1)';
    trueReg = true;
  } else {
    urlElt.style.boxShadow = '0 0 3px 1px rgba(255,0,0,1)';
    trueReg = false;
  }
}

/* ------------------- GESTION DES EVENTS ------------------- */

//on gère les display au click
addButton.addEventListener('click', function ()
  {
    addButton.style.display = 'none';
    form.style.display = 'flex';
  }
);

//on ajoute des comportements event à tous les input du form sauf le dernier - c'est le submit
for (i = 0; i < form.children.length - 1; i++) {
  var prevShadow;
  form.children[i].addEventListener('focusin', function ()
    {
      prevShadow = this.style.boxShadow;
      this.style.boxShadow = '0 0 3px 1px rgba(66,139,202,1)';
    }
  );
  form.children[i].addEventListener('focusout', function ()
    {
      if (!this.value) {
        this.style.boxShadow = '0 0 3px 1px rgba(255,0,0,1)';
      } else {
        this.style.boxShadow = 'none';
      }
    }
  );
}

//test sur la syntaxe de l'url ; trueReg = true si valide, false si invalide
form.querySelector('input[name=url]').addEventListener('input', function ()
  {
    testUrl(this.value);
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
      var regex = new RegExp(/^(http)[s]?:[/]{2}/);
      (regex.test(url.value)) ? url = 'http://' + url : '';

      insertSpan(title, url, author);

      addButton.style.display = 'block';
      form.style.display = 'none';
    } else {
      if (!author) {
        form.children[0].style.boxShadow = '0 0 3px 1px rgba(255,0,0,1)';
      }

      if (!title) {
        form.children[1].style.boxShadow = '0 0 3px 1px rgba(255,0,0,1)';
      }

      if (!url) {
        form.children[2].style.boxShadow = '0 0 3px 1px rgba(255,0,0,1)';
      }
    }
  }
);

/* ------------------- EXECUTION INITIALE ------------------- */
testUrl(urlElt.value);
displayContent();
