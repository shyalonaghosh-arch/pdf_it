let selected = null;
const fileEl = document.getElementById('file');
const convertBtn = document.getElementById('convert');
const statusEl = document.getElementById('status');

document.getElementById('pick').onclick = async () => {
  const p = await window.api.pickPdf();
  if (!p) return;
  selected = p;
  fileEl.textContent = p;
  convertBtn.disabled = false;
  statusEl.textContent = '';
};

convertBtn.onclick = async () => {
  convertBtn.disabled = true;
  statusEl.textContent = 'Converting...';
  const r = await window.api.convert(selected);
  if (r.canceled) statusEl.textContent = 'Cancelled.';
  else if (r.ok) statusEl.textContent = 'Saved: ' + r.output;
  else statusEl.textContent = 'Failed: ' + r.error;
  convertBtn.disabled = false;
};