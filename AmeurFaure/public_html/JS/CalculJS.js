/**
 * Fichier JS pour calculer le temps de voyage entre les planètes.
 * AmeurFaure : pages/Voyager.html
 * 
 */

/**
 * Listeners sur les inputs
 * 
 */
window.addEventListener('load', function () {
    // tabEvents est une collection d'évenements
    let tabEvents = ['keyup', 'click'];

    // tabInputs est une collection de <input>
    let tabInputs = window.document.querySelectorAll('input[type="number"]');

    // Parcours de tabInputs en s'appuyant sur le nombre de <input> et sur tabEvents
    for (let i = 0; i < tabInputs.length; i++) {
        for (let j = 0; j < tabEvents.length; j++) {
            // Ajout d'un Listener sur tous les <input> sur les évènements listés dans tabEvents
            tabInputs[i].addEventListener(tabEvents[j], calculTemps);
        }
    }



    // Gestion de l'input de type range (recopie de la valeur dans l'output)
    window.document.querySelector('#vitesse').addEventListener('change', function () {
        window.document.querySelector('#curseur_vitesse').value = recupValeur('#vitesse');
        calculTemps();
    });

});

/**
 * Fonction qui retourne un entier depuis une valeur prise dans le DOM
 * 
 * @param {String} id
 * @return {integer}
 */
function recupValeur(id) {
    var valeur = parseInt(window.document.querySelector(id).value);
    if (isNaN(valeur)) {
        window.document.querySelector(id).value = 0;
        return 0;
    } else {
        return valeur;
    }
}

/**
 * Fonction principale qui s'occupe de récupérer les valeurs, calculer le temps
 * et qui s'occupe ensuite de l'afficher
 * 
 * @returns {undefined}
 */
function calculTemps() {
    // Déclaration des constantes (distances à la périhélie)
    /*  const Mercure = 46001000;
     const Venus = 107476000;
     const Terre = 147098074;
     const Mars = 206655000;
     const Jupiter = 740680000;
     const Saturne = 1349800000;
     const Uranus = 2735000000;
     const Neptune = 4459800000;
     */
    //Déclaration d'un tableau
    const systeme = new Array(46001000, 107476000, 147098074, 206655000, 740680000, 1349800000, 2735000000, 4459800000);

    // Déclaration et affectation des variables
    let vitesse = recupValeur("#vitesse");
    let masse = recupValeur("#masse");
    //récupérer les valeurs des checbock dans un tableau voyage;
    let voyage = window.document.querySelectorAll('input[type="checkbox"]:checked');


//calcul
    let distance = 0; //systeme[voyage[1]] - systeme[voyage[0]];
     for (let k = 0; k < 2; k++) {
        distance = systeme[voyage[k].value] - distance;
    }
    
    distance = Math.abs(distance);
    let temps = distance / vitesse;
    let Ec = 0.5 * masse * vitesse * vitesse;

    let jour = conversionHeureJour(temps);
    // Affichage du résultat
    gestionAffichage(vitesse, temps, jour, Ec);
}




/**
 * Fonction pour passer de heure en jour
 * 
 * @param {float} heure 
 * @returns {float}
 */
function conversionHeureJour(heure) {
    let jour = heure / 24;
    return jour;
}


/**
 * Procédure qui gère l'affichage en fonction du nombre d'accidents
 * 
 * @param {float} vitesse
 * @param {float} heure
 * @param {float} jour
 * @param {float} Ec
 * @returns {void}
 */
function gestionAffichage(vitesse, heure, jour, Ec) {
    let elH2 = window.document.querySelector('#tempsvoyage');
    /* utilisation de #tempsvoyage
     * CSS définie dans simulateur.css
     * Si #vitesse (<h2 id='tempsvoyage'></h2>) n'existe pas, on le créé */
    if (!elH2) {
        elH2 = window.document.createElement('h2');
        elH2.id = 'tempsvoyage';
        window.document.querySelector('#recueilinfos').appendChild(elH2);
    }

    // Gestion de l'affichage
    elH2.innerHTML = 'Votre voyage prendra : ' + heure + ' heures, soit ' + jour + ' jours. Et vous aurez une énergie cinétique égale à : ' + Ec + ' Joules !';

}












