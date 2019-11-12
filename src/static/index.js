let SECONDS = 60;

function getTime() {
    function tick() {
        var counter = document.getElementById("counter");
        SECONDS--;
        counter.innerHTML = `${SECONDS.toString()} seconds.`;
        if (life <= 0) {
            counter.innerHTML = "Time is up.";
        } else if (SECONDS > 0) {
            setTimeout(tick, 1000);
        } else {
            SECONDS = 0
        }
    }
    tick();

}

function getTiles() {
    let row_nr = 0;
    let col_nr = 0;
    const numberOfRows = document.getElementById('numberOfRows').value
    const numberOfColumns = document.getElementById('numberOfColumns').value
    const table = document.getElementById("myTable");
    let row = document.getElementById("row_" + row_nr);
    for (let i = 0; i < numberOfRows; i++) {
        for (let j = 0; j < numberOfColumns; j++) {
            let cell = row.insertCell(col_nr);
            cell.innerHTML = row_nr + "," + col_nr;
            cell.setAttribute("id", "cell_" + row_nr + "_" + col_nr);
            cell.setAttribute("class", "reflex__tile--bad");
            cell.setAttribute("onclick", "checkTile(this.id)");
            col_nr++;
        }
        col_nr = 0;
        row_nr++;
        row = table.insertRow(row_nr);
        row.setAttribute("id", "row_" + row_nr);
    }
}

function showGoodTile() {
    const numberOfRows = document.getElementById('numberOfRows').value
    const numberOfColumns = document.getElementById('numberOfColumns').value

    function start(counter) {
        let rowNumber = Math.floor(Math.random() * numberOfRows)
        let columnNumber = Math.floor(Math.random() * numberOfColumns)
        if (counter < 30) {
            if (life <= 0) {
                return;
            } else if (SECONDS <= 0) {
                return;
            }
            setTimeout(function() {
                counter++;
                document.getElementById(`cell_${rowNumber}_${columnNumber}`).classList.add('reflex__tile--good');
                document.getElementById(`cell_${rowNumber}_${columnNumber}`).classList.remove('reflex__tile--bad');
                start(counter);
            }, 2000);
            setTimeout(function() {
                counter++;
                document.getElementById(`cell_${rowNumber}_${columnNumber}`).classList.remove('reflex__tile--good');
                document.getElementById(`cell_${rowNumber}_${columnNumber}`).classList.add('reflex__tile--bad');
            }, 4000);
        }
    }
    start(0)

}

let score = 0;
let life = 3;

function checkTile(id) {
    let tile = document.getElementById(id);
    let points = document.getElementById(numberOfPoints);
    let lives = document.getElementById(numberOfLives);
    if (tile.classList.contains('reflex__tile--good')) {
        score++
    } else if (tile.classList.contains('reflex__tile--bad')) {
        life--
    }
    numberOfPoints.innerHTML = `You have ${score} points.`
    numberOfLives.innerHTML = `You have ${life} lives.`

    if (life <= 0) {
        numberOfLives.innerHTML = `You have 0 lives.`
    }
}

function reset() {
    location.reload();
}

function initializingGame() {
    getTime();
    showGoodTile();
    getTiles();
    let start = document.getElementById("start-button")
    let inputs = document.getElementById("inputs")
    start.setAttribute("disabled", true);
    inputs.setAttribute("class", "reflex__item--hidden");
}