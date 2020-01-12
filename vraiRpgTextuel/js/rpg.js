let life = 10;
let armor = 1;
let bonusStrength = 0;
let string;
let goto;
let secondAvailable = true;
let opponentName;
let opponentLife;
let opponentStrength;

tab0();

function text(string) {
    let text = document.getElementById("texte");
    text.innerHTML = string;
}

function choix1(string, goto) {
    let choix = document.getElementById("Choix1");
    choix.innerHTML = string;
    choix.setAttribute("onclick", goto);
}

function choix2(string, goto) {
    let choix = document.getElementById("Choix2");
    choix.innerHTML = string;
    choix.setAttribute("onclick", goto);
}

function prepareCombat(preparedOpponentName, preparedOpponentLife, preparedOpponentStrength, futureGoto) {
    opponentName = preparedOpponentName;
    opponentLife = preparedOpponentLife;
    opponentStrength = preparedOpponentStrength;
    goto = futureGoto;

    choix1("Attaque faible (tous les tours, (1) + (" + bonusStrength + ") DMG)", "combat(1)");

    if (secondAvailable) {
        document.getElementById("Choix2").style.color = "black";
        choix2("Attaque forte (tous les deux tours, (3) + (" + bonusStrength + ") DMG)", "combat(3)");
    } else {
        document.getElementById("Choix2").style.color = "grey";
        choix2("Attaque forte (tous les deux tours, (3) + (" + bonusStrength + ") DMG)", "");
    }

}

function combat(damageValue) {
    secondAvailable = !secondAvailable;

    string = opponentName + "(" + opponentLife + ")<br>";
    text(string);

    opponentLife -= (damageValue + bonusStrength);

    string += "vous lui avez fait (" + damageValue + ") + (" + bonusStrength + ") dégats.<br>Il lui reste (" + opponentLife + ") vie.<br>";
    text(string);

    if (opponentLife <= 0) {
        document.getElementById("Choix2").style.color = "black";
        secondAvailable = true;

        string += "Vous avez vaincu " + opponentName + " !";
        text(string);
        goto += "(true)";
        choix1("-->", goto);
        choix2("", "");
    } else {
        life -= (opponentStrength - armor);

        string += opponentName + " vous a infligé (" + (opponentStrength - armor) + ") dégats.<br> Il vous reste (" + life + ") vie.<br>";
        text(string);

        if (life <= 0) {
            document.getElementById("Choix2").style.color = "black";
            secondAvailable = true;

            string += "Vous avez été vaincu par " + opponentName + " !";
            text(string);
            goto += "(false)";
            choix1("-->", goto);
            choix2("", "");
        } else {
            prepareCombat(opponentName, opponentLife, opponentStrength, goto);
        }
    }
}

function tab0() {
    text("Pour l’heure, vous vous rendez au tableau de quête de votre guilde.");
    choix1("Choisir la quête 'Ramasser des champignons'", "tab1()");
    choix2("Aller boire un verre en draguant la jolie barmaid", "tab2()");
}

function tab1() {
    text("Arrivé sur place, vous pouvez ramasser des champignons rouges ou marrons");
    choix1("Cueuillir les champignons marrons", "tab3()");
    choix2("Cueuillir les champignons rouges", "tab4()");
}

function tab2() {
    text("Vous draguez la jolie barmaid");
    choix1("Finalement, elle n'est pas à votre goût. Vous sortez cueuillir des champignons", "tab5()");
    choix2("Vous lui proposez de venir «Netflix and chill» chez vous après son service", "tab6()");
}

function tab3() {
    text("Ce ne sont pas des champignons, ce sont des monstres !");
    choix1("Vous ne pouvez fuir", "tab7()");
    choix2("", "");
}

function tab4() {
    text("Ils n'ont pas l'air très comestible, mais c'est ce que la quête demande");
    choix1("Vous remarquez que les champignons marrons sont en fait des monstres tentant d’être discret, vous voulez leur donner une leçon.", "tab7()");
    choix2("Vous ramenez les champignons au maître de guilde, il les avale d’une traite, et lorsqu’il commence à se sentir malade vous accuse d’avoir tenté de l’empoisonner", "tab8()");
}

function tab5() {
    text("Les champignons vous attaquent, ce sont en fait des monstres !");
    choix1("Contre-attaquer", "tab7()");
    choix2("Vous fuyez, et vous retrouvez nez à nez avec le maître de guilde qui vous traite de fuyard", "tab8()");
}

function tab6() {
    text("Êtes-vous fou ? C’est le femme du maître de guilde ! Ayant tout entendu, il se jette sur vous.");
    choix1("Vous ne pouvez éviter le combat", "tab8()");
    choix2("", "");
}

function tab7() {
    text("Champi-monstre vous attaque !");
    prepareCombat("Champi-monstre", "10", "3", "tab7Result");
}

