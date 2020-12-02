class Mob
{
    constructor(id, name, token, pv, xp, str, dex, con, int, sag, cha, danger, sense, save, speed, ac, type_ac, skill, action, capacities)
    {
        this.id = id;
        this.name = name;
        this.token = token;
        this.formula = pv;
        this.pv = 0;
        this.xp = xp;
        this.for = str;
        this.dex = dex;
        this.con = con;
        this.int = int;
        this.sag = sag;
        this.cha = cha;
        this.init = 0;
        this.danger = danger;
        this.sense = sense;
        this.save = save;
        this.speed = speed;
        this.ac = ac;
        this.type_ac = type_ac;
        this.skill = skill;
        this.action = action;
        this.capacities = capacities;

        this.Generate()
    }

    Generate()
    {
        let fnPV = this.formula.split(';');
        this.pv = parseInt(fnPV[2]);
        for(let i = 0; i < fnPV[0]; i++)
        {
            this.pv += Math.floor(Math.random() * 1000) % fnPV[1] + 1
        }

        this.init = (Math.floor(Math.random() * 1000) % 20 + 1) + this.GetMod('dex');
    }

    GetMod(stat)
    {
        return Math.floor((this[stat] - 10) / 2);
    }

    GetCard(id) 
    {
        let saves = this.save.split(';');
        let cardId = this.name.replace(' ', '_') + '-' + id;
        let card = '' + 
        '<div class="col-12" id="' + cardId + '" style="margin-bottom: 15px;">' +
            '<div class="card bg-dark border-primary">' +
                '<div class="row">' +
                    '<div class="col-3">' +
                        '<img class="img-fluid" style="border-radius: 25%; margin-left: 5%; margin-top: 5%;" src="' + this.token + '" alt=""> <br>' +
                        '<strong>Compétences</strong>: ' + this.skill + ' <br>' +
                        '<strong>Sens</strong>: ' + this.sense +
                    '</div>' +
                    '<div class="col-4">' +
                        '<table style="width: 100%;">' +
                            '<tr>' +
                                '<td><strong>Nom</strong>: ' + this.name + ' ' + id + '</td>' +
                                '<td><strong>Dangerosité</strong>: ' + this.danger + '</td>' +
                            '</tr>' +
                        '</table>' +
                        '<br>' +
                        '<table>' +
                            '<tr>' +
                                '<td style="width: 20%;"><input id="' + cardId + '-mob' + '" value="' + this.pv + '" type="number" min="0" class="form-control mobInput"></td>' +
                                '<td style="width: 35%;">&nbsp;&nbsp;/ ' + this.pv + ' PV (' + this.xp + ' XP)</td>' +
                                '<td></td>' +
                            '</tr>' +
                        '</table>' +
                        '<br>' +
                        '<table class="table table-bordered table-sm table-dark table-striped" style="font-size: small;">' +
                            '<tr>' +
                                '<th>FOR</th><th>DEX</th><th>CON</th><th>INT</th><th>SAG</th><th>CHA</th>' +
                            '</tr>' +
                            '<tr>' +
                                '<td>' + this.for + ' (' + (this.GetMod('for') < 0 ? this.GetMod('for') : "+" + this.GetMod('for')) + ')</td>' +
                                '<td>' + this.dex + ' (' + (this.GetMod('dex') < 0 ? this.GetMod('dex') : "+" + this.GetMod('dex')) + ')</td>' +
                                '<td>' + this.con + ' (' + (this.GetMod('con') < 0 ? this.GetMod('con') : "+" + this.GetMod('con')) + ')</td>' +
                                '<td>' + this.int + ' (' + (this.GetMod('int') < 0 ? this.GetMod('int') : "+" + this.GetMod('int')) + ')</td>' +
                                '<td>' + this.sag + ' (' + (this.GetMod('sag') < 0 ? this.GetMod('sag') : "+" + this.GetMod('sag')) + ')</td>' +
                                '<td>' + this.cha + ' (' + (this.GetMod('cha') < 0 ? this.GetMod('cha') : "+" + this.GetMod('cha')) + ')</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td>' + saves[0] + '</td>' +
                                '<td>' + saves[1] + '</td>' +
                                '<td>' + saves[2] + '</td>' +
                                '<td>' + saves[3] + '</td>' +
                                '<td>' + saves[4] + '</td>' +
                                '<td>' + saves[5] + '</td>' +
                            '</tr>' +
                        '</table>' +
                        '<strong>Initiative</strong>: ' + this.init + ' <br>' +
                        '<strong>Vitesse</strong>: ' + this.speed + ' <br>' +
                        '<strong>CA</strong>: ' + this.ac + ' (' + this.type_ac + ')' +
                    '</div>' +
                    '<div class="col-5">' +
                        '<div style="border-bottom: solid 1px #e95420; margin-left: 2%; margin-right: 2%;">' +
                            '<button class="btn btn-link" data-toggle="collapse" data-target="#' + cardId + '-action" aria-expanded="true" aria-controls="collapseOne">' +
                                '<h3>Actions</h3>' +
                            '</button>' +
                        '</div>' +
                        '<div id="' + cardId + '-action" class="collapse">' +
                            this.action +
                        '</div>' +

                        '<div style="border-bottom: solid 1px #e95420; margin-left: 2%; margin-right: 2%;">' +
                            '<button class="btn btn-link" data-toggle="collapse" data-target="#' + cardId +'-capacities" aria-expanded="true" aria-controls="collapseOne">' +
                                '<h3>Capacités</h3>' +
                            '</button>' +
                        '</div>' +
                        '<div id="' + cardId + '-capacities" class="collapse">' +
                            this.capacities +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';

        return card;
    }
}

