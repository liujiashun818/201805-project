let express = require('express');
let app = express();
app.use(express.static(__dirname));
app.get('/clock', function (req, res) {
    ///res.end 
    setInterval(function () {
        res.write(`
            <script type="text/javascript">
                 parent.document.getElementById('clock').innerHTML = "${new Date().toLocaleTimeString()}";
            </script>
        `);
    }, 1000);
});
app.listen(8080);