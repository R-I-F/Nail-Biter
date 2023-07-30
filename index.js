import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, onValue, ref, push, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://counterapp-fd733-default-rtdb.europe-west1.firebasedatabase.app/"
    }
const app = initializeApp(appSettings)
const database = getDatabase(app)

const countRef = ref(database, "count-reference")
const logRef = ref(database, "log-reference")
const totalClicksRef = ref(database, "clicks-reference")
const dateRef = ref(database, "date-reference")

const counterEl = document.getElementById("counter-el")
let countInt = parseInt(counterEl.textContent)
const btnCount    = document.getElementById("btn-count")
const btnSave     = document.getElementById("btn-save")
const dateListEl  = document.getElementById("datelist-el")
const clickListEl = document.getElementById("clicklist-el") 
const dateInput   = document.getElementById("date-input")
const logListEl   = document.getElementById("loglist-el")
let logList = 0

// console.log(typeof())
// console.log()
onValue(countRef, function(snapshot) {
console.log(snapshot)
    //logArray = Object.values(snapshot.val())
})



btnCount.addEventListener("click", function(){
    countInt += 1
    counterEl.textContent = countInt
    push(countRef, countInt)
})

btnSave.addEventListener("click", function(){
    logList += 1
    appendToDateList()
    appendToClickList()
    appendToLogList()
    counterEl.textContent = 0
    countInt = 0
})

function appendToDateList(){
    let selectedDate = dateInput.value
    let newDateList = document.createElement("li")
    newDateList.textContent = selectedDate
    dateListEl.append(newDateList)
    push(dateRef, selectedDate)
    newDateList.addEventListener("click", function(){
        
    })
}

function appendToClickList(){
    let newCountList = document.createElement("li")
    newCountList.textContent = countInt 
    clickListEl.append(newCountList)
    push(totalClicksRef, countInt)
}

function appendToLogList(){
    let newLogList = document.createElement("li")
    newLogList.textContent = logList
    logListEl.append(newLogList)
    push(logRef, logList)
}

