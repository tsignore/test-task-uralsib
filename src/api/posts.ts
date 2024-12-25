import axios from "axios";

const URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = async (page: number, limit: number) => {
  try {
    const response = await axios.get(URL, {
      params: { _page: page, _limit: limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
