let express = require("express");
let bodyParser = require("body-parser");
let app = express();


app.use(bodyParser.json({
    type: "application/json"
}));

let MovieStore = require("./moviestore.js");
// let movieStore = new MovieStore();

 let movieStore = new MovieStore();

 //GET
 app.get("/", (req, res) =>{
    return res.send({
        payload: movieStore.all()
    })
    //return res.redirect("/movies");
})

//POST
app.post("/movies", (req, res) => {
    if(!req.body.imdbID || req.body.imdbID.trim( ).length < 1){
        res.statusCode = 400;
        return res.send({
            message: "Invalid imdbID"
        })
    }

   if(movieStore.has(req.body.imdbID)){
        res.statusCode = 400;
        return res.send({
            message: "Movie is already exit"
        })
    }

   
    movieStore.add(req.body);
    return res.send({
        message: "Movie added successfully"
    });
   
})

//PUT
app.put("/movies/:imdbID", (req, res) =>{
    let checkUpdate = movieStore.update(req.params.imdbID, req.body);

    if (checkUpdate === false){
        res.statusCode = 500;
        return res.send({
            message: "Fail to update film info"
        });
    }
    
    return res.send({
        message: "update movie sucessfully"
    });   
});


//DELETE
app.delete("/movies/:imdbID", (req, res) =>{


    if (!movieStore.has(req.params.imdbID)){
        res.statusCode = 500;
        return res.send({
            message: "Film not found"
        });
    }  

    movieStore.delete(req.params.imdbID);
    return res.send({
        message: "Movie deleted successfully"
    });
});

 //SEARCH
app.get("/movies", (req, res) =>{
    console.log(req.query);
   // return res.send(movieStore.all());
   let movieSearch = movieStore.search(req.query.imdbID);
   console.log(movieSearch);
   return res.send({
       payload: movieSearch
   })
});

app.listen(8000, () =>{
    console.log("server started at 127.0.0.1:8000");
});