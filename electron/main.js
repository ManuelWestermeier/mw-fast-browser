// electron/main.js
import { log } from 'console';
import { app, BrowserWindow } from 'electron';
import express from "express"
const isDev = process.env.NODE_ENV == 'development';

if (!isDev) {
    try {
        const server = express()
        const assetsPath = '../assets';
        server.use(express.static(assetsPath));
        server.listen(56722)
    } catch (error) {
        log(error)
    }
}

async function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        icon: isDev ? "public/logo.png" : "../assets/logo.png",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true
        },
    });

    mainWindow.loadURL('http://localhost:56722'); // Load from Vite dev server in development
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});