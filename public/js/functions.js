function getCards() {
    //Process to get a shuffled list of cards with random degree, suit, colour, and rotation
    var cards = [];
    var deck = [];
    const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
    const values = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

    for (let suit in suits) {
      for (let value in values) {
        deck.push({suit: suit,value: value});
      }
    }

    for (i = 0; i < 52; i++) {
        let c = new Card(i,deck[i].suit,deck[i].value,i * (360/52),middleRadius,generateRandomNumber(0,360),false);
        cards.push(c);
    }
    return shuffle(cards);
}

function generateRandomNumber(min , max) {
    return Math.random() * (max-min) + min ;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

// point :: {x, y}
function toPolar(point) {
    let r = Math.sqrt(
        Math.pow(point.x, 2) +
        Math.pow(point.y, 2)
    );
    let theta = Math.atan2(point.y, point.x);
    return {
        r: r,
        theta: theta / (Math.PI / 180)
    }
}

// point :: {r, theta}
function toCartesian(point) {
    let x = point.r * Math.cos(point.theta * (Math.PI / 180));
    let y = point.r * Math.sin(point.theta * (Math.PI / 180));
    return {x: x, y: y};
}

// point :: {x, y}, degree :: 0-360
function rotate(point, degree) {
    let polarPoint = toPolar(point);

    polarPoint.theta += degree;
    
    return toCartesian(polarPoint);
}

function distance(point1, point2) {
    let xdiff = point1.x - point2.x;
    let ydiff = point1.y - point2.y;
    return Math.sqrt(
        Math.pow(xdiff, 2) +
        Math.pow(ydiff, 2)
    )
}

function isOverlapping(e1, e2){
    if( e1.length && e1.length > 1 ){
      e1 = e1[0];
    }
    if( e2.length && e2.length > 1 ){
      e2 = e2[0];
    }
    var rect1 = e1 instanceof Element ? e1.getBoundingClientRect() : false;
    var rect2 = e2 instanceof Element ? e2.getBoundingClientRect() : false;
    
    window.console ? console.log(rect1, rect2 ) : null ;
    var overlap = null;
    if( rect1 && rect2 ){
      overlap = !(
          rect1.right < rect2.left || 
          rect1.left > rect2.right || 
          rect1.bottom < rect2.top || 
          rect1.top > rect2.bottom
        )
      return overlap;  
    } else {
      window.console ? console.warn( 'Please pass native Element object' ) : null;
      return overlap;
    }
}

