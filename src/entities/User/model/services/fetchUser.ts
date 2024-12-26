import axios from "axios";

const URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUser = async (userId: number) => {
  try {
    const response = await axios.get(`${URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
