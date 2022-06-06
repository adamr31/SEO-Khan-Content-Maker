import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [blogInput, setblogInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blogTitle: blogInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setblogInput("");
  }

  return (
    <div>
      <Head>
        <title>Blog Post Generator</title>
        <link rel="icon" href="r31.png" />
      </Head>

      <main className={styles.main}>
        <img src="r31.png" className={styles.icon} />
        <h3>Write your blog title</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="blogTitle"
            placeholder="Enter a blog title"
            value={blogInput}
            onChange={(e) => {
              return setblogInput(e.target.value);
            }}
          />
          <input type="submit" value="Generate 500 word blog" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
