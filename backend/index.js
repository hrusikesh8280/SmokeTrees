const express = require('express');
const app = express();



app.use(express.json());



app.listen(7000, () => {
  console.log(`Server is running on port 7000`);
});