window.addEventListener("load", pageLoad);
  
function pageLoad(){
    getData()
}

async function getData(){
  const url = `/api/rooms`;
  const response = await fetch(url);
  const result = await response.json()
  displayRoomList(result)
}

async function displayRoomList(list){
    const driveList = document.getElementById("room-list")
    for(let i = 0; i < list.length; i++) {
        let a = document.createElement('a');
        const tile = document.createElement("div")
        tile.id = "tile"
        const icon = document.createElement("IMG")
        icon.setAttribute("src", "/image/nas-icon.png")
        let name = document.createElement("figcaption")
        name.textContent = list[i].room_name
        let roomName = list[i].room_name
        a.setAttribute("href",'room.html?room='+roomName)
        a.appendChild(icon)
        tile.appendChild(a)
        tile.appendChild(name)
        driveList.appendChild(tile)
    }
}