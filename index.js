import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
app.use(morgan("tiny"));

var userAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true}));
 
function passwordCheck(req, res, next) {
    const password = req.body["password"];
    if (password === "ILoveProgramming"){
        userAuthorised = true;
    }
    next();
    console.log("Login Success");
}

app.use(passwordCheck);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
   if (userAuthorised) {
    res.sendFile(__dirname + "/public/secret.html")
   } else {
    res.redirect("/");

   // Alternatively  res.sendFile(__dirname + "/public/index.html");
   };
   
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
