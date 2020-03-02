const express=require('express')

app=express()

app.get('/', function (req, res,next) {
    res.send('Hello World!')
  })

app.listen(8080,function()
{
    console.log('App is listening on port 8080!')
}
)