function tab7Result(victory) {
    if (victory) {
        text("Vous mangez les Champi-Monstre, vous regagnez toute votre vie ainsi qu’un bonus de 5 hp ! <br> Victorieux, vous vous sentez poussez des ailes et vous quittez la guilde, plus personne ne peut vous dire quoi faire !");
        life = 15;
        choix1("Se ballader dans la fôret", "tab9()");
        choix2("Se ballader dans les champs", "tab10()");
    } else {
        text("Se faire tuer par des champignons… tu esperais vraiment devenir un héro ? ");
        choix1("Recommencer l'histoire", "document.location.reload(true)");
        choix2("", "");
    }
}

function tab8() {
    text("Le maître de guilde vous attaque !");
    prepareCombat("Maître de guilde", "10", "3", "tab8Result");
}

function tab8Result(victory) {
    if (victory) {
        text("Le maître de guilde au sol, vous lui volez une fiole qu’il avait à sa ceinture, vous la buvez et celle-ci vous rend tous vos hp plus un bonus de 5 !<br> Honteux de ce qu’est votre maître de guilde, vous décidez de quitter la guilde.");
        life = 15;
        choix1("Aller aux remparts du village", "tab11()");
        choix2("Aller au marché", "tab12()");
    } else {
        text("Le maître de guilde vous a fracassé, vous êtes mort !");
        choix1("Recommencer l'histoire", "document.location.reload(true)");
        choix2("", "");
    }
}

function tab9() {
    text("Au milieu de la fôret, vous appercevez une crevasse");
    choix1("Partir en exploration dans la crevasse", "tab13()");
    choix2("Continuer votre route", "tab14()");
}

function tab10() {
    text("Vous appercevez un épouventail au milieu du champs");
    choix1("Continuer votre route", "tab14()");
    choix2("Inspecter l'épouventail", "tab15()");
}

function tab11() {
    text("Depuis les remparts, vous avez une vue dégagée sur l’extérieur et l’intérieur de votre village");
    choix1("Aller voir cet étrange épouventail au milieu du champs qui semble ma foi fort douteux", "tab15()");
    choix2("Arrêter une baston que vous voyez éclater au milieu du marché", "tab16()");
}

function tab12() {
    text("Vous marchez tranquillement dans le marché. Soudain, une bagarre éclate à côté de vous");
    choix1("Arrêter la bagarre", "tab16()");
    choix2("Faire comme si rien n'était", "tab17()");
}

function tab13() {
    text("Alors que vous descendez la paroie avec vos bras musculeux (+2 point force), un rocher s'effondre et vous empêche de sortir");
    bonusStrength = 2;
    choix1("Vous êtes obligés de continuer à descendre dans l'espoir de trouver une sortie", "tab()");
    choix2("", "tab()");
}

function tab14() {
    text("Vous croisez un groupe d'aventurier, vousvous entendez bien avec eux et ils vous donnent une épée neuve (+2 point de force).<br>L'un d'entre eux se moque de votre accoutrement");
    bonusStrength = 2;
    choix1("Malgrès tout, vous décidez de continuer la route avec eux", "tab18()");
    choix2("Enervé par les moqueris, vous décidez de continuer seul", "tab19()");
}

function tab15() {
    text("L’épouventail est dans un sale état. Etant visiblement magique, il vous informe en pleurant que des mercenaires payés par le roi l’ont mis dans cet état.<br> Par terre, vous ramassez son « HAT OF STRENGTH » qui vous donne +2 de force.");
    bonusStrength = 2;
    choix1("Vous réfléchissez à l’endroit ou peuvent se trouver ces mercenaires", "tab19()");
    choix2("Vous courrez comme un demeuré en espérant croiser le chemin de ces malotrus", "tab20()");
}

function tab16() {
    text("Pour vous remercier d'avoir arrêté la bagarre, un commercant vous offre une dague (+2 point de force)");
    bonusStrength = 2;
    choix1("Fier de ce que vous avez accompli, vous décidez d'aller plus loin mais vous hésitez : devriez vous tuer le roi, afin de montrer qui vous êtes vraiment ?", "tab20()");
    choix2("Aller dans un bar pour boire un verre", "tab21()");
}

function tab17() {
    text("En marchant à côté de la bagarre, l'un des types fait tomber un bracelet. Espiègle, vous le ramassez. <br>Celui-ci est magique, et vous donne +2 point de force");
    bonusStrength = 2;
    choix1("Aller dans un bar pour boire un verre", "tab21()");
    choix2("", "tab()");
}

function tab18() {
    text("Vous vous trouvez devant une grotte, une sortie est possible.<br> Vous êtes vraiment énervé envers le roi, qui a mal fait baliser la fôret qui en a découlé votre chute dans la crevasse.");
    choix1("Vous voyez quelque chose bouger dans la grotte, vous allez voir.", "tab22()");
    choix2("Vous allez montrer au roi de quel bois vous vous chauffez", "tab23()");
}

function tab19() {
    text("Après avoir bien réfléchit, vous savez que cette situation ne peut continuer. <br>Vous vous trouvez devant une auberge où se sont retrouvés les mercenaires.");
    choix1("Rentrer et leur faire comprendre le fond de votre pensée", "tab24()");
    choix2("Devant la porte de l'auberge se tien le roi, une excellente occasion de faire une démonstration de force", "tab23()");
}

