// src/components/Hero/heroData.js
// import al from "../../../../assets/al.png";

export const heroSlides = [
  {
    id: 1,
    type: "shopping",
    title: "Fashion & Shopping",
    subtitle: "Latest Trends, Best Deals",
    description:
      "Discover premium clothing, accessories & more from top brands",
    badge: "NEW ARRIVALS",
    badgeColor: "#00b894",
    bgGradient:
      "linear-gradient(135deg, #3d142b 0%, #77134c 60%, #e3409c 100%)",
    accentColor: "#00b894",
    ctaText: "Shop Now",
    ctaIcon: "🛍️",

    // ✅ Logo image add kiya
    // logoImage: al,

    stats: [
      { label: "Products", value: "10K+" },
      { label: "Brands", value: "500+" },
      { label: "Customers", value: "50K+" },
    ],
    floatingCards: [
      { icon: "👗", label: "Clothing", discount: "30% OFF" },
      { icon: "👟", label: "Footwear", discount: "25% OFF" },
      { icon: "👜", label: "Accessories", discount: "40% OFF" },
    ],
  },

  {
    id: 2,
    type: "food",
    title: "Food & Dining",
    subtitle: "Fresh, Delicious & Fast",
    description:
      "Order from 1000+ restaurants, fresh meals delivered to your door",
    badge: "FREE DELIVERY",
    badgeColor: "#e17055",
    bgGradient:
      "linear-gradient(135deg, #2d1515 0%, #3d1c1c 50%, #5c2323 100%)",
    accentColor: "#e17055",
    ctaText: "Order Now",
    ctaIcon: "🍔",
    stats: [
      { label: "Restaurants", value: "1000+" },
      { label: "Cuisines", value: "50+" },
      { label: "Orders/Day", value: "5K+" },
    ],
    floatingCards: [
      { icon: "🍕", label: "Pizza", discount: "Buy 1 Get 1" },
      { icon: "🍱", label: "Biryani", discount: "20% OFF" },
      { icon: "🍰", label: "Desserts", discount: "15% OFF" },
    ],
  },

  {
    id: 3,
    type: "investment",
    title: "Invest & Grow",
    subtitle: "Your Wealth, Our Mission",
    description:
      "20 new businesses launching soon. Be an early investor & maximize returns",
    badge: "HIGH RETURNS",
    badgeColor: "#fdcb6e",
    bgGradient:
      "linear-gradient(135deg, #0d1b0d 0%, #1a2e1a 50%, #0f3d0f 100%)",
    accentColor: "#00b894",
    ctaText: "Invest Now",
    ctaIcon: "📈",
    stats: [
      { label: "Avg Returns", value: "18.5%" },
      { label: "New Businesses", value: "20+" },
      { label: "Investors", value: "2K+" },
    ],
    graphData: [30, 45, 35, 60, 50, 75, 65, 85, 78, 95, 88, 110],
    graphLabels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    businesses: [
      { name: "TechVenture", growth: "+24%" },
      { name: "GreenEnergy", growth: "+18%" },
      { name: "FoodChain", growth: "+31%" },
      { name: "EduTech", growth: "+22%" },
    ],
  },
];
// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import sp from "../../../../assets/sp.png";
// import fd from "../../../../assets/fd.png";
// import inv from "../../../../assets/inv.png";

// const Hero = () => {
//   return (
//     <div
//       id="carouselExample"
//       className="carousel slide"
//       data-bs-ride="carousel"
//       data-bs-interval="3000"
//       style={{ width: "100%", height: "300px" }}
//     >
//       <div className="carousel-inner">
//         {/* Slide 1 */}
//         <div className="carousel-item active" style={{ height: "300px" }}>
//           <img
//             src={sp}
//             alt="..."
//             style={{
//               width: "100%",
//               height: "300px",
//               objectFit: "cover",
              
//             }}
//           />
//         </div>

//         {/* Slide 2 */}
//         <div className="carousel-item" style={{ height: "300px" }}>
//           <img
//             src={fd}
//             alt="..."
//             style={{
//               width: "100%",
//               height: "300px",
//               objectFit: "cover",
//               // objectPosition: "center -30%",
//             }}
//           />
//         </div>

//         {/* Slide 3 */}
//         <div className="carousel-item" style={{ height: "300px" }}>
//           <img
//             src={inv}
//             alt="..."
//             style={{
//               width: "100%",
//               height: "300px",
//               objectFit: "cover",
//               // objectPosition: "center -25%",
//             }}
//           />
//         </div>
//       </div>

//       {/* ✅ Hidden but Working Prev Button */}
//       <button
//         className="carousel-control-prev custom-btn"
//         type="button"
//         data-bs-target="#carouselExample"
//         data-bs-slide="prev"
        
//       >
//         <span className="carousel-control-prev-icon"></span>
//       </button>

//       {/* ✅ Hidden but Working Next Button */}
//       <button
//         className="carousel-control-next custom-btn"
//         type="button"
//         data-bs-target="#carouselExample"
//         data-bs-slide="next"
        
//       >
//         <span className="carousel-control-next-icon"></span>
//       </button>

//       <style>
//         {`
//           .custom-btn {
//             width: 5%;
//             opacity: 0;              /* 🔥 invisible */
//             pointer-events: auto;   /* 🔥 still clickable */
//           }

//           .carousel-control-prev {
//             left: 0;
//           }

//           .carousel-control-next {
//             right: 0;
//           }

//           .carousel-control-prev-icon,
//           .carousel-control-next-icon {
//             background-size: 100% 100%;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Hero;
