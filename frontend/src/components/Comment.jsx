import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./Comment.css";
import propTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

const Comment = (props) => {

    
  const deleteComment = () => {
    props.setFetcher(props.fetcher + 1);

    console.log("deleting comment");
    console.log(props.fetcher);

    fetch(`http://localhost:3000/comments/${props.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data + props.fetcher))
      .catch((error) => console.error(error));
    props.setFetcher(props.fetcher + 1);
  };
  return (
    <div className="comment">
        <p className="left">
            {props.content}
        </p>
        <span className="right">
          <button onClick={deleteComment} className="content">
            x
          </button>
        </span>
    </div>
  );
};

export default Comment;
