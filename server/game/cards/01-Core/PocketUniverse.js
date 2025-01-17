const Card = require('../../Card.js');

class PocketUniverse extends Card {
    setupCardAbilities(ability) {
        this.persistentEffect({
            effect: ability.effects.keyAmber(this)
        });

        this.action({
            cost: ability.costs.loseAmber(),
            gameAction: ability.actions.placeAmber()
        });
    }
}

PocketUniverse.id = 'pocket-universe'; // This is a guess at what the id might be - please check it!!!

module.exports = PocketUniverse;
