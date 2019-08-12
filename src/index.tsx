import React, { useState } from "react";
import ReactDOM from "react-dom";

import { PlayerDisplay, Header, Board } from "./components";

import { PLAYERS } from "./data";

const Main = () => {
  const [turn, setTurn] = useState<number>(0);

  const nextTurn = () => {
    const next = turn + 1;
    const overflow = next > PLAYERS.length - 1;
    setTurn(overflow ? 0 : next);
  }; //player identification

  return (
    <div className="Page">
      <Header />
      <div className="Content">
        <PlayerDisplay turn={turn} />
        <Board nextTurn={nextTurn} turn={turn} />
      </div>
    </div>
  );
};

const container = document.getElementById("root");
ReactDOM.render(<Main />, container);
