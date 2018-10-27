let express = require('express');
let cors = require('cors');
let app = express();
app.use(cors());
app.get('/amount', function (req, res) {
    res.json({ amount: 5 });
});
app.listen(3000);