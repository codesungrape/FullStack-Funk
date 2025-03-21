import OpenAI from "openai";
// import formidable from 'formidable'; also useful for parsing other forms of data

// initilaize the OpenAi client wiht APiKey
const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Export a POST function for the App Router
export async function POST(request: Request) {
  try {
    // Parse the JSON body from the request
    const body = await request.json();
    const { studyNotes } = body;

    // create prompt for OpenAI
    const prompt = `
        Create educational song lyrics about the following tech concept:
        
        Study Notes: ${studyNotes}
        Please make sure to give me a song title.

        The lyrics should be catchy, educational and relevant using the context in the 'Study Notes', and suitable for a song.
        Include verses and a chorus structure.
    `;
    // Call OpenAI API
    const completion = await openAI.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a creative songwriter specializing in educational content. You have won many grammys and awards so you are very great at what you do.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 1000,
      temperature: 0.7, // Adjust for creativity vs. consistency
    });

    // extract generated lyrics
    const lyrics = completion.choices[0].message.content;

    // return resposne
    return Response.json({ lyrics });
  } catch (error) {
    console.error("Error generating lyrics:", error);

    // Return error response using App Router pattern
    return Response.json(
      { error: "Failed to generate lyrics" },
      { status: 500 },
    );
  }
}
