window.addEventListener("load", pageLoad);
  
function pageLoad(){
    getRoom()
    getData()
}


function getUrlVars() {
    let vars = {}
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
      vars[key] = value
    })
    return vars
  }
  
  let room
  function getRoom() {
    room = getUrlVars()["room"]
    return room
  }

async function getData(){
  const  url = `/api/data?room=${room}`
  const response = await fetch(url)
  const result = await response.json()
  displayHistory(result)
}

function displayHistory(data){
    const list = document.getElementById("data")
    for (let i = 0; i < data.length; i++) {
        const entry = document.createElement("tr")
        const time = document.createElement("td")
        const temp = document.createElement("td")
        const humi = document.createElement("td")
        time.textContent = data[i].datetime
        temp.textContent = data[i].tempC
        humi.textContent = data[i].humidity
        entry.appendChild(time)
        entry.appendChild(temp)
        entry.appendChild(humi)
        list.appendChild(entry)
      }
}