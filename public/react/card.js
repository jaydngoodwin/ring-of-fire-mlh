class CardTemp extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            
        }
    }
    
    render() {
        return e("div", {
            className: "bordered clickable hover",
            style: {
                width: "100px",
                height: "160px",
                display: "inline-block"
            },
            onClick: () => this.props.app.setState({
                screen: "rule",
                showCard: this.props.number
            })
        }, "placeholder card #" + this.props.number)
    }
}