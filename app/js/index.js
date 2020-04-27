//let {checkswap} = require('./checkswap')

let file1 = document.getElementById("file1")
let file2 = document.getElementById("file2")

let start = document.getElementById("start")

//let test = document.getElementById('test')

console.log('script works')

file1.addEventListener('change', function() {
    console.log('eyo')
})

start.addEventListener("click", function() {
    if(file1.files.length != 0 && file2.files.length != 0){
        //checkswap(URL.createObjectURL(file1.files[0]), URL.createObjectURL(file2.files[0]))
        console.log("All the files are uploaded!")
    }
    else{
        console.log("Not all files uploaded!")
    }
})
