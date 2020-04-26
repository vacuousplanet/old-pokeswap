// test usage:
// node checkswap.js file1 file2

const fs = require('fs')

const filename1 = process.argv.slice(2)[0]
//const filename2 = process.argv.slice(3)[0]

// a note about sections in save data
// they do not need to be ordered apparently
// kinda wii-urd

// section structures
const section_data_size = 0x0F80
const sectionID_offset = 0x0FF4
const checksum_offset = 0x0FF6
const saveidx_offset = 0x0FFC

//const team_offset = 0x0234
//const team_length = 604

// find most recent save (A/B)
// loop through sections
// if sectionID == 1, team_start = 0xi000 + team_offset
// repeat for other file
// swap w/ length 604 (team# + team_size)
// compute new checksums and fill at checksum_offset + section start
// done (?)

function checkswap(filename1/*, filename2*/){
    let buffer1 = fs.readFileSync(filename1)
    //let buffer2 = fs.readFileSync(filename2)

    let save_offset1 = buffer1[saveidx_offset] > buffer1[0xE000+saveidx_offset] ? 0x00000 : 0xE000
    //let save_offset2 = buffer2[saveidx_offset] > buffer2[0xE0000+saveidx_offset] ? 0x00000 : 0xE0000

    //loop1
    for(let i = save_offset1; i < 0xE000+save_offset1; i += 0x1000){
        if(buffer1[i+sectionID_offset] == 0x01){
            // get ints as data buffer?
            console.log(buffer1.slice(i+checksum_offset,i+checksum_offset+8))
            buffer1.writeUInt16LE(CRC32(buffer1.slice(i,i+section_data_size)),i+checksum_offset)
            //console.log(CRC32(buffer1.slice(i, i+section_data_size)).toString(16))
            console.log(buffer1.slice(i+checksum_offset,i+checksum_offset+8))
            break
        }
    }
}

function CRC32(data){
    let val = 0x00000000
    for(let i = 0; i < data.length; i += 4){
        val += data[i]+0x0100*data[i+1]+0x010000*data[i+2]+0x01000000*data[i+3]
    }
    return ((val + (val >> 16)) % 0x01000000) % 0x00010000
}
// buffer overwrite test code
/* 
//swap second words
const swap_start = 0x05
const swap_length = 0x04

function checkswap(filename1, filename2){
    let buffer1 = fs.readFileSync(filename1)
    let buffer2 = fs.readFileSync(filename2)
    
    // lazy swap (needless memory usage; could be done with iterated xors)
    let a1 = Buffer.from(buffer1.subarray(swap_start, swap_start+swap_length))
    buffer2.copy(buffer1, swap_start, swap_start, swap_start+swap_length)
    a1.copy(buffer2, swap_start)

    // print out (writing out to file is p simple)
    console.log(buffer1)
    console.log(buffer2)

    // code for printing buffer1 lines
    let lines = []

    if(buffer1.length != buffer2.length){
        throw "Save files are of different length"
        return
    }

    for(let i = 0; i < buffer1.length; i+=16){
        block = buffer1.slice(i,i+16)
        hexArray = []
        for(value of block){
            hexArray.push(value.toString(16).padStart(2,'0'))
        }
        let hexString = hexArray.join(' ')
        lines.push(`${hexString}`)
    }

    return lines.join('\n')
} */

checkswap(filename1/*, filename2*/)