function circleBroken() {
    for (let i = 0; i < cards.length; i++) {
        let nexti = i + 1;
        if (i == cards.length - 1) {
            nexti = 0;
        }
        if (cards[i].overlapWith(cards[nexti]) ||
            cards[nexti].overlapWith(cards[i])) {
            
        } else {
            console.log(cards[i]);
            return true;
        }
    }
    return false;
}
