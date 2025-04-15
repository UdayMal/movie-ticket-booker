const { axiosInstance } = require(".");

// Add a new movie
export const AddMovie = async (payload) => {
    try {
        const response = await axiosInstance.post("/movies/add-movie", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

// get all movies
export const GetAllMovies = async () => {
    try {
        const response = await axiosInstance.get("/movies/get-all-movies");
        return response.data;
    } catch (error) {
        return error.response;
    }
}

// update a movie
export const UpdateMovie = async (payload) => {
    try {
        const response = await axiosInstance.post("/movies/update-movie", payload);
        return response.data;
    } catch (error) {
        return error.response; 
    }
}

// delete a movie
export const DeleteMovie = async (payload) => {
    try {
        const response = await axiosInstance.post("/movies/delete-movie", payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
}

// get a movie by id
export const GetMovieById = async (id) => {
    try {
        const response = await axiosInstance.get(`/movies/get-movie-by-id/${id}`);
        return response.data;
    } catch (error) {
        return error.response;
    }
}