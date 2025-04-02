import { now } from "@/lib/utils";
import { callJokeFlow } from "@/app/genkit";
export default async function SsrPage() {
  let uuid = "";
  let attempt = 0;
  while (!uuid && attempt < 5) {
    attempt++;
    const resp = await fetch("https://httpbin.org/uuid", {
      cache: "no-store",
    });
    if (resp.ok) {
      ({ uuid } = await resp.json());
    } else {
      console.warn(`Failed to fetch UUID. Response code: ${resp.status}`);
      // Attempt after waiting 2^attempt seconds.
      const seconds = 2 ** attempt;
      console.warn(`Retrying after ${seconds}s`);
      await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
    }
  }
  if (!uuid) {
    throw new Error("unable to fetch uuid");
  }

  return (
    <>
      <h2>A server generated page! </h2>
      <p className="font-mono">Generated {now()}</p>
      <p className="font-mono">UUID: {uuid}</p>
      <p className="font-mono">Environment: {process.env.ENVIRONMENT}</p>
      <p className="font-mono">Phase: {process.env.PHASE}</p>
      <p className="font-mono">URL: {process.env.API_URL}</p>
      <p className="font-mono">
        MY_DATABASE_KEY: {process.env.MY_DATABASE_KEY}
      </p>
    </>
  );
}
