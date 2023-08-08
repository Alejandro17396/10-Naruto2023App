const express = require('express');
const path = require('path');
const app = express();

const DIST_FOLDER = path.join(process.cwd(), 'dist/naruto2023-app');

app.use(express.static(DIST_FOLDER));

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_FOLDER, 'index.html'));
});

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
