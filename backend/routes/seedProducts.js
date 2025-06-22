const mongoose = require('mongoose');
const connectDB = require('../db');
const Product = require('../models/Product');
const { ObjectId } = mongoose.Types;

const products = [
  {
    _id: new ObjectId(),
    brand: "Samsung",
    title: "SAMSUNG 32 Inch HD Ready Smart LED TV",
    image: "images/led.png",
    rating: "4.3",
    price: "13499",
    description: "LED Display | 60 Hz Refresh Rate | Smart TV with Built-in Apps"
  },
  {
    _id: new ObjectId(),
    brand: "Apple",
    title: "Apple AirPods Pro (2nd Gen)",
    image: "images/earbuds.png",
    rating: "4.7",
    price: "24999",
    description: "Active Noise Cancellation | Transparency Mode | Spatial Audio"
  },
  {
    _id: new ObjectId(),
    brand: "Nike",
    title: "Nike Revolution 6 Running Shoes",
    image: "images/shoes.png",
    rating: "4.5",
    price: "3499",
    description: "Breathable Mesh | Lightweight | Cushioned Sole"
  },
  {
    _id: new ObjectId(),
    brand: "Philips",
    title: "Philips Beard Trimmer BT1232/15",
    image: "images/trimmer.png",
    rating: "4.2",
    price: "899",
    description: "Up to 30 min cordless use | Stainless Steel Blades"
  },
  {
    _id: new ObjectId(),
    brand: "Lenovo",
    title: "Lenovo IdeaPad Slim 3 Intel Core i5 12th Gen",
    image: "images/idealpad.png",
    rating: "4.4",
    price: "48990",
    description: "8 GB RAM | 512 GB SSD | Windows 11 | 15.6 inch FHD"
  },
  {
    _id: new ObjectId(),
    brand: "Ray-Ban",
    title: "Ray-Ban Aviator Sunglasses (Unisex)",
    image: "images/glasses.png",
    rating: "4.6",
    price: "6499",
    description: "Classic Design | UV Protected | Metal Frame"
  },
  {
    _id: new ObjectId(),
    brand: "L'Oreal",
    title: "L'Oreal Paris Hyaluronic Acid Serum 30ml",
    image: "images/loreal.png",
    rating: "4.3",
    price: "649",
    description: "Deep Hydration | Dermatologically Tested | Suitable for All Skin Types"
  },
  {
    _id: new ObjectId(),
    brand: "boAt",
    title: "boAt Stone 620 Bluetooth Speaker (12W)",
    image: "images/boat.png",
    rating: "4.3",
    price: "1699",
    description: "Up to 10 Hrs Playback | IPX4 Water Resistance | Dual EQ Modes"
  },
  {
    _id: new ObjectId(),
    brand: "Usha",
    title: "Usha Maxx Air Table Fan (400 mm, White)",
    image: "images/fan.png",
    rating: "4.0",
    price: "2099",
    description: "3-Speed Settings | High Air Delivery | 100% Copper Motor"
  },
  {
    _id: new ObjectId(),
    brand: "Wildcraft",
    title: "Wildcraft 44 Ltrs Grey and Orange Backpack",
    image: "images/bag.png",
    rating: "4.4",
    price: "1999",
    description: "Water Resistant | Laptop Compartment | Adjustable Straps"
  },
  {
    _id: new ObjectId(),
    brand: "Milton",
    title: "Milton Thermosteel Flask 1L",
    image: "images/bottle.png",
    rating: "4.5",
    price: "899",
    description: "Keeps Liquids Hot/Cold for 24 Hours | Stainless Steel"
  },
  {
    _id: new ObjectId(),
    brand: "Realme",
    title: "Realme Pad 10.4 Inch WiFi + LTE 64GB",
    image: "images/tab.png",
    rating: "4.3",
    price: "15999",
    description: "MediaTek Helio G80 | 4 GB RAM | 7100 mAh Battery"
  }
];

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany(); // Optional: wipe existing
    await Product.insertMany(products);
    console.log("✅ Products seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedProducts();
