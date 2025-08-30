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

const now = new Date();
document.getElementById("datetime").innerText = now.toLocaleDateString() + " " + now.toLocaleTimeString()

