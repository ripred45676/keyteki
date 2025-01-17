const Card = require('../../Card.js');

class SafePlace extends Card {
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

SafePlace.id = 'safe-place'; // This is a guess at what the id might be - please check it!!!

module.exports = SafePlace;