function tab20() {
    text("Perdu dans vos pensées, vous vous retrouvez devant une grotte.<br> Quelque chose semble bouger à l'intérieur.");
    choix1("Rentrer voir ce que c'est", "tab22()");
    choix2("Rebrousser chemin et aller voir le roi directement dans son chateau", "tab23()");
}

function tab21() {
    text("BERK, cet hydromel est vraiment horrible ! Le patron du bar vous fait savoir qu’il ne peut plus acheter de l’hydromel de bonne qualitée dû aux nouvelles taxes du roi, et qu’il est donc forcé de servir l’hydromel dégoutant qu’ils fabriquent au pays voisin.<br> Un mercenaires, assis non loin de votre table et ayant tout entendu, se lève avec son groupe pour chercher des noises au patron : « comment ça l’hydromel de mon pays est dégeulasse ? »");
    choix1("Vous prenez la defense du patron", "tab24()");
    choix2("-\tVous aller dire gentilment au roi qu’il devrait baisser la valeur des taxes à grand coup de burrin dans c**illes", "tab23()");
}

function tab22() {
    text("Le BALROG (VIT(99) ATK(99) DEF(99)) qui dormait paisiblement est réveillé par votre faute.");
    prepareCombat("BALROG", "99", "99", "tab22Result");
}

function tab22Result(victory) {
    if (victory) {
        text("C’était… inatendu.Tricheur va.");
        choix1("Ayant vaincu la balrog (en trichant), vous vous rendez avec sa tête (non-honnêtement obtenue) dans la cours du château ", "tab25()");
        choix2("Se rend à la salle du trone ou le roi est sépo pour obtenir des félicitations de type « psahtek frère »", "tab26()");
    } else {
        text("NON MAIS YA DEUX SECONDES TU CUEUILLAIS DES CHAMPIGNONS, FAUT ETRE REALISTE A UN MOMENT ");
        choix1("Recommencer l'histoire", "document.location.reload(true)");
        choix2("", "");
    }
}

function tab23() {
    text("Vous rentrez dans la sale du trone, le roi se tien devant vous");
    prepareCombat("Le Roi", "20", "4", "tab23Result");
}

function tab23Result(victory) {
    if (victory) {
        text("Tu as vaincu le roi, toutes les personnes présentes dans la pièce sont choquées");
        choix1("Après avoir vaincu le roi, vous vous rendez dans la cours du château", "tab25()");
        choix2("Tuer un gouverneur, ça creuse, vous vous rendez à la taverne", "tab27()");
    } else {
        text("Tu t’es fait bouillave, looser");
        choix1("Recommencer l'histoire", "document.location.reload(true)");
        choix2("", "");
    }
}

function tab24() {
    text("Vous êtes face aux mercenaires, vous ne leur laissez pas le temps de réagir");
    prepareCombat("Mercenaires", "20", "4", "tab24Result");
}

function tab24Result(victory) {
    if (victory) {
        text("Les mercenaires ont été defaits ! <br>Un chancelier rentre dans l’auberge, ayant entendu ce que vous venez de faire, il vous propose de le rejoindre dans la salle du trone pour un adoubement");
        choix1("Vous le suivez", "tab26()");
        choix2("Vous décidez de rester dans la taverne", "tab27()");
    } else {
        text("Pleutre.");
        choix1("Recommencer l'histoire", "document.location.reload(true)");
        choix2("", "");
    }
}

function tab25() {
    text("Une fête est à votre honneur pour ce que vous venez de réaliser. <br>Vous prenez votre pied jusqu’au lendemain.");
    choix1("C’est le jour de l’adoubement ! ", "tab28()");
    choix2("", "tab()");
}

function tab26() {
    text("Vous vous trouvez dans la salle du trone, le roi est là habillé de façon cérémonieuse.");
    choix1("Proceder à l'adoubement", "tab28()");
    choix2("Vous ne voulez pas devenir un héro pour ce roi, vous vous enfuyez", "tab29()");
}

function tab27() {
    text("Le chancelier s'en va dépité");
    choix1("Après avoir mangé et bu, vous repartez à l'aventure", "tab29()");
    choix2("","");
}

function tab28() {
    text("Vous êtes adoubé ! <br>Vous avez désormais la plus grande reconnaissance possible dans le royaume, félicitation !")
    choix1("Fin n°1", "tab30()");
    choix2("", "");
}

function tab29() {
    text("Fier de ce que vous avez accompli, vous ressortez de l’auberge, le monde vous attend !");
    choix1("Fin n°2", "tab31()");
    choix2("", "");
}

function tab30() {
    text("Félicitation, vous avez atteint la fin n°1 de ce mini rpg-textuel !");
    choix1("Recommencer pour découvrir l'autre fin -->", "document.location.reload(true)");
    choix2("", "");
}

function tab31() {
    text("Félicitation, vous avez atteint la fin n°2 de ce mini rpg-textuel !");
    choix1("Recommencer pour découvrir l'autre fin -->", "document.location.reload(true)");
    choix2("", "");
}
