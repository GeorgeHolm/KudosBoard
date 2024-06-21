import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./Card.css";
import propTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";
const Card = (props) => {
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [fetcher, setFetcher] = useState(0);

  useEffect(() => {
    console.log(fetcher);
    fetch(`${import.meta.env.VITE_BACKEND_LINK}/boards/${props.card?.id}/comments`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON data from the response
      })
      .then((data) => {
        // Handle successful response
        setComments(data); //want it to refresh after this
        console.log("comments:", data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [fetcher]);

  const addLike = () => {
    fetch(`${import.meta.env.VITE_BACKEND_LINK}/cards/${props.card.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: props.card.title,
        description: props.card.description,
        gif: props.card.gif,
        likes: props.card.likes + 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    props.setFetcher(props.fetcher + 1);
  };

  const deleteCard = () => {
    console.log("deleting card");

    fetch(`${import.meta.env.VITE_BACKEND_LINK}/cards/${props.card.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    props.setFetcher(props.fetcher + 1);
  };

  const comment = () => {
    setFetcher(fetcher + 1);

    console.log("key: " + props.card.id);
    fetch(`${import.meta.env.VITE_BACKEND_LINK}/${props.card.id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: commentContent,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data + fetcher))
      .catch((error) => console.error(error));

    setFetcher(fetcher + 1);
    console.log(fetcher);
  };

  const content = (e) => {
    setCommentContent(e.target.value);
  };
  return (
    <>
      <div className="card">
        <div className="wide">
          <span className="flex">
            <img className="gif" src={props.card.gif} />
            <h2 className="content"> {props.card.title}</h2>
            <p className="content">{props.card.description}</p>
            <div className="floatright">
              <button onClick={addLike}>{props.card.likes}</button>
              <button onClick={deleteCard}>x</button>
            </div>
          </span>
        </div>
        <div id="commenter">
          <label>Comment:</label>
          <input
            type="text"
            required
            value={commentContent}
            onChange={content}
          />
          <button onClick={comment} className="content">
            Comment
          </button>
        </div>
      </div>

      <div>
        {comments
          .sort((b, a) => a.id - b.id)
          .map((res) => (
            <Comment
              fetcher={fetcher}
              setFetcher={setFetcher}
              key={res.id}
              id={res.id}
              content={res.content}
            />
          ))}
      </div>
    </>
  );
};

export default Card;
