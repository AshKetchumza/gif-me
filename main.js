var menubar = require('menubar');
const config = require('./assets/js/config');
const {app, BrowserWindow, Menu} = require('electron');
const contextMenu = require('electron-context-menu');
const path = require('path');
const autoLaunch = require('auto-launch');

var mb = menubar();
mb.setOption( 'height', 600 );

var iconPath = path.join(__dirname, '/assets/images/menuicon.png');

// Set default icon
mb.setOption( 'icon', iconPath );

mb.on('ready', function ready () {
  autoUpdater.checkForUpdatesAndNotify();
  console.log('app is ready');
})

mb.on('after-create-window', function createWindow(){
  console.log(config.dev);
  if(config.dev == true){
    mb.window.openDevTools();	
  }  
})

var template = [{
   label: "Application",
   submenu: [       
       { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
   ]}, {
   label: "Edit",
   submenu: [
       { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
       { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
       { type: "separator" },
       { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
       { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
       { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
       { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
   ]}
];

Menu.setApplicationMenu(Menu.buildFromTemplate(template));

contextMenu({
  showSaveImageAs: true,
  showInspectElement: false
});

var appAutoLauncher = new autoLaunch({
	name: 'Thought Train',
	path: '/Applications/Thought Train.app'
});

appAutoLauncher.enable();

appAutoLauncher.isEnabled()
.then(function(isEnabled){
	if(isEnabled){
		return;
	}
	appAutoLauncher.enable();
})
.catch(function(err){
	console.log('An error with appAutoLauncher ' + err);
})