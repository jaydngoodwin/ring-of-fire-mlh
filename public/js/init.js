const cardWidth = 1;
const cardHeight = 1.4*cardWidth;

const outerRadius = 4.5*cardWidth;
const middleRadius = 2.5*cardWidth;
const innerRadius = 0.5*cardWidth;

var cards = getCards();
showAllCards(cards);

// var cards = [
//     new Card(1, 0, 10, -90, false),
//     new Card(1, 5, 10, 0, false)
// ]

// for (let i = 0; i < 42; i++) {
//     let card1 = new Card(1, 0, 10, -90, false)
//     let card2 = new Card(1, i, 10, 0, false)

//     console.log({i: i});
    
//     console.log({centrediff: distance(card1.centre(), card2.centre())});
//     console.log({corners1: card1.corners()});
//     console.log({corners2: card2.corners()});
    
//     console.log({card1to2: card1.overlapWith(card2)});
//     console.log({card2to1: card2.overlapWith(card1)});
//     console.log("");
    
// }

var movingCard;
var movingCardID;

$(document).mousemove(function(event) {
    if (!movingCardID) {
        return;
    }
    var width = document.getElementById("svgBox").width.baseVal.value;
    
    console.log(width);

    var currentMousePos = { x: -1, y: -1 };
    currentMousePos.x = event.pageX / (width / 10) - 5;
    currentMousePos.y = event.pageY / (width / 10) - 5;
    var polarMouse = toPolar(currentMousePos);
    var newCard = new Card(movingCardID, "Hearts", "2", polarMouse.theta, polarMouse.r, 0, false);
    document.getElementById("svgBox").replaceChild(getCardPolygon(newCard), document.getElementById("card-" + movingCardID));
    console.log(currentMousePos);
    
});
