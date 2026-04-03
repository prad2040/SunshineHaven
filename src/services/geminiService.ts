import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getCafeDetails() {
  const prompt = `
    Analyze the following URLs for Sunshine Haven Cafe in Sydney:
    1. https://www.google.com/maps/search/Sunshine+Haven/@-33.7445553,151.0166714,12z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI2MDMzMS4wIKXMDSoASAFQAw%3D%3D
    2. https://www.facebook.com/sunshinehaven.au/
    3. https://www.instagram.com/sunshinehaven.au/

    Extract and summarize:
    - The owner's passion and story (Note: The owner is NOT from Tasmania, do not mention that).
    - Menu: Provide a structured menu with sections (e.g., All Day Breakfast, Dessert, Frappes, Hot Drinks, Tea, Soft Drink, Milkshake, Iced Drink, 100% Juice, Premium Drink) and items with prices.
    - Ambience and vibe (Focus on the bright, lime-green, mustard, and sunny branding).
    - Details about the exclusive Tasmanian VDL ice cream, sorbets, and gelatos (Van Diemens Land Creamery). These are the ONLY items from Tasmania.
    - MANDATORY FLAVORS: You MUST include these flavors in the vdlIceCream section: Cookies & Cream Gelato, Chocolate Hazelnut, Green Apple Sorbet, Café Latte Ice Cream, Chocolate Gelato, Pepperberry & Leatherwood, Mango Coconut Sorbet, Orange & Lemon Myrtle, Salted Lime Sorbet.
    - Location: Shop 1/ 506 Old Northern Road, Dural, 2158.
    - Opening Hours: Mon: CLOSED, Tue-Fri: 7:15 AM - 5:15 PM, Sat-Sun: 7:15 AM - 2:00 PM.
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
            menu: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  subtitle: { type: Type.STRING },
                  items: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        price: { type: Type.STRING },
                        description: { type: Type.STRING },
                      },
                      required: ["name", "price"],
                    },
                  },
                },
                required: ["title", "items"],
              },
            },
            ambience: { type: Type.STRING },
            vdlIceCream: {
              type: Type.OBJECT,
              properties: {
                description: { type: Type.STRING },
                flavors: { type: Type.ARRAY, items: { type: Type.STRING } },
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
          required: ["name", "ownerPassion", "menu", "ambience", "vdlIceCream", "location"],
        },
      },
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error fetching cafe details:", error);
    return null;
  }
}
