// call to get electron objects
const { app, BrowserWindow} = require('electron')

// function creates browser window with index.html
function createWindow () {

  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // html injection point
  win.loadFile('./app/index.html')

  // dev Tools
  win.webContents.openDevTools()
}

// create + display window when ready
app.whenReady().then(createWindow)

// quit application on window close
app.on('window-all-closed', () => {
    app.quit()
})
