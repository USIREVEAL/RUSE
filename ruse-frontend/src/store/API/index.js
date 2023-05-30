import axios from "axios";


const link = 'http://ruse.si.usi.ch:5234';

//const link = 'http://localhost:5234'


const FileDownload = require('js-file-download');

// GET to export and download data
export const exportReq = data => axios.post(`${link}/api/export`, {
  "eCode": data
})
.then((response) => {
  FileDownload(JSON.stringify(response.data), 'data.json');
})
.catch(e => console.error(e));

