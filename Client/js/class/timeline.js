class TimeLine
{
    constructor(array = null)
    {
        if(array == null)
            this.array = [];
        else
            this.array = array;
        this.Trie();
    }

    Trie()
    {
        for(let i = 0; i < this.array.length - 1; i++)
        {
            let max = this.array[i].init;
            let index = i;
            for(let j = i + 1; j < this.array.length; j++)
            {
                if(max < this.array[j].init)
                {
                    max = this.array[j].init;
                    index = j;
                }
            }

            let tmp = this.array[index];
            this.array[index] = this.array[i];
            this.array[i] = tmp;
        }
    }

    GetTimeLine(activeIndex)
    {
        let timeline = '';
        let i = 0;
        this.array.forEach(elem => {
            timeline += '' + 
            '<div id="' + elem.id + '-timeline" class="col-12">' + 
                '<span style="font-size: small">' + 
                    elem.name + '<br>' +
                    '<img class="timeline' + ((activeIndex != null && i == activeIndex) ? '-active' : '') + '" src="' + elem.token + '" alt="CA: ' + elem.ac + '"><br>' +
                    'CA: ' + elem.ac + 
                '</span><br>' + (i == this.array.length - 1 ? '' : '<span style="color: #e95420; font-weight: bold;">|</span>') +
            '</div>';
            i++;
        });
        return timeline;
    }

    AddMob(id, name, token, init, ac)
    {
        let mob = {
            id: id,
            name: name,
            token: token,
            init: init,
            ac: ac
        }
        this.array.push(mob);
        this.Trie();
    }

    RemoveMob(id)
    {
        let index = 0;
        let i = 0;
        this.array.forEach(elem => {
            if(elem.id == id)
                index = i;
            i++
        });
        this.array.splice(index, 1);
        this.Trie();
    }
}