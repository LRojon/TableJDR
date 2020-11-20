let map = [
    {
        value: "Cartes",
        id: "root",
        opened: true,
        items: [
            {
                value: "Scénario 1",
                id: "1",
                items: [
                    {
                        value: "Test-1",
                        id: "t1"
                    }
                ]
            },
            {
                value: "Test-2",
                id: "t2"
            }
        ]
    }
]

let mob = [
    {
        value: "Créatures",
        id: "root",
        opened: true,
        items: [
            {
                value: "Gobelinoïde",
                id: "f1",
                items: [
                    {
                        id: "1",
                        value: "Gobelin",
                        token: "/file/mob/Gobelin.png",
                        pv: "2;6;0",
                        xp: 50,
                        for: 8,
                        dex: 14,
                        con: 10,
                        int: 10,
                        sag: 8,
                        cha: 8,
                        danger: "1/4",
                        sense: "Vision dans le noir 18 m, Perception passive 9",
                        save: null,
                        speed: "9 m",
                        ac: 15,
                        type_ac: "armure de cuir, bouclier",
                        skill: "Discrétion +6",
                        action: "<strong><i>Arc court</i></strong>. <i>Attaque d'arme à distance</i> : +4 pour toucher, portée 24/96 m, une cible.<br><i>Touché</i> : 5 (1d6+2) dégâts perforants.<br><br><strong><i>Cimeterre</i></strong>. <i>Attaque d'arme au corps à corps</i> : +4 pour toucher, allonge 1,50 m, une cible.<br><i>Touché</i> : 5 (1d6+2) dégâts tranchants.",
                        capacities: "<strong><i>Fuite agile</i></strong>. Le gobelin peut effectuer l'action se désengager ou se cacher par une action bonus à chacun de ses tours."
                    },
                    {
                        id: "2",
                        value: "Gobelin archer",
                        token: "/file/mob/Gobelin Archer.png",
                        pv: "2;6;0",
                        xp: 50,
                        for: 8,
                        dex: 14,
                        con: 10,
                        int: 10,
                        sag: 8,
                        cha: 8,
                        danger: "1/4",
                        sense: "Vision dans le noir 18 m, Perception passive 9",
                        save: null,
                        speed: "9 m",
                        ac: 15,
                        type_ac: "armure de cuir, bouclier",
                        skill: "Discrétion +6",
                        action: "<strong><i>Arc court</i></strong>. <i>Attaque d'arme à distance</i> : +4 pour toucher, portée 24/96 m, une cible.<br><i>Touché</i> : 5 (1d6+2) dégâts perforants.<br><br><strong><i>Cimeterre</i></strong>. <i>Attaque d'arme au corps à corps</i> : +4 pour toucher, allonge 1,50 m, une cible.<br><i>Touché</i> : 5 (1d6+2) dégâts tranchants.",
                        capacities: "<strong><i>Fuite agile</i></strong>. Le gobelin peut effectuer l'action se désengager ou se cacher par une action bonus à chacun de ses tours."
                    },
                    {
                        value: "Orc",
                        id: "t3"
                    }
                ]
            },
            {
                value: "Humain",
                id: "f2",
                items: [
                    {
                        value: "Bandit",
                        id: "t4"
                    },
                    {
                        value: "Garde",
                        id: "t5"
                    },
                    {
                        value: "Mage",
                        id: "t6"
                    }
                ]
            }
        ]
    }
]

let pj = [
    {
        value: "Joueurs",
        id: "root",
        opened: true,
        items: [
            {
                value: "Guerrier du temps",
                id: "f1",
                items: [
                    {
                        value: "Keldur",
                        id: "t1"
                    },
                    {
                        value: "Geneviève",
                        id: "t2"
                    },
                    {
                        value: "Corcdefeu",
                        id: "t3"
                    },
                    {
                        value: "Dekker",
                        id: "t4"
                    }
                ]
            },
            {
                value: "Briseur de siège",
                id: "f2",
                items: [
                    {
                        value: "Chevalier",
                        id: "t5"
                    },
                    {
                        value: "Barde",
                        id: "t6"
                    },
                    {
                        value: "Prêtresse",
                        id: "t7"
                    }
                ]
            }
        ]
    }
]

let ambiance = [
    {
        name: "Caverne"
    },
    {
        name: "Forêt - Jour"
    },
    {
        name: "Forêt - Nuit"
    }
]

$("#mob").fadeOut(0);
$("#pj").fadeOut(0);
$("#tree-mob").fadeOut(0);
$("#tree-pj").fadeOut(0);
$("#right-timeline").fadeOut(0);

$(".nav-link").click(function(){
    if(!$(this).hasClass('dropdown-toggle'))
    {
        $(".nav-item").removeClass('active');
        $(this).parent().addClass('active');
    }
});

function tools(tool)
{
    $("#toolsFrame").attr("src", "https://www.generation-jdr.fr/index.php?page=" + tool)
    $("#tools").modal("show")
}

$("[id|=link").click(function(){
    $("#map").fadeOut(0);
    $("#mob").fadeOut(0);
    $("#pj").fadeOut(0);
    $("#tree-map").fadeOut(0);
    $("#tree-mob").fadeOut(0);
    $("#tree-pj").fadeOut(0);
    $("#right-map").fadeOut(0);
    $("#right-timeline").fadeOut(0);

    $("#" + $(this).attr("id").replace("link-", "")).fadeIn(500);
    $("#tree-" + $(this).attr("id").replace("link-", "")).fadeIn(500);
    $("#right-" + ($(this).attr("id").replace("link-", "") == "map" ? "map" : "timeline")).fadeIn(500);
})

let treeMap = new dhx.Tree("tree-map", {
    data: map,
    isFolder: function(item)
    {
        return typeof item.items !== 'undefined'
    },
    css: "treeClass",
    icon: {
        folder: "fas fa-folder",
        openFolder: "fas fa-folder-open",
        file: "fas fa-map"
    }
})

let treePC = new dhx.Tree("tree-pj", {
    data: pj,
    isFolder: function(item)
    {
        return typeof item.items !== 'undefined'
    },
    css: "treeClass",
    icon: {
        folder: "fal fa-users",
        openFolder: "fal fa-users",
        file: "fal fa-user"
    }
})

let treeMob = new dhx.Tree("tree-mob", {
    data: mob,
    isFolder: function(item)
    {
        return typeof item.items !== 'undefined'
    },
    css: "treeClass",
    icon: {
        folder: "fas fa-dungeon",
        openFolder: "fas fa-dungeon",
        file: "fas fa-dragon"
    }
})

treeMob.events.on("itemdblClick", function(id, elem){
    console.log(id)
    console.log(elem);
});