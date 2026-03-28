import simpleImg from '../assets/simple-gel.png';
import cocoonImg from '../assets/cocoon-cleanser.png';
import zakkaImg from '../assets/zakka-cleanser.png';
import ceraveImg from '../assets/cerave-cleanser.png';
import officeImg from '../assets/office-moisturizer.png';

export const products = [
  {
    id: 5,
    brand: "Shinebeambeauty",
    sku: "Office Worker Moisturizer",
    price: 385000,
    offtake: "~22,000",
    reviewLow: "1.2%",
    retention: "~25.5%",
    negativeSentiment: "10% say the jar is slightly heavy for travel; 5% wish for a larger size.",
    image: officeImg,
    rating: 4.9,
    isNew: true
  },
  {
    id: 1,
    brand: "Simple",
    sku: "Refreshing Gel",
    price: 115000,
    offtake: "~36,500",
    reviewLow: "4.2%",
    retention: "~12.5%",
    negativeSentiment: "68% complain of poor sebum cleansing; 21% say it runs out fast; 11% cite flimsy packaging.",
    image: simpleImg,
    rating: 4.5,
  },
  {
    id: 2,
    brand: "Cocoon",
    sku: "Winter Melon",
    price: 185000,
    offtake: "~28,200",
    reviewLow: "5.1%",
    retention: "~15.8%",
    negativeSentiment: "54% dislike the strong tea tree scent; 32% report dry cheeks post-wash; 14% report purging.",
    image: cocoonImg,
    rating: 4.2,
  },
  {
    id: 3,
    brand: "Zakka",
    sku: "Calendula pH 5.5",
    price: 195000,
    offtake: "~15,800",
    reviewLow: "2.8%",
    retention: "~18.2%",
    negativeSentiment: "72% complain about jammed/leaking pump bottles; 18% complain about high price per ml.",
    image: zakkaImg,
    rating: 4.8,
  },
  {
    id: 4,
    brand: "CeraVe",
    sku: "Foaming (236ml)",
    price: 335000,
    offtake: "~19,400",
    reviewLow: "6.5%",
    retention: "~22.4%",
    negativeSentiment: "81% fear buying counterfeit goods; 19% frustrated by inconsistent pricing across shops.",
    image: ceraveImg,
    rating: 4.0,
  }
];
