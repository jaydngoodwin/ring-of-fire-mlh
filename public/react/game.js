class Game extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            // card to show
        }
    }
    
    render() {
        return e("div", null,
            e("div", null, "this is the game"),
            this.createCards(),
            this.createCardRule()
        );
    }

    createCards() {
        var cards = range(4).map(i =>
            e(CardTemp, {key: i, app: this.props.app, number: i})
        );
        return cards;
    }

    createCardRule() {
        if (this.props.showCard == null) {
            return null;
        }
        return e(CardRule, {number: this.props.showCard, app: this.props.app});
    }
}