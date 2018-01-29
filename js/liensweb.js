/*
Activité 1
*/

// Liste des liens Web à afficher. Un lien est défini par :
// - son titre
// - son URL
// - son auteur (la personne qui l'a publié)
var listeLiens = [
{
  titre: 'So Foot',
  url: 'http://sofoot.com',
  auteur: 'yann.usaille',
},
{
  titre: 'Guide d\'autodéfense numérique',
  url: 'http://guide.boum.org',
  auteur: 'paulochon',
},
{
  titre: 'L\'encyclopédie en ligne Wikipedia',
  url: 'http://Wikipedia.org',
  auteur: 'annie.zette',
},
];

// TODO : compléter ce fichier pour ajouter les liens à la page web
var contenuElt = document.getElementById('contenu');

function onCasseTout()
{
  var gimmeThePs = document.getElementsByTagName('p');
  for (i = 0; i < gimmeThePs.length; i++) {
    gimmeThePs[i].style.margin = '0';
  }
}

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
  for (i = 0; i < listeLiens.length; i++) {
    var lienActuel = listeLiens[i];
    insertSpan(lienActuel.titre, lienActuel.url, lienActuel.auteur);
  }

  onCasseTout();
};
