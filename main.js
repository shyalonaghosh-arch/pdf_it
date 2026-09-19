const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

const PYTHON = path.join(__dirname, '.venv', 'Scripts', 'python.exe');
const SCRIPT = path.join(__dirname, 'converter', 'convert.py');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { preload: path.join(__dirname, 'preload.js') }
  });
  win.loadFile('index.html');
}

// Open a file picker for PDFs
ipcMain.handle('pick-pdf', async () => {
  const r = await dialog.showOpenDialog({
    filters: [{ name: 'PDF', extensions: ['pdf'] }],
    properties: ['openFile']
  });
  return r.canceled ? null : r.filePaths[0];
});

// Ask where to save, then run the Python script
ipcMain.handle('convert', async (event, inputPath) => {
  const r = await dialog.showSaveDialog({
    defaultPath: inputPath.replace(/\.pdf$/i, '.docx'),
    filters: [{ name: 'Word', extensions: ['docx'] }]
  });
  if (r.canceled) return { ok: false, canceled: true };

  return new Promise((resolve) => {
    const p = spawn(PYTHON, [SCRIPT, inputPath, r.filePath]);
    let err = '';
    p.stderr.on('data', (d) => (err += d));
    p.on('close', (code) =>
      resolve(code === 0 ? { ok: true, output: r.filePath } : { ok: false, error: err })
    );
  });
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());