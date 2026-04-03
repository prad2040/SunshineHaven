export interface MenuItem {
  name: string;
  price: string;
  description?: string;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
  subtitle?: string;
}

export interface CafeDetails {
  name: string;
  ownerPassion: string;
  menu: MenuSection[];
  ambience: string;
  vdlIceCream: {
    description: string;
    flavors: string[];
    exclusivity: string;
  };
  location: {
    address: string;
    hours: string;
    contact: string;
  };
  visualThemes: string[];
}

export const FALLBACK_CAFE_DETAILS: CafeDetails = {
  name: "Sunshine Haven Cafe",
  ownerPassion: "Sunshine Haven is a dream realized—a warm, sun-drenched sanctuary where the community gathers for exceptional coffee and artisanal treats. Every detail, from the curated menu to the inviting atmosphere, reflects a deep passion for quality and hospitality.",
  menu: [
    {
      title: "All Day Breakfast",
      items: [
        { name: "Green Smoothie Bowl", price: "$19.5" },
        { name: "Nut Butter Sourdough", price: "$18.50" },
        { name: "Mash Avo on Sourdough", price: "$20" },
        { name: "Tomato & Cheese Toastie", price: "$12" },
        { name: "Cheese Toastie", price: "$12" }
      ]
    },
    {
      title: "Dessert",
      items: [
        { name: "Ice Cream Mini Scoop", price: "$5.60" },
        { name: "Ice Cream Single Scoop", price: "$7.60" },
        { name: "Ice Cream Double Scoop", price: "$9.60" },
        { name: "Sundae Bowl", price: "$22" },
        { name: "Warm Cronut + Icecream", price: "$15" },
        { name: "Warm Brownie + Icecream", price: "$15" }
      ]
    },
    {
      title: "Frappes",
      subtitle: "$11.50",
      items: [
        { name: "Biscoff", price: "" },
        { name: "Oreo", price: "" }
      ]
    },
    {
      title: "Hot Drinks",
      subtitle: "Reg $5.50 | Lrg $6.50 | Jumbo $8.00",
      items: [
        { name: "Flat White", price: "" },
        { name: "Cappuccino", price: "" },
        { name: "Latte", price: "" },
        { name: "Long Black", price: "" },
        { name: "Espresso", price: "" },
        { name: "Piccolo", price: "" },
        { name: "Mocha", price: "" },
        { name: "Chai Latte", price: "" },
        { name: "Dirty Chai", price: "" }
      ]
    },
    {
      title: "Tea (Pot)",
      subtitle: "$6.00",
      items: [
        { name: "Earl Grey", price: "" },
        { name: "Peppermint", price: "" },
        { name: "English Breakfast", price: "" },
        { name: "Chamomile", price: "" },
        { name: "Lemon & Ginger", price: "" },
        { name: "Green Tea", price: "" }
      ]
    },
    {
      title: "Soft Drink",
      items: [
        { name: "Pepsi Can", price: "$3.50" },
        { name: "Coca Cola Can", price: "$3.50" },
        { name: "Solo Can", price: "$3.50" },
        { name: "Sprite", price: "$3.50" },
        { name: "Red Bull", price: "$4.00" },
        { name: "Spring Water", price: "$4.00" },
        { name: "Sparkling Water", price: "$5.00" }
      ]
    },
    {
      title: "Milkshake",
      items: [
        { name: "Vanilla", price: "$8.50" },
        { name: "Chocolate", price: "$8.50" },
        { name: "Strawberry", price: "$8.50" },
        { name: "Vanilla kids", price: "$5.50" },
        { name: "Chocolate kids", price: "$5.50" },
        { name: "Strawberry kids", price: "$5.50" }
      ]
    },
    {
      title: "Iced Drink",
      subtitle: "$7.50",
      items: [
        { name: "Iced Latte", price: "" },
        { name: "Iced Chocolate", price: "" },
        { name: "Iced Matcha Drink", price: "" }
      ]
    },
    {
      title: "100% Juice",
      subtitle: "$5.50",
      items: [
        { name: "Watermelon Apple Mint", price: "" },
        { name: "Orange Carrot Pineapple Ginger", price: "" },
        { name: "Apple Orange Beetroot Carrot", price: "" }
      ]
    },
    {
      title: "Premium Drink",
      subtitle: "$5.00",
      items: [
        { name: "Limonata", price: "" },
        { name: "Chinotto", price: "" },
        { name: "Aranciata Rossa", price: "" }
      ]
    }
  ],
  ambience: "A bright, welcoming oasis with fresh lime and mustard accents, natural textures, and a tranquil atmosphere that invites you to linger.",
  vdlIceCream: {
    description: "Premium, small-batch ice cream, sorbet, and gelato from Van Diemens Land Creamery in Tasmania. Made with the purest Tasmanian milk and cream.",
    flavors: [
      "Cookies & Cream Gelato",
      "Chocolate Hazelnut",
      "Green Apple Sorbet",
      "Café Latte Ice Cream",
      "Chocolate Gelato",
      "Pepperberry & Leatherwood",
      "Mango Coconut Sorbet",
      "Orange & Lemon Myrtle",
      "Salted Lime Sorbet"
    ],
    exclusivity: "The only cafe in Sydney proud to scoop these award-winning Tasmanian treasures."
  },
  location: {
    address: "Shop 1/ 506 Old Northern Road, Dural, 2158",
    hours: "Tue - Fri: 7:15 AM - 5:15 PM | Sat - Sun: 7:15 AM - 2:00 PM | Mon: CLOSED",
    contact: "Follow us on Instagram @sunshinehaven.au"
  },
  visualThemes: ["Warm sunlight", "Fresh lime accents", "Mustard branding", "Vibrant scoops"]
};
