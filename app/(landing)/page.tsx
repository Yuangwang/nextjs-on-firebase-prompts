import Image from "next/image";
import Link from "next/link";
import ServerActionForm from "./serverActionForm";

function Chip(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <span className="rounded bg-blue-100 font-mono text-lg text-blue-800">
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <>
      <h2> Next.js on Firebase App Hosting 2</h2>
      <div>
        <div className="flex w-full items-center justify-center">
          <Image
            src="/sparky3d.gif"
            alt="Firebasel Sparky hugging a heart"
            width={300}
            height={50}
            priority
          />
        </div>
        <h3>Serverless Backend</h3>
        <p>
          Dynamic content is generated by server running on{" "}
          <a
            href="https://cloud.google.com/run/docs/overview/what-is-cloud-run"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cloud Run
          </a>
          , a fully managed compute platform that automatically scales stateless
          containers. Visit{" "}
          <Link href="/ssr">
            <Chip>/ssr</Chip>
          </Link>{" "}
          and{" "}
          <Link href="/ssr/streaming">
            <Chip>/ssr/streaming</Chip>
          </Link>{" "}
          page to see the server in action.
        </p>
        <h3>Global CDN</h3>
        <p>
          Static assets are served by{" "}
          <a
            href="https://cloud.google.com/cdn/docs/overview"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Cloud CDN
          </a>
          , a fast and secure way to host static content globally. Visit{" "}
          <Link href="/ssg">
            <Chip>/ssg</Chip>
          </Link>{" "}
          page to see a statically generated page served by Firebase Hosting.
        </p>
        <h3>Incremental Cache</h3>
        <p>
          Visit{" "}
          <Link href="/isr/time">
            <Chip>/isr/time</Chip>
          </Link>{" "}
          and{" "}
          <Link href="/isr/demand">
            <Chip>/isr/demand</Chip>
          </Link>{" "}
          pages to conditionally cached pages using{" "}
          <a
            className="font-mono"
            href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-while-revalidate"
            target="_blank"
            rel="noopener noreferrer"
          >
            stale-while-revalidate
          </a>{" "}
          header.
        </p>
        <h3>Server action</h3>
        <p>
          Server actions are asynchronous functions that are executed on the
          Cloud Run server.
        </p>
        <ServerActionForm />
      </div>
    </>
  );
}
