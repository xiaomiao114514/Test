const { app, BrowserWindow, Menu } = require('electron/main')
const path = require('node:path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    frame: true, // 显示上方工具栏
    titleBarStyle: 'default', // 显示导航栏
    resizable: false // 禁止调整窗口大小
  })

  win.loadFile('index2.html')
  win.maximize() // 自动调至最大化
}

// 隐藏默认菜单
Menu.setApplicationMenu(null);

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})