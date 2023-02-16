'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <head></head>
      <body>
        <h2>Something went wrong! 2</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
