export interface MenuItem {
  name: string;
  price: string;
  description?: string;
}

export interface MenuSection {
  title: string;
  navTitle?: string;
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
      title: "Signature Toasts, Bagels & Bowls",
      navTitle: "All Day Breakfast",
      items: [
        { name: "Avo Smash Toast", price: "$13.50" },
        { name: "Mediterranean Hummus Toast", price: "$12" },
        { name: "The Power Nut Butter Toast", price: "$14.50" },
        { name: "Everything Cream Cheese Bagel", price: "$11" },
        { name: "Crispy Corn Fritter Bowl", price: "$16.50" },
        { name: "Falafel Bowl", price: "$22" }
      ]
    },
    {
      title: "Toasties & Sandwiches",
      items: [
        { name: "Caprese Pesto Focaccia", price: "$15" },
        { name: "The Classic Tomato & Cheese", price: "$12" },
        { name: "The Ultimate Cheese Toastie", price: "$12" },
        { name: "The Garden Sandwich", price: "$12" }
      ]
    },
    {
      title: "Smoothies",
      subtitle: "$14",
      items: [
        { name: "Berrylicious Smoothie", price: "" },
        { name: "Greenie Smoothie", price: "$15" }
      ]
    },
    {
      title: "Hot Drinks",
      subtitle: "Reg $5.50 | Lrg $6.50 | Jumbo $8",
      items: [
        { name: "Flat White", price: "" },
        { name: "Cappuccino", price: "" },
        { name: "Latte", price: "" },
        { name: "Long Black", price: "" },
        { name: "Espresso", price: "" },
        { name: "Piccolo", price: "" },
        { name: "Mocha", price: "" },
        { name: "Chai Latte", price: "" },
        { name: "Dirty Chai", price: "" },
        { name: "Hot Chocolate", price: "" },
        { name: "Matcha", price: "" }
      ]
    },
    {
      title: "Tea Pots",
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
      title: "Milk Shakes",
      subtitle: "$8.50",
      items: [
        { name: "Vanilla", price: "" },
        { name: "Chocolate", price: "" },
        { name: "Strawberry", price: "" },
        { name: "Banana", price: "" }
      ]
    },
    {
      title: "Frappes",
      subtitle: "$11.50",
      items: [
        { name: "Oreo Frappe", price: "" },
        { name: "Biscoff Frappe", price: "" }
      ]
    },
    {
      title: "Cold Drinks",
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
      title: "Iced Drinks",
      items: [
        { name: "Iced Long Black", price: "$6.50" },
        { name: "Iced Latte", price: "$7.50" },
        { name: "Iced Coffee", price: "$8.00" },
        { name: "Iced Chocolate", price: "$7.50" },
        { name: "Iced Matcha", price: "$7.50" },
        { name: "Iced Mocha", price: "$8.50" },
        { name: "Iced Chai Latte", price: "$7.50" }
      ]
    },
    {
      title: "Juices",
      subtitle: "$5.50",
      items: [
        { name: "Watermelon, Apple & Mint Juice", price: "" },
        { name: "Apple, Orange, Beetroot & Carrot Juice", price: "" },
        { name: "Orange, Carrot, Pineapple & Ginger Juice", price: "" }
      ]
    },
    {
      title: "Premium Drinks",
      subtitle: "$5.00",
      items: [
        { name: "Limonata", price: "" },
        { name: "Chinotto", price: "" },
        { name: "Aranciata Rossa", price: "" }
      ]
    },
    {
      title: "Kids - Drinks",
      items: [
        { name: "Vanilla Milkshake", price: "$5.50" },
        { name: "Chocolate Milkshake", price: "$5.50" },
        { name: "Strawberry Milkshake", price: "$5.50" },
        { name: "Banana Milkshake", price: "$5.50" },
        { name: "Babychino", price: "$1.80" },
        { name: "Pop Tops", price: "$4.00" },
        { name: "Iced Strawberry", price: "$5.50" },
        { name: "Iced Rainbow", price: "$5.50" },
        { name: "Iced Caramel", price: "$5.50" }
      ]
    },
    {
      title: "Kids - Food",
      items: [
        { name: "Tomato & Cheese Toastie on White Bread", price: "$8" },
        { name: "Cheese Toastie on White Bread", price: "$8" },
        { name: "Plain Toast", price: "$5" },
        { name: "Raisin Toast", price: "$5" }
      ]
    },
    {
      title: "Tasmanian Ice Creams",
      items: [
        { name: "Mini Scoop", price: "$5.60" },
        { name: "Single Scoop", price: "$7.60" },
        { name: "Double Scoop", price: "$9.60" }
      ]
    },
    {
      title: "Specialty Desserts",
      navTitle: "Dessert",
      items: [
        { name: "Brownie + Ice cream", price: "$15.00" },
        { name: "Cronut + Ice cream", price: "$15.00" },
        { name: "Sundae Bowl", price: "$22.00" }
      ]
    }
  ],
  ambience: "A bright, welcoming oasis with fresh lime and mustard accents, natural textures, and a tranquil atmosphere that invites you to linger.",
  vdlIceCream: {
    description: "Premium ice cream, sorbet, and gelato from Van Diemens Land Creamery in Tasmania. Made with the purest Tasmanian milk and cream.",
    flavors: [
      "Blackcurrant Sorbet",
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
    hours: "Tue - Fri: 8:15 AM - 4:15 PM | Sat - Sun: 8:15 AM - 2:00 PM | Mon: CLOSED",
    contact: "Follow us on Instagram @sunshinehaven.au"
  },
  visualThemes: ["Warm sunlight", "Fresh lime accents", "Mustard branding", "Vibrant scoops"]
};
