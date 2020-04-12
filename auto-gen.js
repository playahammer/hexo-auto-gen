'use strict'

const fs = require('fs')
const exec = require('child_process').exec

const watchPath =  process.argv[2] || './source'

var tasklist = {}


fs.watch(watchPath, 
{ recursive: true},
(eventType, filename)=>{
      const filePath = watchPath.endsWith('/') ? watchPath + filename : watchPath + '/' + filename
      if (eventType == 'change'){
            console.log(`${filePath} has been changed`)
            if (tasklist[filePath] === undefined){
                  tasklist[filePath] = {
                        update: new Date().valueOf(),
                  }
            }else{
                  if (new Date().valueOf() - tasklist[filePath].update < 2000)
                        return
                  else  tasklist[filePath] = {
                        update: new Date().valueOf(),
                  }
            }
            exec('hexo g', (err, stdout, stderr)=>{
                  if (err){
                        console.err(`Executing hexo generation error: ${stderr}`)
                        return
                  }
                  console.log(stdout)
                  console.log('Generate success!!!')

            })
      }else if(eventType == 'rename'){
            if (!fs.existsSync(filePath))
                  console.log(`${filePath} has been removed`)
            else{
                  fs.stat(filePath, (err, stat)=>{
                        if (err){
                              console.error(`Open ${filePath} error, ${err}`)
                              return
                        }
      
                        if (stat.isDirectory()){
                              console.log(`${filePath} has been created, which is directory`)
                        }
                        else if (stat.isFile()){
                              console.log(`${filePath} has been created, which is file`)
                        }
                        
                  })
            }
      }
})