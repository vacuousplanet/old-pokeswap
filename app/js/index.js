console.log(__filename)

const {dialog} = require("electron").remote
const {checkswap, validate_saves} = require('./js/checkswap.js')

let file1 = document.getElementById("file1")
let file2 = document.getElementById("file2")

let start = document.getElementById("start")

let filename1 = ''
let filename2 = ''

file1.addEventListener("click", function(){
    filename1 = dialog.showOpenDialogSync()[0]
    if(filename1.length > 0){
        // print feedback
    }
})

file2.addEventListener("click", function(){
    filename2 = dialog.showOpenDialogSync()[0]
    if(filename2.length > 0){
        // print feedback
    }
})

start.addEventListener("click", function() {

    if(validate_saves(filename1, filename2)){
        console.log("Swapping files...")
        checkswap(filename1, filename2)
        console.log("Saves should now be swapped!")
    }
    else{
        console.log("Uploaded files did not pass save file verification!")
    }

})