const { axiosInstance } = require(".");

// Register a new user 
export const RegisterUser = async(payload) => {
    try {
        const response = await axiosInstance.post("/users/register", payload);
        return response.data;
    }
    catch(error) {
        return error.response;
    }
};

// Login a user 
export const LoginUser = async (payload) => {
    try {
        const response = await axiosInstance.post("/users/login", payload);
        return response.data;
    } catch(error) {
        return error.response;
    }
}

//  Get current user 
export const GetCurrentUser = async () => {
    try {
        const response = await axiosInstance.get("/users/get-current-user");
        return response.data; 
    } catch(error) {
        return error;
    }
}
// axiosInstance.get("http://localhost:5000/api/protected-route")
//     .then(response => console.log("Response:", response))
//     .catch(error => console.error("Error:", error.response));
