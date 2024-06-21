import React from "react";
import ReactDOM from "react-dom";
import "./Details.css";
import { Link } from "react-router-dom";
import Card from "./Card";
import { useState, useEffect } from "react";


const Details = (props) => {
  const [cards, setCards] = useState([]);
  const [fetcher, setFetcher] = useState(0);

  const [formTitle, setFormTitle] = useState("");
  const [formAuthor, setFormAuthor] = useState("");
  const [formGif, setFormGif] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [cardGif, setCardGif] = useState("");

  const title = (e) => {
    setFormTitle(e.target.value);
  };
  const author = (e) => {
    setFormAuthor(e.target.value);
  };
  const description = (e) => {
    setFormDescription(e.target.value);
  };
  const gif = (e) => {
    setFormGif(e.target.value);
  };
  
  const [onOff, setOnOff] = useState({
    display: "none",
  });

  console.log("details fetch: " + fetcher); //why do i need this console.log for everything to update?
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_LINK}/boards/${props.board?.id}/cards`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON data from the response
      })
      .then((data) => {
        // Handle successful response
        setCards(data);
        console.log("Cards:", data);
      })
      .catch((error) => {
        console.error("Error fetching cards:", error);
      });
  }, [fetcher]);




  const setDetails = () => {
    fetch(`${import.meta.env.VITE_BACKEND_LINK}/boards/${props.board?.id}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formTitle,
        description: formDescription,
        gif: cardGif,
        author: formAuthor,
        likes: 0,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    setFetcher(fetcher + 1);

    setCardGif("https://media1.giphy.com/media/14kqI3Y4urS3rG/200.gif?cid=72ae070c5k6nsxkj85lkklr9tq4r4fwbiycmsnamikr4tcab&amp;ep=v1_gifs_search&amp;rid=200.gif&amp;ct=g")
  };

  console.log(props.board);


  const exit = () => {
    setOnOff({ display: "none" });
  };

  
  const handleNewBoard = () => {
    if (onOff.display === "none") {
      setOnOff({ display: "block" });
    } else {
      setOnOff({ display: "none" });
    }

    console.log(onOff.display);
  };

  const [results, setResults] = useState([]);
  const searchGif = (e) => {

    e.preventDefault();

    const url = "http://api.giphy.com/v1/gifs/search?q=" + formGif + "&api_key=" + import.meta.env.VITE_API_KEY + "&limit=20";
    console.log("The url: " + url);


    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setResults(res.data);
        console.log("here be gifs");
        console.log(res.data);
      }) //spread operator
      .catch((err) => console.error("error:" + err));
  }


  const setCG = (e) => {
    console.log(e.target.currentSrc);
    setCardGif(e.target.currentSrc);
  }
  


  return (
    <>
      <section id="details">
        <Link to="/">
          <button>x</button>
        </Link>

        <section className="new-board-form" style={onOff}>
          <button className="close-btn" onClick={exit}>
            X
          </button>
          <form onSubmit={setDetails}>
            <h2>Create a New Card</h2>
            <label>Title:</label>
            <input type="text" required value={formTitle} onChange={title} />
            <label>Category:</label>
            <label>Author:</label>
            <input type="text" value={formAuthor} onChange={author} />
            <label>Description:</label>
            <input type="text" required value={formDescription} onChange={description} />
            <label>Gif:</label>
            <input type="text" required value={formGif} onChange={gif} />
            <section className="gif-container">
                {results.map((res, idx) => (
              <img
              onClick={setCG}
                  className="gif"
                  key={idx}
                  value={res.images.fixed_height.url}
                src={res.images.fixed_height.url}
              />
            ))}
            </section>
            <button className="close-btn" required onClick={searchGif}>
              Search GIF
            </button>
            <button className="submit" type="submit">
              Create Board
            </button>
          </form>
        </section>

        <section>
          <button onClick={handleNewBoard}>Post</button>
        </section>
        <h1>{props.board?.title}</h1>
        <section>
          {cards
            .sort((b, a) => a.likes - b.likes)
            .map((res) => (
              <Card
                fetcher={fetcher}
                setFetcher={setFetcher}
                key={res.id}
                card={res}
                gif={cardGif}
              />
            ))}
        </section>
      </section>
    </>
  );
};

export default Details;
