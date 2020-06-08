const express = require("express");
const server = express();

const db = require("./database/db");

server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }));

const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

server.get("/", (req, res) => {
    return res.render("index.html")
});

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
});

server.post("/save-point", (req, res) => {
    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);`

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]
    
    db.run(query, values, function(error) {
        if (error) {
            return console.log(error);
        }

        return res.render("create-point.html", { saved: true });
    });
})

server.get("/search-results", (req, res) => {

    db.all(`SELECT * FROM places`, function(error, rows) {
        if (error) {
            return console.log(error);
        }

        const total = rows.length;

        return res.render("search-results.html", { places: rows, total })
    });

});

server.listen(3000);
