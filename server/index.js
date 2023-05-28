const express = require("express");
const axios = require("axios");
const cors = require("cors");

const CLIENT_ID = "10a2e8270a60b4133c7b";
const CLIENT_SECRET = "20db451ca65ad6c9d285c04fbb4715ca7b948750";
const GITHUB_URL = "https://github.com/login/oauth/access_token";

const app = express();
app.use(cors({ credentials: true, origin: true }));

app.get("/oauth/redirect", (req, res) => {
    axios({
        method: "POST",
        url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
        headers: {
            Accept: "application/json",
        },
    }).then((response) => {
        res.redirect(
            `http://localhost:3000?access_token=${response.data.access_token}`
        );
    });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
})