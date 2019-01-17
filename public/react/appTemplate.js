const e = React.createElement;

class AppTemplate extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            screen: "start",
            showCard: null
        }
    }
    
    render() {
        const app = {
            state: this.state,
            setState: (state, callback = () => {}) => this.setState(state, callback())
        }
        // available screens
        const screens = {
            start: () => this.startGameButton(),
            game: () => e(Game, {app: app}),
            rule: () => e(Game, {app: app, showCard: this.state.showCard})
        };
        return screens[this.state.screen]();
    }

    startGameButton() {
        return e("div", { className: "grid3x3 fullscreen" },
            e("button", {
                onClick: () => 
                    this.setState({screen: "game"})
            }, "start new game"),
            e("svg", {style: {display: "block"}, id: "root"},
                e("rect", {
                    className: "draggable",
                    width: 100,
                    height: 160,
                    transform: "translate(100, 100)",
                    fill: "red",
                    id: "rect1"
                }),
                e("rect", {
                    className: "draggable",
                    width: 100,
                    height: 160,
                    transform: "translate(100, 100)",
                    fill: "red",
                    id: "rect2"
                })
            )
        );
    }
}

// target elements with the "draggable" class
interact('.draggable')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
            restriction: "parent",
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function (event) {
            var textEl = event.target.querySelector('p');

            textEl && (textEl.textContent =
                'moved a distance of '
                + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                    Math.pow(event.pageY - event.y0, 2) | 0))
                    .toFixed(2) + 'px');
        }
    });

function dragMoveListener(event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px) rotate(25deg)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

ReactDOM.render(e(AppTemplate), document.querySelector('#app'));