class Mobs
{
    constructor()
    {
        this.array = [];
        let xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        

        this.array.push(new Mob(1, 'Gobelin', 'file/mob/Gobelin.png', '2;6;0', 50, 8, 14, 10, 10, 8, 8, '1/4',
        'Vision dans le noir 18 m, Perception passive 9', '0;0;0;0;0;0', '9 m', 15, 'armure de cuir, bouclier', 'Discretion +6',
        '<b><i>Arc court</i></b>. <i>Attaque d\'arme à distance</i> : +4 pour toucher, portée 24/96 m, une cible.<br><i>Touché</i> : 5 (1d6+2) dégâts perforants.<br><br><b><i>Cimeterre</i></b>. <i>Attaque d\'arme au corps à corps</i> : +4 pour toucher, allonge 1,50 m, une cible.<br><i>Touché</i> : 5 (1d6+2) dégâts tranchants.',
        '<b><i>Fuite agile</i></b>. Le gobelin peut effectuer l\'action se désengager ou se cacher par une action bonus à chacun de ses tours.'));
        this.array.push(new Mob(2, 'Gobelin archer', 'file/mob/Gobelin archer.png', '2;6;0', 50, 8, 14, 10, 10, 8, 8, '1/4',
        'Vision dans le noir 18 m, Perception passive 9', '0;0;0;0;0;0', '9 m', 15, 'armure de cuir, bouclier', 'Discretion +6',
        '<b><i>Arc court</i></b>. <i>Attaque d\'arme à distance</i> : +4 pour toucher, portée 24/96 m, une cible.<br><i>Touché</i> : 5 (1d6+2) dégâts perforants.<br><br><b><i>Cimeterre</i></b>. <i>Attaque d\'arme au corps à corps</i> : +4 pour toucher, allonge 1,50 m, une cible.<br><i>Touché</i> : 5 (1d6+2) dégâts tranchants.',
        '<b><i>Fuite agile</i></b>. Le gobelin peut effectuer l\'action se désengager ou se cacher par une action bonus à chacun de ses tours.'));
    }

    GetMobById(id)
    {
        let mob = null;
        this.array.forEach(elem => {
            if(elem.id == id) {mob = elem;}
        });
        return mob;
    }
}