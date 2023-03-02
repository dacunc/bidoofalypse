function random(max, min = 0) {
    return Math.floor(Math.random() * max) + min;
}

const bidoof = {
    params: {
        target: document,
        sprites: [
            'https://www.pokepedia.fr/images/2/22/Sprite_0399_%E2%99%82_NB.png',
            'https://www.pokepedia.fr/images/1/13/Sprite_0399_%E2%99%82_dos_NB.png',
            'https://www.pokepedia.fr/images/c/c9/Sprite_0399_%E2%99%82_chromatique_NB.png',
            'https://www.pokepedia.fr/Fichier:Sprite_0399_%E2%99%80_chromatique_dos_NB.png'
        ],
        size: 100,
        speedInterval: [300, 3000],
        encounterInterval: 500,
    },
    gang: false,
    amount: 0,
    all: [],
    hatch: (amount = 1, params = {}) => {
        params = {...bidoof.params, ...params};
        bidoof.amount++;
        const pkmn = document.createElement('img');
        pkmn.setAttribute('src',  params.sprites[random(params.sprites.length)]);
        pkmn.setAttribute('data-bidoof', bidoof.amount);
        pkmn.style.width = `${params.size}px`;
        pkmn.style.transition = `all ${random(params.speedInterval[1], params.speedInterval[0])}ms`;
        pkmn.style.position = 'absolute';
        document.body.appendChild(pkmn);
        bidoof.all.push(pkmn);
        return pkmn;
    },
    encounter: (amount = 1, params = bidoof.params) => {
        for (let i = 0; i < amount; i++) {
            const pkmn = bidoof.hatch(amount, params);
            bidoof.outside(pkmn);
            bidoof.inside(pkmn)
        }
    },
    invade: (params = bidoof.params) => bidoof.gang = setInterval(() => bidoof.encounter(1, params), bidoof.params.encounterInterval),
    leak: (pkmn = bidoof.all) => pkmn.forEach((pkmn) => bidoof.outside(pkmn)),
    freeze: () => clearInterval(bidoof.gang),
    outside: (pkmn) => {
        pkmn.style.top = `${-pkmn.height}px`;
        pkmn.style.left = `${random(window.innerWidth - pkmn.width)}px`;
    },
    inside: (pkmn) => {
        pkmn.style.top = `${random(window.innerHeight - pkmn.height)}px`;
        pkmn.style.left = `${random(window.innerWidth - pkmn.width)}px`;
    }
}
