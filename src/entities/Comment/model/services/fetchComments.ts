import axios from "axios";

const URL = "https://jsonplaceholder.typicode.com/comments";

export const fetchComments = async (postId: number) => {
  try {
    const response = await axios.get(`${URL}?postId=${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};
