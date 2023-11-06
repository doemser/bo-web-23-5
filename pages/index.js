import JokeList from "../components/JokeList";
import useSWR from "swr";

export default function HomePage() {
  const { mutate } = useSWR("/api/jokes");

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const response = await fetch("api/jokes", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      mutate();
    } else {
      console.log("response nicht ok?");
    }

    event.target.reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="joke-input">Enter a new joke</label>
        <input type="text" id="joke-input" name="joke" maxLength={10} />
        <button type="submit">Submit</button>
      </form>
      <JokeList />
    </>
  );
}
