import { genres } from "../routes/GenreRoutes.js";
import { createBlogPost, fetchPosts } from "./BlogService.js";


export async function createBlogController(req, resp) {
  // TODO: remove default genre after testing
  const { description, genre = "politics" } = req.body;
  if (!description || description.length > 500 || !genre) {
    return resp.status(400).json({ message: "Invalid post" });
  }
  await createBlogPost({ userId: req.userId, description, genre });
  resp.status(201).json({ message: "Post created successfully" });
}


export async function fetchAllBlogsController(req, resp) {
  const requestedGenre = req.query.genre;
  const isValidGenre = genres.some((genre) => genre.id === requestedGenre);

  if (!isValidGenre) {
    return resp.status(400).json({ message: "Please add a valid genre" });
  }

  const serverResponse = {
    data: await fetchPosts(requestedGenre),
    message: "Posts fetched successfully",
  };
  resp.status(200).json(serverResponse);
}