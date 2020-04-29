console.log(__filename)

const {dialog} = require("electron").remote
const {checkswap, verify} = require('./js/checkswap.js')

let file1 = document.getElementById("file1")
let file2 = document.getElementById("file2")

let start = document.getElementById("start")

let filename1 = ''
let filename2 = ''

file1.addEventListener("click", function(){
    filename1 = dialog.showOpenDialogSync()[0]
    console.log(`Locally uploaded ${filename1}`)
})

file2.addEventListener("click", function(){
    filename2 = dialog.showOpenDialogSync()[0]
    console.log(`Opponent uploaded ${filename2}`)
})

//let test = document.getElementById('test')

//console.log('script works')

start.addEventListener("click", function() {

    if(verify(filename1) && verify(filename2)){
        console.log("Swapping files...")
        checkswap(filename1, filename2)
        console.log("Saves should now be swapped!")
    }
    else{
        console.log("Uploaded files did not pass save file verification!")
    }

})
