📝 `NOTE` Use this template to initialize the contents of a README.md file for your application. As you work on your assignment over the course of the week, update the required or stretch features lists to indicate which features you have completed by changing `[ ]` to `[x]`. (🚫 Remove this paragraph before submitting your assignment.)

## Unit Assignment: Kudos Board

Submitted by: **NAME**

Deployed Application (optional): [Kudos Board Deployed Site](ADD_LINK_HERE)

### Application Features

#### CORE FEATURES

- [x] **Home Page**
  - [x] Displays header, banner, search, board grid, and footer.
  - [x] Displays preview of all boards on initial page load.
    - [x] Boards previews should show an image/gif and board title.
  - [x] Users can click on a category (recent, celebration, thank you, inspiration) to filter the boards.
    - [x] Recent displays most recently created boards.
    - [x] Other categories display boards of that type.
  - [x] Users can search for a board by name.
  - [x] Users can click on a board to navigate to a new page containing that board.
  - [x] Users can create a new board.
    - [x] Boards should have a title, category, and author (optional).
  - [x] User can delete boards.
  
- [x] **Board Page**
  - [x] Displays a list of all cards for a board.
    -  [x] Each card features a text message.
    -  [x] Each card features a gif found using the [GIPHY API](https://developers.giphy.com/docs/api/).
    -  [x] Users can optionally sign the card as the author.  
-   [x] Cards can be upvoted.
-   [x] Cards can be deleted.


#### STRETCH FEATURES


- [x] **Deployment**
  - [x] Website is deployed via Render.
- [x] **Comments**
  - [x] Users should be able to comment on cards.


### Walkthrough Video
<div>
    <a href="https://www.loom.com/share/5b47abc1e28c49b19bb6c7fdb066d597">
      <p>Kudos Board Website Demo 🌟 - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/5b47abc1e28c49b19bb6c7fdb066d597">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/5b47abc1e28c49b19bb6c7fdb066d597-with-play.gif">
    </a>
  </div>

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

The labs were incredibly helpful in setting up databases. Especially lab 4, where the connection between the frontend and backend happens I found that the instruction were incredibly heplful. I thought that the instructions for setting up on render with a full stack were confusing, and have had a lot of trouble setting that up as a result. I felt the largest issue for me was the differences betwee hosting on your local server and on the render.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
I would have certainly added more style (currently the website is relatively barren since I focused on core features). I would make sure that the website was working properly on render, and I would also fix the delayde  response bugs that I get where a form submission does not update the display even though useEffects are used.

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

I wish I had no bugs in my final product, but that is what happens when it is your first time mixing front end and back end. I think I would build my backend first next time and work my front end around that and not the other way around. In this way I think I could avoid a lot of the bug that I got when I tried to shove back end into spaces that was designed for front end code.

### Open-source libraries used


### Shout out

Huge shoutout to Marvin for working with me the whole week!