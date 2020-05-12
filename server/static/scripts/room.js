window.addEventListener("load", pageLoad);

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function pageLoad(){
    getRoom()
    openTab(event, 'main')
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
  console.log(result)
  displayCurrentData(result)
}

function displayCurrentData(data){
  const currentTemp = document.getElementById("current-temp")
  const currentHumi = document.getElementById("current-humi")
  const header = document.getElementById("room-header")
  header.textContent = "Current room temperature and humidity for:  " + room
  currentTemp.textContent = "Current Temerature:  " + data.tempC.toFixed(1) + "°C"
  currentHumi.textContent = "Current Humidity:   " + data.humidity.toFixed(1) + "%" 
}

function displayHistory(data){
    const list = document.getElementById("data")
    for (let i = 0; i < data.length; i++) {
        const entry = document.createElement("tr")
        const time = document.createElement("td")
        const temp = document.createElement("td")
        const humi = document.createElement("td")
        let dt = new Date(Date.parse(data[i].datetime));
        time.textContent = dt
        temp.textContent = parseInt(data[i].tempC).toFixed(1) + "°C"
        humi.textContent = parseInt(data[i].humidity).toFixed(1) + "%"
        entry.appendChild(time)
        entry.appendChild(temp)
        entry.appendChild(humi)
        list.appendChild(entry)
      }
}

