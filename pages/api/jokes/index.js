import dbConnect from "../../../db/connect";
import Joke from "../../../db/models/Joke";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const jokes = await Joke.find();
    return response.status(200).json(jokes);
  }

  if (request.method === "POST") {
    try {
      const newJoke = request.body;
      await Joke.create(newJoke);
      return response
        .status(200)
        .json({ status: "Yup! Der Joke ist jetzt drin" });
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
