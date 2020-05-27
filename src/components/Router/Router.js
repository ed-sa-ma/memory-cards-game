import React, { useEffect, useState } from "react";

import { Board, Menu } from "../";
import useLocationChangeEvent from "../../hooks/useLocationchangeEvent";

export function goToMain() {
  window.history.pushState(null, `Main Page`, `/`);
}

export function goToGame() {
  window.history.pushState(null, `Game Page`, `/game`);
}

export function goToScores() {
  window.history.pushState(null, `Scores Page`, `/scores`);
}

export default function Router() {
  const [path, setPath] = useState("/");
  useLocationChangeEvent();

  // Initialize the path to the current path.
  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  // Attach event Listener to update in page changes.
  useEffect(() => {
    function handleChangeLocation(event) {
      setPath(event.target.location.pathname);
    }

    window.addEventListener("locationchange", handleChangeLocation);

    return () =>
      window.removeEventListener("locationchange", handleChangeLocation);
  }, []);

  return (
    <>
      {path === "/game" && <Board />}
      {path === "/" && <Menu />}
    </>
  );
}
