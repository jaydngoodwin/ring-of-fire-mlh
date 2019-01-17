class CardRule extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            
        }
    }
    
    render() {
        return e("div", {className: "card-rule fullscreen grid3x3 animated fadeIn faster"},
            e("div", {id: "rule", className: "animated fadeInUp"},
                e("div", null, "card rule for card #" + this.props.number),
                e("button", {onClick: () => {
                    $("#rule").animateCss("fadeOutDown", () => {
                        this.props.app.setState({screen: "game"})
                    });
                }}, "close")
            )
        );
    }
}