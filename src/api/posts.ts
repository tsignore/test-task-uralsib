import axios from "axios";

const URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
