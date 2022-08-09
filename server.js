const pg = require('pg')
const client = new pg.Client('postgres://localhost/')
const fs = require('fs')

const readFile = (file)=>{
    return new Promise((resolve, reject)=> {
      fs.readFile(file, (err, data)=>{
          if(err){
              reject(err)
          } else {
              resolve(data.toString())
          }
      })  
    })
}

const init = async () => {
    try {
        console.log('starting')
        await client.connect()
        const SQL = await readFile('seed.sql')
        await client.query(SQL)
        // fs.readFile('seed.sql', async (err, data) => {
        //     if(err){
        //         console.log('error')
        //         console.log(err)
        //     } else {
        //         console.log(data.toString())
        //         await client.query(data.toString())
        //     }
        // })
    }
    catch(ex){
        console.log(ex)
    }
}

init()