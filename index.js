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

// DATA BASE DATA BASE DATA BASE DATA BASE DATA BASE DATA BASE DATA BASE DATA BASE DATA BASE 

const counterEl = document.getElementById("counter-el")  // WHITE COUNTING NUMBER
let countInt = parseInt(counterEl.textContent)           // CONVERTS THE NUM STRING TO INT
let localCountInt= JSON.parse(localStorage.getItem("count-key"))// RETREIVES COUNTINT FROM LOCAL STORAGE
const btnCount    = document.getElementById("btn-count") // PUSH BTN
const btnSave     = document.getElementById("btn-save")  // SAVE BTN
const dateListEl  = document.getElementById("datelist-el") // DATE LIST DIV 
const clickListEl = document.getElementById("clicklist-el")// AMOUNT OF CLICKS LIST 
const dateInput   = document.getElementById("date-input") // DATE INPUT
let localDateInput = JSON.parse(localStorage.getItem("date-key")) //RETREIVES DATE INPUT FROM LOCAL STORAGE
const logListEl   = document.getElementById("loglist-el") // LOGLIST
let logList = 0 // LOG START = 0


if(localCountInt){
    countInt = localCountInt
    counterEl.textContent = countInt
    dateInput.value = localDateInput
}

callDateDisplayFromDb ()
callClicksDisplayFromDb()
callLogDisplayFromDb()


// console.log(typeof())
// console.log()




//COUNT EVENT LISTENER
btnCount.addEventListener("click", function(){
    countInt += 1
    localStorage.setItem("count-key",JSON.stringify(countInt))
    localStorage.setItem("date-key",JSON.stringify(dateInput.value))
    counterEl.textContent = countInt
    push(countRef, countInt)
})  


//SAVE
btnSave.addEventListener("click", function(){    
    if (dateInput.value){
        logList += 1
        push(dateRef, dateInput.value) // PUSHES THE DATE TO THE DATA BASE
        push(totalClicksRef, countInt) // PUSH TOTAL NUMBER OF CLICKS TO THE DATA BASE
        push(logRef, logList) //PUSHES THE LOG TO THE DATABASE
        remove(countRef)
        counterEl.textContent = 0
        clearDisplay()
        callDateDisplayFromDb ()
        callClicksDisplayFromDb()
        callLogDisplayFromDb() 
        localStorage.clear("count-key")
        countInt = 0 
        localStorage.clear("date-key")
    } 
})

function clearDisplay(){
    dateListEl.textContent = ""
    clickListEl.textContent = ""
    logListEl.textContent = ""  
}
// FUNCTION THAT INSERTS THE DATE TO THE LIST
function appendToDateList(x){  // ["23/7/2023","26/7/2023","27/7/2023"]
    let selectedDate = x
    let newDateList = document.createElement("li")
    newDateList.textContent = selectedDate
    dateListEl.append(newDateList)
}

function callDateDisplayFromDb (){
    onValue(dateRef, function(snapshot){
        let dbDate = Object.values(snapshot.val())
        let dbDateLength = dbDate.length
        for (let i = 0; i < dbDateLength; i++){
            appendToDateList(dbDate[i])
        }
    })
}

function appendToClickList(x){
    let newCountList = document.createElement("li")
    newCountList.textContent = x 
    clickListEl.append(newCountList)
}

function callClicksDisplayFromDb(){
    onValue(totalClicksRef, function(snapshot){
        let dbClicks = Object.values(snapshot.val())
        let dbClicksLength = dbClicks.length
        for (let i = 0; i < dbClicksLength; i++){
            appendToClickList(dbClicks[i])
        }
    })   
}

function appendToLogList(x){
    let newLogList = document.createElement("li")
    newLogList.textContent = x
    logListEl.append(newLogList)
}

function callLogDisplayFromDb(){
    onValue (logRef, function(snapshot){
        let dbLog = Object.values(snapshot.val()) 
        let dbLogLength = dbLog.length
        for (let i = 0; i < dbLogLength; i++){
            appendToLogList(dbLog[i])
        }   
        logList = dbLog.pop()
    })
}

