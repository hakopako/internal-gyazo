'use strict';
module.exports = {
  init: function(){
  	var BrowserWindow = require('browser-window');
	  var Screen = require('screen')
	  var size = Screen.getPrimaryDisplay().size
    this.mainWindow = new BrowserWindow({
        left: 0,
        top: 0,
        width: size.width,
        height: size.height,
        frame: false,
        show: true,
        transparent: true,
        resizable: false,
        'always-on-top': true
	  })
    //this.mainWindow.webContents.openDevTools()
    this.mainWindow.maximize() 
    this.mainWindow.loadUrl('file://'+ __dirname + '/index.html')
    this.mainWindow.on('closed', function () {
	  this.mainWindow = null
	  })
  }
}