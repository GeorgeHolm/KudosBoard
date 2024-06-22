import React from "react";
import ReactDOM from "react-dom";
import "./Boards.css";
import KBoard from "./KBoard";

import { useState, useEffect } from "react";

const Boards = (props) => {
  const [boards, setBoards] = useState([]);
  const [formTitle, setFormTitle] = useState("");
  const [formAuthor, setFormAuthor] = useState("");
  const [formType, setFormType] = useState("");
  const [boardIndex, setBoardIndex] = useState(0);
  const [boardData, setBoardData] = useState([]);

  const [onOff, setOnOff] = useState({
    display: "none",
  });

  useEffect(() => {
    console.log("Boards");

    fetch(`${import.meta.env.VITE_BACKEND_LINK}/boards`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON data from the response
      })
      .then((data) => {
        // Handle successful response
        setBoards(data);
        props.appBoards(data);
        console.log("Boards:", data);
      })
      .catch((error) => {
        console.error("Error fetching boards:", error);
      });
  }, [onOff]);

  const handleNewBoard = () => {
    if (onOff.display === "none") {
      setOnOff({ display: "block" });
    } else {
      setOnOff({ display: "none" });
    }

    console.log(onOff.display);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Creating New Board");
    console.log(e.target.value);
    setBoards((prevState) => [
      ...prevState,
      {
        title: formTitle,
        author: formAuthor,
        type: formType,
        id: boardIndex,
        data: boardData,
      },
    ]);

    //attempting backend stuff
    fetch(`${import.meta.env.VITE_BACKEND_LINK}/boards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formTitle,
        type: formType,
        creator: formAuthor,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    setBoardIndex(boardIndex + 1);
    console.log("Title: " + boards[0]);
    setOnOff({ display: "none" });
    props.setGetter(props.getter + 1); //passed from App to cause refresh
  };

  const exit = () => {
    setOnOff({ display: "none" });
  };

  const title = (e) => {
    setFormTitle(e.target.value);
  };

  const author = (e) => {
    setFormAuthor(e.target.value);
  };

  const type = (e) => {
    setFormType(e.target.value);
  };

  const setData = (e) => {
    console.log("setting data");
    console.log(e);
    setBoardData(e);
    console.log(boardData);
  };

  const deleteBoard = (index) => {
    console.log(index);
    setBoards(boards.filter((i) => i.id !== index));

    fetch(`${import.meta.env.VITE_BACKEND_LINK}/boards/${index}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(this.forceUpdate())//REPLACE CONSOLE LOG WITH PROPPED FETCH
      .catch((error) => console.error(error));
  };

  const viewBoard = (board) => {
    props.viewBoard(board);
  };

  return (
    <div id="large-container">
      <section className="new-board-form" style={onOff}>
        <div id="boards">
          <button className="close-btn" onClick={exit}>
            X
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <h2 id="boards">Create a New Board</h2>
          <label id="boards">Title:</label>
          <input
            id="boards"
            type="text"
            required
            value={formTitle}
            onChange={title}
          />
          <label id="boards">Category:</label>
          <select id="boards" required onChange={type}>
            <option value="">Choose a Type</option>
            <option value="Celebration">Celebration</option>
            <option value="Thank You">Thank You</option>
            <option value="Inspiration">Inspiration</option>
          </select>
          <label id="boards">Author:</label>
          <input id="boards" type="text" value={formAuthor} onChange={author} />
          <button id="boards" className="submit" type="submit">
            Create Board
          </button>
        </form>
      </section>

      <div id="boards">
        <button id="create-new-board" onClick={handleNewBoard}>
          Create A New Board
        </button>

        <section className="flex-box">
          {boards
            .filter(
              (i) =>
                (i.type === props.filter || props.filter === "All" || props.filter === "Recent") &&
                i.title.includes(props.search)
            )
            .sort((a, b) => (b.id - a.id))
            .map((res) => (
              <KBoard
                viewBoard={viewBoard}
                deleteBoard={deleteBoard}
                key={res.id}
                features={res}
              />
            ))}
        </section>
      </div>
    </div>
  );
};

export default Boards;
