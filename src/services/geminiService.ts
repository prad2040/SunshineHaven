import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getCafeDetails() {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  const prompt = `
    Analyze the following URLs for Sunshine Haven Cafe in Sydney:
    1. https://www.google.com/maps/search/Sunshine+Haven/@-33.7445553,151.0166714,12z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI2MDMzMS4wIKXMDSoASAFQAw%3D%3D
    2. https://www.facebook.com/sunshinehaven.au/
    3. https://www.instagram.com/sunshinehaven.au/

    Extract and summarize:
    - The owner's passion and story (Note: The owner is NOT from Tasmania, do not mention that).
    - Ambience and vibe (Focus on the bright, lime-green, mustard, and sunny branding).
    - Details about the exclusive Tasmanian VDL ice cream, sorbets, and gelatos (Van Diemens Land Creamery). These are the ONLY items from Tasmania.
    - Location: Shop 1/ 506 Old Northern Road, Dural, 2158.
    - Opening Hours: Mon: CLOSED, Tue-Fri: 8:15 AM - 4:15 PM, Sat-Sun: 8:15 AM - 2:00 PM.
    - Contact: Instagram @sunshinehaven.au and Facebook @sunshinehaven.au (Do not include local phone numbers).
    - Any specific visual themes or "photos" described in reviews or posts.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ urlContext: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            ownerPassion: { type: Type.STRING },
            ambience: { type: Type.STRING },
            vdlIceCream: {
              type: Type.OBJECT,
              properties: {
                description: { type: Type.STRING },
                exclusivity: { type: Type.STRING },
              },
              required: ["description", "exclusivity"],
            },
            location: {
              type: Type.OBJECT,
              properties: {
                address: { type: Type.STRING },
                hours: { type: Type.STRING },
                contact: { type: Type.STRING },
              },
              required: ["address", "hours", "contact"],
            },
            visualThemes: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["name", "ownerPassion", "ambience", "vdlIceCream", "location"],
        },
      },
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error fetching cafe details:", error);
    return null;
  }
}
