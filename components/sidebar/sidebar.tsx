"use client";
import styles from "./sidebar.module.css"; 
import { useState, useEffect, FormEvent } from "react";

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

  // Setup states for form inputs and API response
  const [isLoading, setIsLoading] = useState(false);
  const [studyNotes, setStudyNotes] = useState("");
  const [generatedLyrics, setGeneratedLyrics] = useState("");
  const [error, setError] = useState("");

  // Handle form submission function with streaming support
  async function handleLyricsGeneration(e: FormEvent<HTMLFormElement>) {
    // Standard practice: prevents re-freshing of browser page
    e.preventDefault();

    // Reset states
    setIsLoading(true);
    setError("");
    setGeneratedLyrics("");

    try {
      // Send HTTP request
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studyNotes,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate lyrics");
      }

      // Check for streaming response
      const contentType = response.headers.get("Content-Type");
      
      if (contentType && contentType.includes("text/event-stream")) {
        // Handle streaming response
        const reader = response.body?.getReader();
        if (!reader) throw new Error("Failed to get stream reader");
        
        const decoder = new TextDecoder();
        let accumulatedLyrics = "";
        
        try {
          while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
              break;
            }
            
            // Decode the chunk
            const chunk = decoder.decode(value, { stream: true });
            
            // Process each line
            const lines = chunk.split('\n\n');
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.substring(6).trim();
                
                // Check if it's the done message
                if (data === '[DONE]') {
                  continue;
                }
                
                try {
                  // Parse the JSON data
                  const parsedData = JSON.parse(data);
                  if (parsedData.lyrics) {
                    accumulatedLyrics += parsedData.lyrics;
                    setGeneratedLyrics(accumulatedLyrics);
                  }
                } catch (parseError) {
                  // Some chunks might not be complete JSON, which is fine
                  console.warn("Couldn't parse chunk as JSON:", parseError);
                }
              }
            }
          }
        } catch (streamError) {
          console.error("Error reading stream:", streamError);
          throw new Error("Failed to read streaming response");
        }
      } else {
        // Handle traditional JSON response (fallback)
        const data = await response.json();
        setGeneratedLyrics(data.lyrics);
      }
    } catch (err) {
      console.error("Error generating lyrics:", err);
      setError("Failed to generate lyrics. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Let&apos;s Create Your Tech Tunes
        </h3>
        <form className={styles.submission} onSubmit={handleLyricsGeneration}>
          <p>
            Got a coding concept that needs a melody? Create your tech-cational
            lyrics by adding your notes here. Our AI will transform your ideas
            into catchy, educational lyrics for you!
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

          {/** if Error occurs render conditionally */}
          {error && <p className={styles.error}>{error}</p>}

          {/** if lyrics generation started, render conditionally */}
          {(isLoading || generatedLyrics) && (
            <div className={styles.lyricsResult}>
              <h4>{isLoading ? "Generating Lyrics..." : "Generated Lyrics:"}</h4>
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