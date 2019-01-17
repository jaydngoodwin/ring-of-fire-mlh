function showAllCards() {
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        showCard(card);
    }
}

function showCard(card) {
    // let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    let polygon = getCardPolygon(card);
    document.getElementById("svgBox").appendChild(polygon);

    // svg.appendChild(polygon);
    // document.getElementById("svgBox").appendChild(svg);
}

function getCardPolygon(card) {

    let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    let pointList = "";

    let points = card.corners();

    let viewSize = [10,10];

    for (let i = 0; i < points.length; i++) {
        let current = [];
        current[0] = points[i].x;
        current[1] = points[i].y;    

        current[0] = current[0] + viewSize[0] / 2;
        current[1] = current[1] + viewSize[1] / 2;

        pointList += current[0] + "," + current[1] + " ";
    }
    polygon.setAttribute("points", pointList);
    polygon.setAttribute("style", "fill: #698469; stroke: black; stroke-width: 0.01");
    polygon.setAttribute("id", "card-" + card.id);
    polygon.setAttribute("onclick", `move(${card.id})`);

    return polygon;
}

function move(id) {
    // movingCard = document.getElementById("card-" + id);
    if (movingCardID == id) {
        // replaceCard(id, )
        movingCardID = undefined;
    } else {
        movingCardID = id;
    }
    
    // polygon
}

function replaceCard(i, card) {
    cards[i] = card;
}
