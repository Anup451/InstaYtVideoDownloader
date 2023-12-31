const express = require('express');
const instagramDl = require("@sasmeee/igdl");
const path = require('path');

// const axios = require('axios');
const app = express();
const port = 9000;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/download', async (req, res) => {
  const videoUrl = req.body.videoUrl;
  try {
    const downloadLink = await getDownloadLink(videoUrl);
    res.render('download', { downloadLink });
  } catch (error) {
    res.render('error', { error: 'Failed to get download link.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

async function getDownloadLink(videoUrl) {
  const dataList = await instagramDl(videoUrl);
  console.log(dataList[0].download_link);
  return dataList[0].download_link;
}
