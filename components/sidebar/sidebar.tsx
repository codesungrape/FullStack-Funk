"use client"
import styles from "./sidebar.module.css";
import { useState } from "react";

export default function Sidebar() {
  const tags = [
    "JavaScript",
    "React",
    "CSS",
    "TypeScript",
    "Node.js",
    "Python",
    "Web Development",
  ];

  // setup states for form inputs and API response 
  const [isLoading, setIsLoading] = useState(false);
  const [studyNotes, setStudyNotes] = useState("");
  const [generatedLyrics, setGeneratedLyrics] = useState("")
  const [error, setError] = useState("")


  //handleForm submission function
  async function handleLyricsGeneration(e: any) {
    // standard practice: prevents re-freshing of browser page
    e.preventDefault();

    // Reset states 
    setIsLoading(true);
    setError("");
    setGeneratedLyrics("")

    //create form data object to be used for API request 
    //FormData is a pre-existing object 
    const formData = new FormData();
    formData.append("studyNotes", studyNotes)

    // send HTTP request
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studyNotes
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate lyrics")
      }

      // if successful fetching response object
      const data = await response.json();
      setGeneratedLyrics(data.lyrics);
    } 
    catch (err){
      console.error("Error generating lyrics:", err);
      setError("Failed to generate lyrics. Please try again.");
    } finally {
      setIsLoading(false);
    }




  }

  return (
    <aside className={styles.sidebar}>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Let's Create Your Tech Tunes</h3>
        <form className={styles.submission} onSubmit={handleLyricsGeneration}>
          {/* <input 
            type="file" accept="audio/*" className={styles.fileInput} />
          <small className={styles.hint}>
            Optional: Include a demo recording (MP3)
          </small> */}

          <p>
          Got a coding concept that needs a melody? Create your tech-cational lyrics by adding your notes here. Our AI will transform your ideas into catchy, educational lyrics for you!
          </p>
          <textarea 
            placeholder="Add your study notes here..." 
            rows={10} 
            value={studyNotes}
            onChange={(e) => setStudyNotes(e.target.value)}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate lyrics"}
          </button>
          
          {/** if Error occures render conditionally */}
          {error && <p className={styles.error}>{error}</p>}

          {/** if lyrics generation successful render conditionally */}
          {generatedLyrics && (
            <div className={styles.lyricsResult}>
              <h4>Generated Lyrics:</h4>
              <pre>{generatedLyrics}</pre>
            </div>
          )}


        </form>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Newsletter</h3>
        <form className={styles.newsletter}>
          <p>Get the latest posts delivered to your inbox</p>
          <input type="email" placeholder="Your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Popular Tags</h3>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <a
              key={tag}
              href={`/tag/${tag.toLowerCase()}`}
              className={styles.tag}
            >
              {tag}
            </a>
          ))}
        </div>
      </div>

    </aside>
  );
}
