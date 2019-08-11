import React, { useRef } from "react"; //import ref

const CELLS_X = 5;
const CELLS_Y = 5;

const getCells = (turn: number, nextTurn) => {
  const rows = [];
  const reference_cell = []; //ref array
  for (let y = 0; y < CELLS_Y; y++) {
    const cells = [];
    reference_cell[y] = []; //
    for (let x = 0; x < CELLS_X; x++) {
      reference_cell[y][x] = useRef(`${y}-${x}`);
      cells.push(
        <div
          className="Cell"
          key={`${y}-${x}`}
          ref={reference_cell[y][x]} //reference cell
          onClick={() => {
            if (checkRowValid(y, reference_cell)) {
              boxClicked(y, x, reference_cell[y][x], turn);
              nextTurn();
              setTimeout(() => {
                checkWinner(reference_cell);
              }, 500);
            } else {
              alert("Follow the Rules Please");
            }
          }}
        />
      );
    }
    console.log("THIS IS CELLS", cells);
    rows.push(
      <div className="Row" key={y}>
        {cells}
      </div>
    );
  }

  return rows;
};

const checkWinner = reference_cell => {
  //validating winner
  console.log("REFF", reference_cell);
  reference_cell.forEach(row => {
    let point = row.map(cell => {
      return cell.current.classList.value;
    });
    let user_1_point = point.filter(p => p == "User1");
    let user_2_point = point.filter(p => p == "User2");
    if (user_1_point.length == 4) {
      alert("user 1 won");
    } else if (user_2_point.length == 4) {
      alert("user 2 won");
    }
  });
};
const checkRowValid = (y, reference_cell) => {
  //Cells can only be filled from the bottom up
  if (reference_cell[y + 1]) {
    let valid = false;
    reference_cell[y + 1].forEach(element => {
      if (!element.current.classList.contains("Cell")) {
        valid = true;
      }
    });
    return valid;
  } else {
    return true;
  }
};

const boxClicked = (y: number, x: number, inputEl, turn: number) => {
  //Updating cellName with User1 or User2
  console.log(y, x);
  inputEl.current.classList.remove("Cell");
  inputEl.current.classList.add(turn == 0 ? "User1" : "User2"); //styiling for users
};

interface Props {
  nextTurn: () => {};
}

const Board = ({ nextTurn, turn }: Props) => (
  <>
    <div className="Board">{getCells(turn, nextTurn)}</div>
    <button //Button to reset game
      className="Reset"
      onClick={() => {
        location.reload(true);
      }}
    >
      Reset Game
    </button>
  </>
);

export default Board;
