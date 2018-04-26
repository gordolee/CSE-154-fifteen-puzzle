/*
Gordon lee
4/25/18
CSE 154 AA
*/


"use strict";
(function() {

    // global variables
    let emptySquare_X = 300; // left position of empty square
    let emptySquare_Y = 300; // top position of empty square
    let B_SIZE = 4; // denotes the size of the board (number of rows/columns)
    let T_SIZE = 100; // denotes the size of the tiles (in px);

    window.onload = function() {
      makePuzzle();
      $("shuffle-button").onclick = shuffle;
    };

    // place the pieces of the puzzle
    function makePuzzle() {
      for (let i = 1; i < 16; i++) {
        let tile = document.createElement("div");
        tile.innerHTML = i;
        tile.classList.add("tiles");
        if (i >= 1 && i <= 4) {
          tile.style.left = (i-1)*T_SIZE + "px";
          tile.style.top = 0 + "px";
        } else if (i >= 5 && i <= 8) {
          tile.style.left = (i-5)*T_SIZE + "px";
          tile.style.top = 100 + "px";
        } else if (i >= 9 && i <= 12) {
          tile.style.left = (i-9)*T_SIZE + "px";
          tile.style.top = 200 + "px";
        } else {
          tile.style.left = (i-13)*T_SIZE + "px";
          tile.style.top = 300 + "px";
        }

        $("puzzle-area").appendChild(tile);
        let backgroundLeft =  -100 * Math.floor((i-1)/B_SIZE);
        let backgroundTop =  -100 * ((i-1) % B_SIZE);
        tile.style.backgroundPosition = backgroundTop + "px" + " " + backgroundLeft + "px";
        tile.onclick = move;
        tile.onmouseover = hover;
        tile.onmouseout = unhover;
      }
    }

    // click tiles that are eligible to move 1000 times to shuffle
    function shuffle() {
      let tiles = document.querySelectorAll("#puzzle-area div");

      for (let i = 0; i < 1000; i++) {
        let neighbors = [];
        for (let j = 0; j < 15; j++) {
          if (nextToEmpty(tiles[j])) {
            neighbors.push(tiles[j]);
          }
        }

        let randomTile = neighbors[Math.floor(Math.random() * (neighbors.length))];
        randomTile.click();
      }
    }

    // check if the hovered tile is eligible to move
    function hover() {
      if (nextToEmpty(this)) {
        this.classList.add("hovered"); // add necessary class if eligible
      }
    }

    // remove hovered class if no longer hovering
    function unhover() {
      this.classList.remove("hovered");
    }

    // swap the positions of the empty square and the tile you want to move
    function move() {
      let tile_X = parseInt(this.style.left); // record the position of the tile to be moved
      let tile_Y = parseInt(this.style.top);

      if (nextToEmpty(this)) {
        this.style.left = emptySquare_X + "px";
        this.style.top = emptySquare_Y + "px";

        emptySquare_X = tile_X; // set the position of the empty square to the moved sqaure
        emptySquare_Y = tile_Y;
      }
    }

    // check if the tile is neighboring the empty tile
    function nextToEmpty(tile) {
      let x = parseInt(tile.style.left);
      let y = parseInt(tile.style.top);

      if (x == emptySquare_X) { // check if same column
        if (y == emptySquare_Y + T_SIZE || y == emptySquare_Y - T_SIZE) { // check if 1 tile away
          return true;
        }
      } else if (y == emptySquare_Y) { // check if same row
        if (x == emptySquare_X + T_SIZE || x == emptySquare_X - T_SIZE) { // check if 1 tile away
          return true;
        }
      }
      return false;
    }

    function $(id) {
      return document.getElementById(id);
    }
})();
