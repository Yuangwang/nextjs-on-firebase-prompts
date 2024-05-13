"use client";
import { callJokeFlow } from "../genkit";
import { useState } from "react";

function ServerActionForm() {
  const [message, setMessage] = useState<string>("");
  async function onPress(formData: FormData) {
    const res = await callJokeFlow();
    setMessage(res);
  }

  return (
    <form action={onPress}>
      <input type="text" name="item" />
      <button
        className="rounded bg-blue-100 font-mono text-lg text-blue-800"
        type="submit"
      >
        Click here to try a server action
      </button>
      <p>{message}</p>
    </form>
  );
}
export default ServerActionForm;
