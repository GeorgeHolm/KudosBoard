import { useState, useEffect } from 'react'

import Boards from './Boards'
import Details from './Details'
import './Home.css'

function Home(props) {
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState("All");


  const handleChange = (e) => {
    setSearchInput(e.target.value);
    console.log(searchInput);
  }

  const handleAll = () => {
    console.log("All");
    setFilter("All");


    fetch(`${import.meta.env.VITE_BACKEND_LINK}/boards`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Parse JSON data from the response
    })
    .then(data => {
      // Handle successful response
      console.log('Boards:', data);
    })
    .catch(error => {
      console.error('Error fetching boards:', error);
    });


  }
  const handleRecent = () => { //ask about the recent page and how it is different from the others!
    console.log("Recent");
    setFilter("Recent");
  }
  const handleCelebration = () => {
    console.log("Celebration");
    setFilter("Celebration");

  }
  const handleThanks = () => {
    console.log("Thank You");
    setFilter("Thank You");

  }
  const handleInspiration = () => {
    console.log("Inspiration");
    setFilter("Inspiration");

  }




  //details

  const[detailsBoard, setDetailsBoard] = useState({});
  const viewBoard = (board) => {
    console.log("board is: ");
    console.log(board);
    setDetailsBoard(board);
    setDetailsOpen(true);
  }

  const[detailsOpen, setDetailsOpen] = useState(false);
  const exitDetails = () => {
    setDetailsOpen(false);
  }



  return (
    <>
      <div id='root'>

        <header>
          <h1>
            KUDOBOARD
          </h1>

          <div>
          <input
            type="text"
            placeholder="Search Boards"
            onChange={handleChange}
            value={searchInput} />
            <div>
              <span>
                <button id="all-button" onClick={handleAll}>
                  All
                </button>
              </span>
              <span>
                <button id="recent-button" onClick={handleRecent}>
                  Recent
                </button>
              </span>
              <span>
                <button id="celebration-button" onClick={handleCelebration}>
                  Celebration
                </button>
              </span>
              <span>
                <button id="thanks-button" onClick={handleThanks}>
                  Thank You
                </button>
              </span>
              <span>
                <button id="inspiration-button" onClick={handleInspiration}>
                  Inspiration
                </button>
              </span>
            </div>
            
          </div>
        </header>
        <main>
          <Boards getter={props.getter} setGetter={props.setGetter} appBoards={props.appBoards} filter={filter} search={searchInput} viewBoard={viewBoard}/>
        </main>
        <footer>
          <span>
            All Rights Reserved |
          </span>
          <span>
            <a href="https://www.linkedin.com/in/george-holm">
              Contact: LinkedIn
            </a>
          </span>
        </footer>
      </div>
    </>
  )
}

export default Home
