var express = require("express");
var app = express();

app.use("/", function (req, res) {
    var stamp = {};
    var url = decodeURIComponent(req.originalUrl.substr(1));
    function setToNull() {
        stamp.unix = null;
        stamp.natural = null;
        res.send(JSON.stringify(stamp));
    }
    if (url) {
        var miliDate = Date.parse(url);
        var date;
        if (!isNaN(miliDate) && url.search(/[A-z]/) >= 0) {
            date = new Date(miliDate);
            stamp.unix = miliDate / 1000;
            stamp.natural = date.toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"});
            res.send(stamp);
        }
        else if (!isNaN(parseFloat(url)) && isFinite(url)) {
            date = new Date(parseInt(url, 10) * 1000);
            if (date) {
                stamp.unix = url;
                stamp.natural = date.toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"});
                res.send(stamp);
            }
        }
        else {
            setToNull();
        }
    }
    else {
        setToNull();
    }
});
app.listen(8080);