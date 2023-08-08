const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Usa CORS para todos los endpoints. 
// Puedes ajustar las opciones para restringir los orígenes permitidos si lo deseas.
app.use(cors());

const DIST_FOLDER = path.join(process.cwd(), 'dist/naruto2023-app');

app.use(express.static(DIST_FOLDER));

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_FOLDER, 'index.html'));
});

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
