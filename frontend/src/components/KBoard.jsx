import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./KBoard.css";
import propTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import defaultImage from "../assets/default.png";


const KBoard = (props) => {

  const handleDelete = () => {

    props.deleteBoard(props.features.id);
  };

  const handleView = () => {
    props.viewBoard(props.features);
  }

  return (
    <div className="kboard">
      <img src={defaultImage} />
      <h2>{props.features.title}</h2>
      <p>{props.features.author}</p>
      <p>{props.features.type}</p>
      <section>
        <Link to={"/" + props.features.id}>
          <button id="view-button" onClick={handleView}>
            View Board
          </button>
        </Link>
        <span>
          <button id="delete-button" onClick={handleDelete}>
            Delete Board
          </button>
        </span>
      </section>
    </div>
  );
};

export default KBoard;
