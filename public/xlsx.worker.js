importScripts('https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js');

self.addEventListener('message', (e) => {
  const { data } = e;

  if (!data) {
    self.postMessage({ error: 'No data provided' });
    return;
  }

  try {
    const workbook = XLSX.read(data, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(worksheet);

    self.postMessage({ json });
  } catch (error) {
    self.postMessage({ error: error.message });
  }
});
