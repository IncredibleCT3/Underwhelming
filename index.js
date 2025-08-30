const submitBtn = document.getElementById("submit-btn")
const inputArea = document.getElementById("input-area")
const postsContainer = document.getElementById("posts-container")
const goodBtn = document.getElementById("good-btn")
const badBtn = document.getElementById("bad-btn")
const score = document.getElementById("score")

let goodCount = 0
let badCount = 0
let isClicked = ""
let posts = JSON.parse(localStorage.getItem("posts")) || []
restore()

score.innerHTML = `${goodCount} - ${badCount}`

fetch ("https://api.collegefootballdata.com/player/search?searchTerm=Bryce%20Underwood", {
  method: "GET",
  headers: {
    "Authorization": "Bearer TPc42dgNUu7McX+9iUf95m0bTaj2YZjBI/w8c7aOR9CNMm0yNm3nSCZKBusjmzIP"
  }
})
.then (res => res.json())
.then (data => {
    console.log(data)
})

function restore() {
  postsContainer.innerHTML = ""
  posts.forEach(post => {
    if (post.value === "goodBtn") {
      goodCount++
      postsContainer.innerHTML += `
        <div class="post">
            <p>${post.text}</p>
            <p class="date">${post.date}</p>
            <img src="images/happy-face.png" alt="Happy Face" class="emoji-face">
        </div>` 
    }

    if (post.value === "badBtn") {
      badCount++
      postsContainer.innerHTML += `
        <div class="post">
            <p>${post.text}</p>
            <p class="date">${post.date}</p>
            <img src="images/angry-face.png" alt="Angry Face" class="emoji-face">
        </div>`       
    }   
  });
}

submitBtn.addEventListener("click", function() {

  if (isClicked === "goodBtn") {
    if (inputArea.value !== "") {
        let now = new Date();
        postsContainer.innerHTML += `
        <div class="post">
            <p>${inputArea.value}</p>
            <p class="date">${now.toLocaleDateString() + " " + now.toLocaleTimeString()}</p>
            <img src="images/happy-face.png" alt="Happy Face" class="emoji-face">
        </div>
        `

        let post = {
          text: inputArea.value,
          date: now.toLocaleDateString() + " " + now.toLocaleTimeString(),
          value: isClicked
        }

        posts.push(post)   
        localStorage.setItem("posts", JSON.stringify(posts));     
        
        goodCount++
        score.innerHTML = `${goodCount} - ${badCount}`

        goodBtn.classList.add("select-btns")
        goodBtn.classList.remove("select-btns-good")
        isClicked = ""
        inputArea.value = ""
    }
  }

  if (isClicked === "badBtn") {
    if (inputArea.value !== "") {
        let now = new Date();
        postsContainer.innerHTML += `
        <div class="post">
            <p>${inputArea.value}</p>
            <p class="date">${now.toLocaleDateString() + " " + now.toLocaleTimeString()}</p>
            <img src="images/angry-face.png" alt="Angry Face" class="emoji-face">
        </div>
        `
        let post = {
          text: inputArea.value,
          date: now.toLocaleDateString() + " " + now.toLocaleTimeString(),
          value: isClicked
        }

        posts.push(post)
        localStorage.setItem("posts", JSON.stringify(posts)); 

        badCount++
        score.innerHTML = `${goodCount} - ${badCount}`       
        
        badBtn.classList.add("select-btns")
        badBtn.classList.remove("select-btns-bad")
        isClicked = ""
        inputArea.value = ""
    }
  }  
})

goodBtn.addEventListener("click", function() {
  goodBtn.classList.add("select-btns-good")
  goodBtn.classList.remove("select-btns")
  badBtn.classList.add("select-btns")
  badBtn.classList.remove("select-btns-bad")
  isClicked = "goodBtn"
})

badBtn.addEventListener("click", function() {
  badBtn.classList.add("select-btns-bad")
  badBtn.classList.remove("select-btns")
  goodBtn.classList.add("select-btns")
  goodBtn.classList.remove("select-btns-good")
  isClicked = "badBtn"
})

