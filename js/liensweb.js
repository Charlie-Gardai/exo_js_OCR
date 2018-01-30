/*
Activité 1
*/

// Liste des liens Web à afficher. Un lien est défini par :
// - son titre
// - son URL
// - son auteur (la personne qui l'a publié)

var link = {
  init: function (titre, url, auteur)
  {
    this.titre = titre;
    this.url = url;
    this.auteur = auteur;
  },
};

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

function insertNewLink(titre, url, auteur)
{
  links.push(new link.init(titre, url, auteur));
}

// TODO : compléter ce fichier pour ajouter les liens à la page web
var contenuElt = document.getElementById('contenu');

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

window.onload = function ()
{
  var navigation = document.getElementById('navigation');
  var addButton = navigation.getElementsByTagName('button')[0];
  var form = navigation.getElementsByTagName('form')[0];
  var submit = form.querySelector('input[type="submit"]'); console.log(listeLiens);

  addButton.addEventListener('click', function ()
  {
    addButton.style.display = 'none';
    form.style.display = 'flex';
  }
  );

  for (i = 0; i < links.length; i++) {
    var l = links[i];
    insertSpan(l.titre, l.url, l.auteur);
  }
};
