class MovieStore {
    constructor(){
        this.movieData = require("./datastore.json");
    }

    all(){
        return this.movieData;
    }
    find(id){
        return this.movieData.filter(m => m.imdbID === id);
    }
    add(movie){
        this.movieData.push(movie);
    }
    has(id){
       let hasID = this.find(id);
       return hasID.length > 0;
    }
    update(id, newInfo){
        if(this.find(id).length < 1){
            return false;
        }
        let oldMovie = this.find(id);
        console.log(oldMovie);
        let newMovie = Object.assign(...oldMovie, newInfo);
        console.log(newMovie);
        let oldMovieList = this.movieData.filter(m => m.imdbID !== id);
        this.movieData = [...oldMovieList, newMovie];
        return true;
    }
    delete(id){
        this.movieData =  this.movieData.filter(m => m.imdbID !== id);
    }
    search(id){
        return this.movieData.filter(m => m.imdbID.includes(id));
    }
}
module.exports = MovieStore;