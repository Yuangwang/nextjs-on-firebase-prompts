import { now } from "@/lib/utils";
import RevalidateButton from "./revalidateButton";

export default async function DemandRevlidatedPage() {
  let uuid = "";
  let attempt = 0;
  while (!uuid && attempt < 5) {
    attempt++;
    const resp = await fetch("https://httpbin.org/uuid", {
      next: {
        revalidate: 100000,
        tags: ["uuid"],
      },
    });
    if (resp.ok) {
      ({ uuid } = await resp.json());
    } else {
      console.warn(`Failed to fetch UUID. Response code: ${resp.status}`);
      // Attempt after waiting 2^attempt seconds.
      const seconds = 2**attempt;
      console.warn(`Retrying after ${seconds}s`);
      await new Promise((resolve) => setTimeout(resolve, seconds*1000));
    }
  }
  if (!uuid) {
    throw new Error("unable to fetch uuid");
  }
  return (
    <>
      <h2>A cached page</h2>
      <RevalidateButton />
      <p className="font-mono">Generated {now()}</p>
      <p className="font-mono">UUID: {uuid}</p>
    </>
  );
}
