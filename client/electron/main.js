'use strict'
var screencapture = require('screencapture')
var PNGCrop = require('png-crop')
var request = require('request')
var fs = require('fs')
var ipc = require('ipc')
var shell = require('shell')
var app = require('app')
var dialog = require('dialog')
var application = require('./application.js')

var url = 'https://bar.foo/recieve.php'
var proxy = ''

application.mainWindow = null
require('crash-reporter').start()
app.on('window-all-closed', function () {
  app.quit()
})

app.on('ready', function () {
  application.init()
})

ipc.on('post-message', function(event, arg) {
  console.log(JSON.stringify(arg))
  screencapture(function (err, imagePath) {
    if (err || imagePath == null) { 
      console.error('screencapture failed:', err);
      dialog.showErrorBox("Error", "screencapture failed "+ err)
      app.quit()
      return
    }
    console.log(imagePath)
    PNGCrop.crop(imagePath, imagePath, arg, function(err) {
      if (err){
        console.error('crop image failed:', err)
        dialog.showErrorBox("Error", "crop image failed")
        app.quit()
        return
      }
      var formData = {UploadFile : fs.createReadStream(imagePath)}
      request.post(
        {
          url: url, 
          proxy: proxy,
          formData: formData
        }, 
        function optionalCallback(err, httpResponse, body) {
          if (err) {
            console.error('upload failed:', err)
            dialog.showErrorBox("Error", "upload failed")
            app.quit()
            return
          }
          console.log('Upload successful!  Server responded with:', body)
          shell.openExternal(body)
          event.sender.send('post-reply', 'OK')
          app.quit()
        }
      )
    })
  })
})