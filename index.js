require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

let urls = [];

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(express.urlencoded({ extended: true }))

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.get('/api/shorturl/:id', function(req, res) {
  if(!urls[req.params.id]) res.redirect('/')
  res.redirect(urls[req.params.id])
});

app.post('/api/shorturl', function(req, res) {
  urls.push(req.body.url);
  res.redirect("/")
  console.log(urls);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
