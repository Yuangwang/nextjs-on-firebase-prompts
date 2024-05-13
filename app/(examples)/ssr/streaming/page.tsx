import React from "react";
import { now } from "@/lib/utils";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function Skeleton() {
  return <p className="animate-pulse bg-red-100 font-mono">Loading...</p>;
}

async function SlowComponent() {
  await sleep(2000);
  return <p className="font-mono">Streaming!</p>;
}

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
      <h2>A server generated page! </h2>
      <p className="font-mono">Generated {now()}</p>
      <p className="font-mono">UUID: {uuid}</p>
      <React.Suspense fallback={<Skeleton />}>
        <SlowComponent />
      </React.Suspense>
    </>
  );
}
