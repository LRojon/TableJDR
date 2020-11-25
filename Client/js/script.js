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

let profils = ["Zelkior", "Slooby", "CVC"]
// Init

let mobs = new Mobs();
let timeLine = new TimeLine();
let currentTimelineId = null;
let profil = null

profils.forEach(elem => {
    let append = "<option value='" + elem + "'>" + elem + "</option>";
    $("#initProfils").append(append)
    $("#profils").append(append)
});
$("#initProfil").modal("show");
$("#newProfil").val('');

$("#mob").fadeOut(0);
$("#pj").fadeOut(0);
$("#tree-mob").fadeOut(0);
$("#tree-pj").fadeOut(0);
$("#right-timeline").fadeOut(0);

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

let arrayTimeLine = [
    {
        id: "Gobelin-1",
        name: "Gobelin 1",
        token: 'file/mob/Gobelin.png',
        init: (Math.floor(Math.random() * 1000) % 20 + 1) + 2,
        ac: 15,
    },
    {
        id: "Gobelin-2",
        name: "Gobelin 2",
        token: 'file/mob/Gobelin.png',
        init: (Math.floor(Math.random() * 1000) % 20 + 1) + 2,
        ac: 15,
    },
    {
        id: "Gobelin-3",
        name: "Gobelin 3",
        token: 'file/mob/Gobelin.png',
        init: (Math.floor(Math.random() * 1000) % 20 + 1) + 2,
        ac: 15,
    },
    {
        id: "Gobelin_archer-1",
        name: "Gobelin archer 1",
        token: 'file/mob/Gobelin archer.png',
        init: (Math.floor(Math.random() * 1000) % 20 + 1) + 2,
        ac: 15,
    },
    {
        id: "Gobelin_archer-2",
        name: "Gobelin archer 2",
        token: 'file/mob/Gobelin archer.png',
        init: (Math.floor(Math.random() * 1000) % 20 + 1) + 2,
        ac: 15,
    },
    {
        id: "Gobelin_archer-3",
        name: "Gobelin archer 3",
        token: 'file/mob/Gobelin archer.png',
        init: (Math.floor(Math.random() * 1000) % 20 + 1) + 2,
        ac: 15,
    },
    {
        id: "Gobelin_archer-4",
        name: "Gobelin archer 4",
        token: 'file/mob/Gobelin archer.png',
        init: (Math.floor(Math.random() * 1000) % 20 + 1) + 2,
        ac: 15,
    }
]

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

    let tag = $('[id |="' + mob.name.replace(' ', '_') + '"]:not([id$="timeline"');
    let elem = tag.last();
    let num = null;
    if(elem.length == 0)
        num = 1;
    else
        num = parseInt(elem.attr("id").replace(mob.name.replace(' ', '_') + "-", "")) + 1;
    
    $("#mob").append(mob.GetCard(num));

    timeLine.AddMob(
        mob.name.replace(' ', '_') + '-' + num,
        mob.name + ' ' + num,
        mob.token,
        mob.init,
        mob.ac
    );
    $("#right-timeline").html(timeLine.GetTimeLine())
});

$("#fight").click(function() {
    timeLineNext();
});

$("body").on("change", ".mobInput", function(){
    if($(this).val() <= 0)
    {
        let id = $(this).attr("id").replace('-mob', '');
        $("#" + id).fadeOut(1000, function(){
            $("#" + id).remove();
        });
        $("#" + id + "-timeline").fadeOut(1000, function(){
            $("#" + id + "-timeline").remove();
            timeLine.RemoveMob(id);
        })
    }
});

$("body").keyup(function (e) { 
    if(e.keyCode == 32)
    {
        if($('.nav-item.active>a').attr("id") != 'link-map')
        {
            timeLineNext()
        }
    }
});

function timeLineNext()
{
    if(timeLine.array.length != 0)
    {
        if($(".timeline-active").length == 0)
        {
            $("#right-timeline").html(timeLine.GetTimeLine(0));
            $("#fight").html("Suivant");
        }
        else
        {
            let x = $('#' + timeLine.array[1].id + '-timeline').position().top - $('#' + timeLine.array[0].id + '-timeline').position().top;
            $('div[id$="-timeline"').animate({
                top: "-=" + x,
            }, 400)
            $('#' + timeLine.array[0].id + '-timeline').fadeOut(0, function(){
                let tmp = timeLine.array[0];
                timeLine.array.shift();
                timeLine.array.push(tmp);
                $("#right-timeline").html(timeLine.GetTimeLine(0));
            });
        }
    }
    else
    {
        $("#fight").html("Commencer");
    }
}

$("#profilChoice").click(function(){
    profil = $("#initProfils").val();
    $("#profils").val(profil);
    $("#initProfil").modal("hide");
});

$("#profils").change(function(){
    console.log($(this).val());
});

$("#createProfil").click(function(){
    $("#createProfilModal").modal("show")
});
$("#createProfilP").click(function(){
    $("#initProfil").modal("hide");
    $("#createProfilModal").modal("show");
    $("#createProfilModal").attr("data-backdrop", "static");
});

$("#newProfilBtn").click(function(){
    input = $("#newProfil");
    if(input.val())
    {
        let xhr = XMLHttpRequest();
        xhr.responseType = "json";
        xhr.open("POST", "http://127.0.0.1/DAO/create");
    }
});