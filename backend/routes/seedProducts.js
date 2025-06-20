const mongoose = require('mongoose');
const connectDB = require('../db');
const Product = require('../models/Product');
const { ObjectId } = mongoose.Types;

const products = [
  {
    _id: new ObjectId(),
    brand: "Samsung",
    title: "SAMSUNG 32 Inch HD Ready Smart LED TV",
    image: "https://rukminim2.flixcart.com/image/312/312/ktketu80/television/h/d/0/ua32te40fakxxl-samsung-original-imag6vzhzjzhmfws.jpeg?q=70",
    rating: "4.3",
    price: "13499",
    description: "LED Display | 60 Hz Refresh Rate | Smart TV with Built-in Apps"
  },
  {
    _id: new ObjectId(),
    brand: "Apple",
    title: "Apple AirPods Pro (2nd Gen)",
    image: "https://rukminim2.flixcart.com/image/312/312/xif0q/headphone/g/i/6/-original-imagt8efzvzg6yqk.jpeg?q=70",
    rating: "4.7",
    price: "24999",
    description: "Active Noise Cancellation | Transparency Mode | Spatial Audio"
  },
  {
    _id: new ObjectId(),
    brand: "Nike",
    title: "Nike Revolution 6 Running Shoes",
    image: "https://rukminim2.flixcart.com/image/312/312/l4n2oi80/shoe/k/0/k/-original-imagfhhyfsszzdgv.jpeg?q=70",
    rating: "4.5",
    price: "3499",
    description: "Breathable Mesh | Lightweight | Cushioned Sole"
  },
  {
    _id: new ObjectId(),
    brand: "Philips",
    title: "Philips Beard Trimmer BT1232/15",
    image: "https://rukminim2.flixcart.com/image/312/312/kflftzk0/trimmer/y/p/j/bt1232-15-philips-original-imafwyzvshzje9m6.jpeg?q=70",
    rating: "4.2",
    price: "899",
    description: "Up to 30 min cordless use | Stainless Steel Blades"
  },
  {
    _id: new ObjectId(),
    brand: "Lenovo",
    title: "Lenovo IdeaPad Slim 3 Intel Core i5 12th Gen",
    image: "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/i/u/x/-original-imags2yrzq4rmhg3.jpeg?q=70",
    rating: "4.4",
    price: "48990",
    description: "8 GB RAM | 512 GB SSD | Windows 11 | 15.6 inch FHD"
  },
  {
    _id: new ObjectId(),
    brand: "Ray-Ban",
    title: "Ray-Ban Aviator Sunglasses (Unisex)",
    image: "https://rukminim2.flixcart.com/image/312/312/klb78nk0/sunglass/m/f/s/58-0rb3025i00158-ray-ban-original-imagy3ypkyqhwzgg.jpeg?q=70",
    rating: "4.6",
    price: "6499",
    description: "Classic Design | UV Protected | Metal Frame"
  },
  {
    _id: new ObjectId(),
    brand: "L'Oreal",
    title: "L'Oreal Paris Hyaluronic Acid Serum 30ml",
    image: "https://rukminim2.flixcart.com/image/312/312/xif0q/facial-kit/h/3/k/-original-imagztzv6nvwjpaz.jpeg?q=70",
    rating: "4.3",
    price: "649",
    description: "Deep Hydration | Dermatologically Tested | Suitable for All Skin Types"
  },
  {
    _id: new ObjectId(),
    brand: "boAt",
    title: "boAt Stone 620 Bluetooth Speaker (12W)",
    image: "https://rukminim2.flixcart.com/image/312/312/xif0q/speaker/mobile-tablet-speaker/h/s/s/stone-620-boat-original-imagkndnvb8eh3aa.jpeg?q=70",
    rating: "4.3",
    price: "1699",
    description: "Up to 10 Hrs Playback | IPX4 Water Resistance | Dual EQ Modes"
  },
  {
    _id: new ObjectId(),
    brand: "Usha",
    title: "Usha Maxx Air Table Fan (400 mm, White)",
    image: "https://rukminim2.flixcart.com/image/312/312/kp5sya80/fan/z/k/d/maxx-air-usha-original-imag3f8eszwuzqgy.jpeg?q=70",
    rating: "4.0",
    price: "2099",
    description: "3-Speed Settings | High Air Delivery | 100% Copper Motor"
  },
  {
    _id: new ObjectId(),
    brand: "Wildcraft",
    title: "Wildcraft 44 Ltrs Grey and Orange Backpack",
    image: "https://rukminim2.flixcart.com/image/312/312/kxz0pe80/backpack/u/h/0/-original-imagabydffpzb2xw.jpeg?q=70",
    rating: "4.4",
    price: "1999",
    description: "Water Resistant | Laptop Compartment | Adjustable Straps"
  },
  {
    _id: new ObjectId(),
    brand: "Milton",
    title: "Milton Thermosteel Flask 1L",
    image: "https://rukminim2.flixcart.com/image/312/312/ksdjma80/bottle/5/z/h/thunder-1000-001-milton-original-imag5yz6gkwhgg6h.jpeg?q=70",
    rating: "4.5",
    price: "899",
    description: "Keeps Liquids Hot/Cold for 24 Hours | Stainless Steel"
  },
  {
    _id: new ObjectId(),
    brand: "Realme",
    title: "Realme Pad 10.4 Inch WiFi + LTE 64GB",
    image: "https://rukminim2.flixcart.com/image/312/312/kzogn0w0/tablet/a/z/l/rmp2102-realme-original-imagbgrg2yxzzbvs.jpeg?q=70",
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
