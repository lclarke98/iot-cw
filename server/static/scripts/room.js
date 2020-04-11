window.addEventListener("load", pageLoad);

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

function pageLoad(){
    getRoom()
    openCity(event, 'main')
    getCurrentData()
    getAllData()
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

async function getAllData(){
  const  url = `/api/data?room=${room}`
  const response = await fetch(url)
  const result = await response.json()
  displayHistory(result)
}

async function getCurrentData(){
  const  url = `/api/currentData?room=${room}`
  const response = await fetch(url)
  const result = await response.json()
  displayCurrentData(result)
}

function displayCurrentData(data){
  const currentTemp = document.getElementById("current-temp")
  const currentHumi = document.getElementById("current-humi")
  currentTemp.textContent = data[0].tempC
  currentHumi.textContent = data[0].humidity 
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