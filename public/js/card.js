class Card {

    constructor(id, suit, value, degree, distance, rotation, taken) {
        this.id = id;
        this.suit = suit;
        this.value = value;
        this.degree = degree;
        this.distance = distance;
        this.rotation = rotation;
        this.taken = taken;
    }

    centre() {
        return toCartesian({r: this.distance, theta: this.degree});
    }

    corners() {
        let centre = this.centre()

        let topRight = rotate({
            // before rotation
            x: cardWidth / 2,
            y: cardHeight / 2
        }, this.rotation);
        topRight.x += centre.x;
        topRight.y += centre.y;

        let bottomRight = rotate({
            x: cardWidth / 2,
            y: cardHeight / 2 * -1
        }, this.rotation);
        bottomRight.x += centre.x;
        bottomRight.y += centre.y;
        
        let bottomLeft = rotate({
            x: cardWidth / 2 * -1,
            y: cardHeight / 2 * -1
        }, this.rotation);
        bottomLeft.x += centre.x;
        bottomLeft.y += centre.y;
        
        let topLeft = rotate({
            x: cardWidth / 2 * -1,
            y: cardHeight / 2
        }, this.rotation);
        topLeft.x += centre.x;
        topLeft.y += centre.y;

        return [
            topRight,
            bottomRight,
            bottomLeft,
            topLeft
        ];

    }

    // also need to check card.overlapWith(this)
    overlapWith(card) {

        if (distance(this.centre(), card.centre()) < cardWidth) {
            return true;
        }

        let myCorners = this.corners();
        let targetCorners = card.corners()

        for (let i = 0; i < myCorners.length; i++) {
            let corner = myCorners[i];
            if (isWithinPerimeter(corner, targetCorners)) {
                return true;
            }
        }

        return false;

        function isWithinPerimeter(point, perimeter) {
            let crossovers = 0;
            for (let i = 0; i < perimeter.length; i++) {
                let current = perimeter[i];
                let next = function () {
                    if (i == perimeter.length - 1) {
                        return perimeter[0];
                    } else {
                        return perimeter[i + 1];
                    }
                }();
                let crossed = intersects(
                    current.x, current.y, 
                    next.x, next.y, 
                    middleRadius * -2, point.y, 
                    point.x, point.y
                );
                if (crossed) { crossovers++; }
            }
            if (crossovers % 2 == 1) {
                return true;
            } else {
                return false;
            }

            // returns true iff the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
            function intersects(a, b, c, d, p, q, r, s) {
                var det, gamma, lambda;
                det = (c - a) * (s - q) - (r - p) * (d - b);
                if (det === 0) {
                    return false;
                } else {
                    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
                    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
                    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
                }
            }
        }
    }

    
}

