const pg = require('pg')
const client = new pg.Client('postgres://localhost/')
const fs = require('fs')
const express = require('express')
const app = express()

app.get('/', async (req, res, next)=> {
    try{
        const SQL = `
        select things.name, users.name as user_name, things.id
        from things
        left join users
        on users.id = things."UserID"
        
        `;
        const response = await client.query(SQL)
        const things = response.rows;
        res.send(`
            <html>
                <head>
                    <title>Acme Users and Things</title>
                </head>
                <body>
                    <h1> Users and Things </h1>
                    <ul>
                        ${
                            things.map(thing =>{
                                return `<li>
                                <a href= 'things/${things.name}'>${ things.name } owned by ${ things.user_name || 'nobody'}</li>`
                            }).join('')
                        }
                    </ul>
                </body>
            </html>
            `);
    }
    catch(ex){
        next(ex)
    }
})

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
        const port = process.env.PORT || 8080
        app.listen(port, ()=> console.log(`listening on port ${port}`))
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