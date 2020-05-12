const fs = require('fs')

// section dependent structure ( probably move into dictionary )
const section_data_size = 0x0F80

// global section structure
const sectionID_offset = 0x0FF4
const checksum_offset = 0x0FF6
const saveidx_offset = 0x0FFC

// R/S/E offset is 0x0234
// FR/LG specific offset ( move into dictionary/json later )
const team_offset = 0x0034
const team_length = 604

// do the checking and the swapping and what not
exports.checkswap = function(filename1, filename2){
    console.log(filename1)
    console.log(filename2)

    let buffer1 = fs.readFileSync(filename1)
    let buffer2 = fs.readFileSync(filename2)

    let buffer1_og = Buffer.from(buffer1.subarray(0,buffer1.length))

    // if only one game save is filled (i.e after first save) then we need to check for 'FF'
    let save_offset1 = buffer1[saveidx_offset] > buffer1[0xE000+saveidx_offset] && buffer1[saveidx_offset] != 0xFF ? 0x0000 : 0xE000
    let save_offset2 = buffer2[saveidx_offset] > buffer2[0xE000+saveidx_offset] && buffer2[saveidx_offset] != 0xFF ? 0x0000 : 0xE000

    //loop1
    let section_start1 = 0x0000
    for(let i = save_offset1; i < 0xE000+save_offset1; i += 0x1000){
        if(buffer1[i+sectionID_offset] == 0x01){
            section_start1 = i
            console.log('Section 01 found in file 1')
            break
        }
    }

    //loop2
    let section_start2 = 0x0000
    for(let i = save_offset2; i < 0xE000+save_offset2; i += 0x1000){
        if(buffer2[i+sectionID_offset] == 0x01){
            section_start2 = i
            console.log('Section 01 found in file 2')
            break
        }
    }

    // do lazy swap
    let a1 = Buffer.from(buffer1.subarray(section_start1+team_offset, section_start1+team_offset+team_length))
    buffer2.copy(buffer1, section_start1+team_offset, section_start2+team_offset, section_start2+team_offset+team_length)
    a1.copy(buffer2, section_start2+team_offset)

    // compute and fill checksums
    buffer1.writeUInt16LE(CRC32(buffer1.slice(section_start1,section_start1+section_data_size)),section_start1+checksum_offset)
    buffer2.writeUInt16LE(CRC32(buffer2.slice(section_start2,section_start2+section_data_size)),section_start2+checksum_offset)

    // DEBUG: write to new files
    //filename1 = `${filename1}.swp`
    //filename2 = `${filename2}.swp`

    console.log(buffer1.equals(buffer1_og))
    // overwrite files
    console.log(buffer1.length)
    console.log(buffer2.length)
    fs.writeFile(filename1,buffer1, function(err){
        if(err){
            throw err
        }
        console.log(`${filename1} written successfully...`)
    })
    fs.writeFile(filename2,buffer2, function(err){
        if(err){
            throw err
        }
        console.log(`${filename2} written successfully`)
    })

    return
}

// verify that saves are valid
exports.validate_saves = function(candidate1, candidate2){
    return true
}

// encryption function
function CRC32(data){
    let val = 0x00000000
    for(let i = 0; i < data.length; i += 4){
        val += data[i]+0x0100*data[i+1]+0x010000*data[i+2]+0x01000000*data[i+3]
    }
    return ((val + (val >> 16)) % 0x01000000) % 0x00010000
}

//checkswap(filename1, filename2)