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

let ArboMob = [
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
                    },
                    {
                        id: "2",
                        value: "Gobelin archer",
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

// Init

let mobs = new Mobs();

$("#mob").fadeOut(0);
$("#pj").fadeOut(0);
$("#tree-mob").fadeOut(0);
$("#tree-pj").fadeOut(0);
$("#right-timeline").fadeOut(0);


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
    data: ArboMob,
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

// Fonction

$(".nav-link").click(function(){
    if(!$(this).hasClass('dropdown-toggle'))
    {
        $(".nav-item").removeClass('active');
        $(this).parent().addClass('active');
    }
});

function tools(tool)
{
    if(tool == 'perso')
    {
        $("#toolsFrame").attr("src", "https://hnd.lrojon.fr/spellbook");
        $("#tools > div").removeClass('modal-lg').addClass('modal-xl')
        $("#tools").modal("show")
    }
    else
    {
        $("#toolsFrame").attr("src", "https://www.generation-jdr.fr/index.php?page=" + tool)
        $("#tools > div").removeClass('modal-xl').addClass('modal-lg')
        $("#tools").modal("show")
    }
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

treeMob.events.on("ItemDblClick", function(id){
    $(".dhx_tree-list-item--selected").removeClass("dhx_tree-list-item--selected")
    $(".dhx_tree-list-item--focused").removeClass("dhx_tree-list-item--focused")

    let mob = mobs.GetMobById(id);
    mob.Generate();
    let elem = $("[id|=" + mob.name.replace(' ', '_') + "]").last();
    if(elem.length == 0)
    {
        $("#mob").append(mob.GetCard(0))
    }
    else
    {
        console.log(elem);
        $("#mob").append(mob.GetCard(parseInt(elem.attr("id").replace(mob.name + "-", "")) + 1));
    }
});

$("body").on("change", ".mobInput", function(){
    if($(this).val() <= 0)
    {
        let id = $(this).attr("id").replace('-mob', '');
        $("#" + id).fadeOut(1000, function(){
            $("#" + id).remove();
        });
    }
});