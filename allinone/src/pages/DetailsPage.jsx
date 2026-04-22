// // // import React, { useState } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import { useProducts } from "../context/product_context/useProducts";
// // // import { useFood } from "../context/foodContext/useFood";
// // // import { useCart } from "../context/cartContext/useCart";
// // // import { useAuth } from "../context/authContext/useAuth";
// // // import { addToCartApi } from "../utils/api/cartApis/cartApis";
// // // import { toast } from "react-toastify";
// // // // Assuming you might need icons later, standard material symbols or font-awesome
// // // // For this example, we stick to unicode/clean CSS

// // // const DetailsPage = () => {
// // //   const { id, type } = useParams();
// // //   const navigate = useNavigate();

// // //   const { cartDispatch } = useCart();
// // //   const { user } = useAuth();
// // //   const userId = user?.user?.id;

// // //   const productCtx = useProducts();
// // //   const foodCtx = useFood();

// // //   const data = type === "food" ? foodCtx.foodCache : productCtx.cache;

// // //   if (!data.length)
// // //     return <div className="text-center py-5">Loading Menu...</div>;

// // //   const item = data.find((d) => String(d.id) === String(id));

// // //   if (!item) return <div className="text-center py-5">Item not found ❌</div>;

// // //   // ✅ YOUTUBE URL PARSER
// // //   const getEmbed = (url) => {
// // //     if (!url) return null;
// // //     const match = url.match(/(?:v=|\/)([^"&?]+)(?:&|$)/);
// // //     return match
// // //       ? `https://www.youtube.com/embed/${match[1]}?autoplay=0&rel=0`
// // //       : url;
// // //   };

// // //   const videoUrl = getEmbed(item.videoUrl || item.recipe?.videoUrl);

// // //   // ✅ HANDLERS
// // //   const handleAddIngredient = async (ing, e) => {
// // //     e.stopPropagation(); // Prevent card clicks
// // //     if (!userId) return toast.error("Please Login to buy ingredients! 🔒");

// // //     try {
// // //       // Creating a mock object for individual ingredients
// // //       // Ideally, your DB would have unique IDs for Paneer, Butter etc.
// // //       const payload = {
// // //         id: `ingredient-${ing.name.replace(/\s+/g, "-")}-${Math.random()}`,
// // //         title: ing.name,
// // //         quantity: ing.quantity,
// // //         price: 50, // Default price if not in DB
// // //         image: item.image,
// // //       };

// // //       const updated = await addToCartApi(userId, payload);
// // //       cartDispatch({ type: "SET_CART", payload: updated });
// // //       toast.success(`Added ${ing.name} (${ing.quantity}) to cart! 🛒`);
// // //     } catch (err) {
// // //       toast.error("Failed to add ingredient");
// // //     }
// // //   };

// // //   const handleAddMainItem = async () => {
// // //     if (!userId) return toast.error("Login Required 🔐");

// // //     try {
// // //       const updated = await addToCartApi(userId, item);
// // //       cartDispatch({ type: "SET_CART", payload: updated });
// // //       toast.success(`${item.name} added to meal plan! 🍽️`);
// // //     } catch (err) {
// // //       toast.error("Network error");
// // //     }
// // //   };

// // //   return (
// // //     <div className="container-fluid bg-light min-vh-100 py-4 px-md-5">
// // //       {/* ========================================= */}
// // //       {/*  HEADER / BACK BUTTON                   */}
// // //       {/* ========================================= */}
// // //       <div className="row mb-4">
// // //         <div className="col-12">
// // //           <button
// // //             onClick={() => navigate(-1)}
// // //             className="btn btn-link text-decoration-none px-0 fw-medium d-flex align-items-center gap-2"
// // //           >
// // //             <i className="bi bi-arrow-left"></i> Back to Menu
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* ========================================= */}
// // //       {/*  HERO SECTION (Image Left | Details Right)*/}
// // //       {/* ========================================= */}
// // //       <div className="row g-4 mb-5 align-items-center bg-white p-4 rounded-4 shadow-sm h-auto">
// // //         {/* LEFT: BIG IMAGE */}
// // //         <div className="col-lg-5 col-md-6 order-2 order-lg-1">
// // //           <div className="position-relative overflow-hidden rounded-4 shadow-inner bg-black-subtle aspect-ratio-1x1 flex justify-center items-center">
// // //             <img
// // //               src={item.image}
// // //               alt={item.name}
// // //               className="w-100 h-100 object-fit-cover transform hover-scale transition-all duration-500"
// // //               style={{
// // //                 transition: "transform 0.5s ease",
// // //                 transform: "scale(1.0)",
// // //               }}
// // //             />
// // //           </div>
// // //         </div>

// // //         {/* RIGHT: INFO & CART BUTTON */}
// // //         <div className="col-lg-4 col-md-6 order-1 order-lg-2 text-md-end d-flex flex-column justify-content-center">
// // //           <span className="badge bg-success mb-2">
// // //             {item.category.toUpperCase()}
// // //           </span>
// // //           <h1 className="display-6 fw-bold text-dark mb-2">{item.name}</h1>

// // //           {item.recipe && (
// // //             <div className="mb-3 fs-6 text-muted">
// // //               <span className="me-3">
// // //                 <strong>Time:</strong> {item.recipe.cookTimeMinutes} Mins
// // //               </span>
// // //             </div>
// // //           )}

// // //           <div className="mt-4 mb-3">
// // //             <h2 className="text-primary fw-bold mb-0">₹{item.price}</h2>
// // //           </div>

// // //           <button
// // //             onClick={handleAddMainItem}
// // //             className="btn btn-primary btn-lg w-100 shadow-lg py-3 fw-bold rounded-pill ripple-effect"
// // //             style={{ minWidth: "250px" }}
// // //           >
// // //             <i className="bi bi-cart-plus me-2"></i> Add Meal to Cart
// // //           </button>
// // //         </div>

// // //         {/* VIDEO PLACEHOLDER LOGIC (Handled via row wrapping visually below) */}
// // //       </div>

// // //       {/* ========================================= */}
// // //       {/*  CENTERED VIDEO SECTION                  */}
// // //       {/* ========================================= */}
// // //       <div className="row justify-content-center mb-5 mt-2">
// // //         <div className="col-lg-8 col-xl-7">
// // //           <h4 className="text-center fw-bold mb-3">Watch the Process 🎥</h4>
// // //           <div className="ratio ratio-16x9 rounded-3 shadow-lg overflow-hidden border border-secondary border-opacity-10">
// // //             {videoUrl ? (
// // //               <iframe src={videoUrl} title={item.name} allowFullScreen></iframe>
// // //             ) : (
// // //               <div className="d-flex align-items-center justify-content-center bg-secondary-subtle text-muted h-100">
// // //                 No Video Available
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* ========================================= */}
// // //       {/*  PROFESSIONAL RECIPE STEPS               */}
// // //       {/* ========================================= */}
// // //       <div className="row justify-content-center mb-5">
// // //         <div className="col-lg-8 col-xl-7">
// // //           <div className="d-flex align-items-center mb-4">
// // //             <div className="bg-primary text-white p-2 rounded-circle me-3">
// // //               👨‍🍳
// // //             </div>
// // //             <h3 className="fw-bold m-0">Master Chef's Guide</h3>
// // //           </div>

// // //           <div className="ps-4 position-relative">
// // //             {/* Vertical Timeline Line */}
// // //             <div
// // //               className="position-absolute top-0 start-0 bottom-0 border-start border-2 border-primary border-opacity-25 translate-middle-x"
// // //               style={{ left: "15px" }}
// // //             ></div>

// // //             {(item.recipe?.steps || []).map((step, i) => (
// // //               <div key={i} className="mb-4 ps-4 position-relative">
// // //                 {/* Step Dot */}
// // //                 <div
// // //                   className="position-absolute top-0 start-neg-4 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm z-1 border border-white border-2"
// // //                   style={{ width: "32px", height: "32px" }}
// // //                 >
// // //                   {step.stepNumber}
// // //                 </div>

// // //                 <div className="card border-0 shadow-sm hover-shadow rounded-3 p-4 transition-all">
// // //                   <div className="d-flex justify-content-between align-items-start mb-2">
// // //                     <h5 className="fw-bold text-dark mb-0">{step.title}</h5>
// // //                     <small className="text-muted badge bg-light rounded-pill">
// // //                       Phase {step.stepNumber}
// // //                     </small>
// // //                   </div>

// // //                   <p className="text-muted lead mb-3 border-bottom pb-3">
// // //                     {step.description}
// // //                   </p>

// // //                   {/* INGREDIENTS AREA */}
// // //                   <div className="mt-2">
// // //                     <div className="d-flex align-items-center mb-2">
// // //                       <small className="text-uppercase fw-bold text-secondary text-decoration-underline">
// // //                         Shopping List for this Step:
// // //                       </small>
// // //                     </div>

// // //                     <div className="d-flex flex-wrap gap-2">
// // //                       {step.ingredients?.length > 0 ? (
// // //                         step.ingredients.map((ing, idx) => (
// // //                           <div
// // //                             key={idx}
// // //                             className="border border-primary-subtle bg-primary-subtle-subtle rounded-pill px-3 py-2 d-flex align-items-center gap-2 animate-fade-up"
// // //                             style={{ animationDelay: `${idx * 0.1}s` }}
// // //                           >
// // //                             <div>
// // //                               <span className="d-block fw-bold text-dark">
// // //                                 {ing.name}
// // //                               </span>
// // //                               <span className="d-block fs-xs text-muted">
// // //                                 {ing.quantity}
// // //                               </span>
// // //                             </div>
// // //                             <button
// // //                               className="btn btn-sm btn-outline-primary rounded-circle ms-2 px-2"
// // //                               aria-label={`Add ${ing.name}`}
// // //                               onClick={(e) => handleAddIngredient(ing, e)}
// // //                             >
// // //                               <i className="bi bi-plus-lg"></i>
// // //                             </button>
// // //                           </div>
// // //                         ))
// // //                       ) : (
// // //                         <small className="text-muted fst-italic">
// // //                           No new ingredients needed for this step.
// // //                         </small>
// // //                       )}
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* ========================================= */}
// // //       {/*  RELATED SEARCH (GRID)                   */}
// // //       {/* ========================================= */}
// // //       <div className="row mb-5 pt-4">
// // //         <div className="col-12 mb-3">
// // //           <h3 className="fw-bold">You Might Also Like</h3>
// // //         </div>

// // //         {data
// // //           .filter((d) => d.category === item.category && d.id !== item.id)
// // //           .slice(0, 6)
// // //           .map((rel) => (
// // //             <div key={rel.id} className="col-md-4 col-lg-3 col-xl-2 mb-4">
// // //               <div
// // //                 className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 cursor-pointer transition-transform hover-lift"
// // //                 onClick={() => navigate(`/details/${type}/${rel.id}`)}
// // //               >
// // //                 <div className="overflow-hidden" style={{ height: "150px" }}>
// // //                   <img
// // //                     src={rel.image}
// // //                     className="card-img-top w-100 h-100 object-fit-cover"
// // //                     alt={rel.name}
// // //                   />
// // //                 </div>
// // //                 <div className="card-body p-3">
// // //                   <h6 className="card-title fw-bold text-truncate mb-1">
// // //                     {rel.name}
// // //                   </h6>
// // //                   <div className="d-flex justify-content-between align-items-center mt-2">
// // //                     <span className="text-danger fw-bold">₹{rel.price}</span>
// // //                     <span className="badge bg-light text-dark rounded-pill">
// // //                       View
// // //                     </span>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           ))}
// // //       </div>

// // //       {/* Styles Injection for Custom Animations */}
// // //       <style jsx>{`
// // //         .object-fit-cover {
// // //           object-fit: cover;
// // //         }
// // //         .cursor-pointer {
// // //           cursor: pointer;
// // //         }
// // //         .transition-transform {
// // //           transition: transform 0.2s ease;
// // //         }
// // //         .hover-lift:hover {
// // //           transform: translateY(-5px);
// // //           box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
// // //         }
// // //         .animate-fade-up {
// // //           opacity: 0;
// // //           animation: fadeUp 0.5s forwards;
// // //         }
// // //         @keyframes fadeUp {
// // //           to {
// // //             opacity: 1;
// // //             transform: translateY(0);
// // //           }
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // export default DetailsPage;
// // import React from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { useProducts } from "../context/product_context/useProducts";
// // import { useFood } from "../context/foodContext/useFood";
// // import { useCart } from "../context/cartContext/useCart";
// // import { useAuth } from "../context/authContext/useAuth";
// // import { addToCartApi } from "../utils/api/cartApis/cartApis";
// // import { toast } from "react-toastify";

// // const DetailsPage = () => {
// //   // --- Hooks ---
// //   const { id, type } = useParams();
// //   const navigate = useNavigate();
// //   const { cartDispatch } = useCart();
// //   const { user } = useAuth();
// //   const userId = user?.user?.id; // Assuming auth returns user object inside

// //   const productCtx = useProducts();
// //   const foodCtx = useFood();

// //   // --- Data Logic ---
// //   const data = type === "food" ? foodCtx.foodCache : productCtx.cache;

// //   if (!data.length) return <div className="text-center py-5">Loading...</div>;
// //   const item = data.find((d) => String(d.id) === String(id));

// //   if (!item) return <div className="text-center py-5">Item not found ❌</div>;

// //   // --- Video Parser ---
// //   const getEmbedUrl = (url) => {
// //     if (!url) return null;
// //     const videoId = url.match(/v=([^&]+)/);
// //     return videoId
// //       ? `https://www.youtube.com/embed/${videoId[1]}`
// //       : url;
// //   };
// //   const videoSrc = getEmbedUrl(item.recipe?.videoUrl || item.videoUrl);

// //   // --- Actions ---

// //   // Add individual ingredient
// //   const handleAddIngredient = async (ing) => {
// //     if (!userId) {
// //       toast.error("Please login to shop ingredients");
// //       return;
// //     }
// //     try {
// //       const payload = {
// //         id: `ing-${ing.name.replace(/\s/g,'')}-${Math.random()}`, // Unique ID mock
// //         title: ing.name,
// //         price: 50, // Default placeholder price
// //         quantity: ing.quantity,
// //         image: item.image
// //       };
// //       const newCart = await addToCartApi(userId, payload);
// //       cartDispatch({ type: "SET_CART", payload: newCart });
// //       toast.success(`Added ${ing.name} (${ing.quantity})`);
// //     } catch (err) {
// //       toast.error("Error adding ingredient");
// //     }
// //   };

// //   // Add whole meal
// //   const handleAddMeal = async () => {
// //     if (!userId) {
// //       toast.error("Login required");
// //       return;
// //     }
// //     try {
// //       const newCart = await addToCartApi(userId, item);
// //       cartDispatch({ type: "SET_CART", payload: newCart });
// //       toast.success(`${item.name} Added to Cart!`);
// //     } catch (err) {
// //       toast.error("Failed to add meal");
// //     }
// //   };

// //   // --- Render ---
// //   return (
// //     <div className="container bg-light min-vh-100 pb-5">

// //       {/* 1. Back Button */}
// //       <div className="d-flex justify-content-between align-items-center py-3 border-bottom mb-4">
// //          <button onClick={() => navigate(-1)} className="btn btn-outline-secondary btn-sm rounded-pill px-4">
// //             ← Back
// //          </button>
// //       </div>

// //       {/* 2. Top Layout: Image Left, Info Right */}
// //       <div className="row g-4 mb-5 align-items-center bg-white p-4 rounded shadow-sm">

// //         {/* Left: Large Image (4 cols) */}
// //         <div className="col-lg-4 col-md-6 order-2 order-lg-1">
// //           <img
// //             src={item.image}
// //             alt={item.name}
// //             className="img-fluid rounded-3 shadow w-100 h-100 object-fit-cover"
// //             style={{ maxHeight: '350px' }}
// //           />
// //         </div>

// //         {/* Right: Title, Price, Main Button (8 cols) */}
// //         <div className="col-lg-8 col-md-6 order-1 order-lg-2 d-flex flex-column justify-content-center">
// //            <h1 className="display-6 fw-bold text-dark">{item.name}</h1>
// //            <p className="lead text-muted mb-3">{item.category.toUpperCase()} • {type}</p>

// //            <h3 className="text-success fw-bold mb-4">₹{item.price}</h3>

// //            <button
// //              onClick={handleAddMeal}
// //              className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow fw-bold text-uppercase"
// //            >
// //              Add Full Meal to Cart 🛒
// //            </button>
// //         </div>
// //       </div>

// //       {/* 3. Video Section (Centered & Constrained Width) */}
// //       <div className="row justify-content-center mb-5">
// //         <div className="col-lg-9 col-xl-8">
// //           <div className="bg-black rounded overflow-hidden shadow-lg ratio ratio-16x9">
// //             {videoSrc ? (
// //               <iframe
// //                 src={videoSrc}
// //                 title={item.name}
// //                 allowFullScreen
// //               ></iframe>
// //             ) : (
// //               <div className="d-flex align-items-center justify-content-center text-white">
// //                 No Video Available
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* 4. Recipe Steps Section */}
// //       <div className="row justify-content-center mt-2">
// //         <div className="col-lg-9 col-xl-8">

// //           <h4 className="fw-bold mb-4 border-start border-4 border-primary ps-3">How to Cook 👨‍🍳</h4>

// //           {(item.recipe?.steps || []).map((step, index) => (
// //             <div key={index} className="mb-5 position-relative pl-4">

// //               {/* Step Number Indicator Line */}
// //               <div className="position-absolute start-neg-2 top-0 bottom-0 border-end border-2 border-secondary-subtle"></div>
// //               <div className="position-absolute start-neg-5 top-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width:'24px', height:'24px'}}>
// //                 <span className="fs-7">{step.stepNumber}</span>
// //               </div>

// //               <div className="card border-0 shadow-sm rounded-4 p-4 hover-grow">

// //                 {/* Step Header */}
// //                 <div className="d-flex justify-content-between align-items-center mb-3">
// //                   <h5 className="fw-bold m-0 text-dark">{step.title}</h5>
// //                   <small className="badge bg-light text-dark border rounded-pill">Phase {step.stepNumber}</small>
// //                 </div>

// //                 {/* Description */}
// //                 <p className="text-secondary text-wrap">{step.description}</p>

// //                 {/* Ingredients List - FIXED VISIBILITY */}
// //                 <div className="mt-4 pt-3 border-top">
// //                   <div className="fw-semibold text-muted mb-3 small text-uppercase tracking-wide">
// //                     Ingredients used here:
// //                   </div>

// //                   <div className="d-flex flex-wrap gap-3">
// //                     {step.ingredients && step.ingredients.length > 0 ? (
// //                       step.ingredients.map((ing, i) => (
// //                         <div key={i} className="d-inline-flex align-items-center bg-light border rounded-pill px-3 py-2 shadow-sm">
// //                           <div className="me-3">
// //                             <span className="d-block fw-bold text-dark">{ing.name}</span>
// //                             <span className="d-block text-muted small">{ing.quantity}</span>
// //                           </div>

// //                           <button
// //                             onClick={() => handleAddIngredient(ing)}
// //                             className="btn btn-sm btn-success rounded-circle ms-2"
// //                             aria-label={`Add ${ing.name}`}
// //                             style={{ minWidth: '36px' }}
// //                           >
// //                              +
// //                           </button>
// //                         </div>
// //                       ))
// //                     ) : (
// //                       <p className="text-muted fst-italic">No extra ingredients needed.</p>
// //                     )}
// //                   </div>
// //                 </div>

// //               </div>
// //             </div>
// //           ))}

// //         </div>
// //       </div>

// //       {/* 5. Related Products Grid */}
// //       <div className="row mt-5">
// //         <h4 className="mb-4 fw-bold text-center">Related Recipes</h4>

// //         {data
// //           .filter(d => d.id !== item.id)
// //           .slice(0, 6)
// //           .map(rel => (
// //             <div
// //               key={rel.id}
// //               className="col-md-4 col-lg-3 mb-4 cursor-pointer"
// //               onClick={() => navigate(`/details/${type}/${rel.id}`)}
// //             >
// //               <div className="card h-100 border-0 shadow-sm hover-lift">
// //                 <div style={{ height: '200px', overflow: 'hidden' }}>
// //                    <img src={rel.image} className="w-100 h-100 object-fit-cover" alt={rel.name}/>
// //                 </div>
// //                 <div className="card-body p-3 text-center">
// //                   <h6 className="fw-bold text-truncate">{rel.name}</h6>
// //                   <p className="text-success fw-bold mb-0">₹{rel.price}</p>
// //                 </div>
// //               </div>
// //             </div>
// //           ))
// //         }
// //       </div>

// //       {/* CSS Helper Class Injection */}
// //       <style jsx>{`
// //         .object-fit-cover { object-fit: cover; }
// //         .cursor-pointer { cursor: pointer; }
// //         .hover-grow:hover { transform: scale(1.01); transition: all 0.2s ease; }
// //         .hover-lift:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); transition: all 0.2s ease; }
// //         /* Ensure images don't collapse */
// //         img[src=""] { display: none; }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default DetailsPage;

// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useProducts } from "../context/product_context/useProducts";
// import { useFood } from "../context/foodContext/useFood";
// import { useCart } from "../context/cartContext/useCart";
// import { useAuth } from "../context/authContext/useAuth";
// import { addToCartApi } from "../utils/api/cartApis/cartApis";
// import { toast } from "react-toastify";
// import {
//   ShoppingCart,
//   Clock,
//   ChefHat,
//   Flame,
//   Play,
//   Plus,
//   ArrowLeft,
//   Check,
//   Leaf,
//   X,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";

// const DetailsPage = () => {
//   const { id, type } = useParams();
//   const navigate = useNavigate();
//   const [addedIngredients, setAddedIngredients] = useState([]);
//   const [expandedSteps, setExpandedSteps] = useState({});

//   const { cartDispatch } = useCart();
//   const { user } = useAuth();
//   const userId = user?.user?.id;

//   const productCtx = useProducts();
//   const foodCtx = useFood();

//   const data = type === "food" ? foodCtx.foodCache : productCtx.cache;

//   if (!data.length)
//     return (
//       <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
//         <div className="text-center">
//           <div className="spinner-border text-success" role="status"></div>
//           <p className="mt-3 text-muted">Loading...</p>
//         </div>
//       </div>
//     );

//   const item = data.find((d) => String(d.id) === String(id));

//   if (!item)
//     return (
//       <div className="container my-5 text-center">
//         <div className="alert alert-danger">
//           <h4>Item not found</h4>
//           <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
//             Go Back
//           </button>
//         </div>
//       </div>
//     );

//   const getEmbed = (url) => {
//     if (!url) return null;
//     const match = url.match(/v=([^&]+)/);
//     return match ? `https://www.youtube.com/embed/${match[1]}` : url;
//   };

//   const videoUrl = getEmbed(item.videoUrl || item.recipe?.videoUrl);

//   const handleAddIngredient = async (ing) => {
//     if (!userId) {
//       toast.error("Please login to add items");
//       return;
//     }

//     setAddedIngredients((prev) => [...prev, ing.name]);

//     const updated = await addToCartApi(userId, {
//       id: ing.name,
//       title: ing.name,
//       price: 10,
//       image: item.image,
//     });

//     cartDispatch({ type: "SET_CART", payload: updated });
//     toast.success(`${ing.name} added!`);

//     setTimeout(() => {
//       setAddedIngredients((prev) => prev.filter((n) => n !== ing.name));
//     }, 1500);
//   };

//   const handleAddFood = async () => {
//     if (!userId) {
//       toast.error("Please login to add items");
//       return;
//     }

//     const updated = await addToCartApi(userId, item);
//     cartDispatch({ type: "SET_CART", payload: updated });
//     toast.success(`${item.name} added to cart!`);
//   };

//   const allIngredients =
//     item.recipe?.steps?.flatMap((step) => step.ingredients || []) || [];
//   const totalTime = item.recipe?.cookTimeMinutes || 0;

//   const toggleStep = (index) => {
//     setExpandedSteps((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   return (
//     <div className="details-page bg-light">
//       {/* Header Section */}
//       <div
//         className="header-section position-relative"
//         style={{
//           background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)`,
//           minHeight: "420px",
//         }}
//       >
//         <div className="container py-4">
//           <button
//             className="btn btn-link text-white-50 text-decoration-none d-inline-flex align-items-center gap-2 mb-4"
//             onClick={() => navigate(-1)}
//           >
//             <ArrowLeft size={18} />
//             Back
//           </button>

//           <div className="row g-4">
//             {/* Left - Food Image Card */}
//             <div className="col-lg-4">
//               <div className="card border-0 rounded-4 overflow-hidden shadow">
//                 <div className="position-relative">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-100"
//                     style={{ height: "220px", objectFit: "cover" }}
//                   />
//                   <button
//                     onClick={handleAddFood}
//                     className="btn btn-success position-absolute bottom-0 end-0 m-3 rounded-pill px-3 py-2 d-flex align-items-center gap-2"
//                   >
//                     <ShoppingCart size={16} />
//                     Add to Cart
//                   </button>
//                   {item.category === "veg" && (
//                     <span className="badge bg-success position-absolute top-0 start-0 m-2 rounded-pill">
//                       <Leaf size={12} className="me-1" />
//                       Veg
//                     </span>
//                   )}
//                 </div>
//                 <div className="card-body bg-white">
//                   <h4 className="fw-bold text-dark mb-2">{item.name}</h4>
//                   <div className="d-flex align-items-center gap-3 mb-3">
//                     <span className="text-muted d-flex align-items-center gap-1 small">
//                       <Clock size={14} />
//                       {totalTime} min
//                     </span>
//                     <span className="text-muted d-flex align-items-center gap-1 small">
//                       <Flame size={14} />
//                       {item.recipe?.cookTimeCategory || "Medium"}
//                     </span>
//                   </div>
//                   <div className="d-flex align-items-center justify-content-between">
//                     <span className="fs-4 fw-bold text-success">
//                       ₹{item.price}
//                     </span>
//                     <span className="text-muted small">per portion</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right - Video */}
//             <div className="col-lg-8">
//               {videoUrl && (
//                 <div className="video-wrapper rounded-4 overflow-hidden shadow">
//                   <div className="ratio ratio-16x9">
//                     <iframe
//                       src={videoUrl}
//                       title="recipe video"
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                       allowFullScreen
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* Quick Stats */}
//               {/* <div className="d-flex flex-wrap gap-4 mt-4 justify-content-center">
//                 <div className="text-center">
//                   <div className="rounded-circle bg-success bg-opacity-10 p-3 mb-2">
//                     <Clock size={22} className="text-success" />
//                   </div>
//                   <p className="mb-0 fw-bold small">{totalTime} min</p>
//                   <small className="text-muted">Cook Time</small>
//                 </div>
//                 <div className="text-center">
//                   <div className="rounded-circle bg-primary bg-opacity-10 p-3 mb-2">
//                     <ChefHat size={22} className="text-primary" />
//                   </div>
//                   <p className="mb-0 fw-bold small">
//                     {item.recipe?.steps?.length || 0}
//                   </p>
//                   <small className="text-muted">Steps</small>
//                 </div>
//                 <div className="text-center">
//                   <div className="rounded-circle bg-warning bg-opacity-10 p-3 mb-2">
//                     <Leaf size={22} className="text-warning" />
//                   </div>
//                   <p className="mb-0 fw-bold small">{allIngredients.length}</p>
//                   <small className="text-muted">Ingredients</small>
//                 </div>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recipe Steps */}
//       <div className="container py-5">
//         <div className="text-center mb-4">
//           <h2 className="fw-bold text-dark d-inline-flex align-items-center gap-2">
//             <ChefHat size={32} className="text-success" />
//             Recipe Steps
//           </h2>
//           <p className="text-muted mt-1">
//             Follow step by step to make {item.name}
//           </p>
//         </div>

//         <div className="steps-container">
//           {item.recipe?.steps?.map((step, i) => (
//             <div key={i} className="step-card mb-3">
//               <div
//                 className="step-header d-flex align-items-center justify-content-between p-3"
//                 onClick={() => toggleStep(i)}
//                 style={{ cursor: "pointer" }}
//               >
//                 <div className="d-flex align-items-center gap-3">
//                   <div
//                     className="step-number rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
//                     style={{
//                       width: "40px",
//                       height: "40px",
//                       background: "linear-gradient(135deg, #28a745, #20c997)",
//                     }}
//                   >
//                     {step.stepNumber}
//                   </div>
//                   <div>
//                     <h5 className="mb-0 fw-bold text-dark">{step.title}</h5>
//                     <small className="text-muted">
//                       {step.ingredients?.length} ingredients
//                     </small>
//                   </div>
//                 </div>
//                 {expandedSteps[i] ? (
//                   <ChevronUp size={20} className="text-muted" />
//                 ) : (
//                   <ChevronDown size={20} className="text-muted" />
//                 )}
//               </div>

//               {expandedSteps[i] && (
//                 <div className="step-content bg-white p-3 pt-0">
//                   <p className="text-muted mb-3" style={{ lineHeight: "1.7" }}>
//                     {step.description}
//                   </p>

//                   {/* Ingredients */}
//                   <div className="ingredients-section">
//                     <h6 className="fw-bold text-dark mb-2 d-flex align-items-center gap-2">
//                       <Leaf size={16} className="text-success" />
//                       Ingredients
//                     </h6>
//                     <div className="d-flex flex-wrap gap-2">
//                       {step.ingredients?.map((ing, idx) => {
//                         const isAdded = addedIngredients.includes(ing.name);
//                         return (
//                           <div
//                             key={idx}
//                             className={`ingredient-chip px-3 py-2 rounded-pill d-inline-flex align-items-center gap-2 ${
//                               isAdded
//                                 ? "bg-success text-white"
//                                 : "bg-light border"
//                             }`}
//                           >
//                             <span className="small fw-medium">{ing.name}</span>
//                             <span className="text-muted small">
//                               ({ing.quantity})
//                             </span>
//                             {isAdded ? (
//                               <Check size={14} />
//                             ) : (
//                               <button
//                                 className="btn btn-sm p-0 border-0 bg-transparent text-success"
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   handleAddIngredient(ing);
//                                 }}
//                               >
//                                 <Plus size={14} />
//                               </button>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* All Ingredients */}
//       <div className="bg-white py-5">
//         <div className="container">
//           <div className="text-center mb-4">
//             <h3 className="fw-bold text-dark">All Ingredients</h3>
//             <p className="text-muted">Tap to add any ingredient to your cart</p>
//           </div>
//           <div
//             className="all-ingredients-wrapper p-4 rounded-4"
//             style={{ background: "#f8f9fa" }}
//           >
//             <div className="d-flex flex-wrap gap-2 justify-content-center">
//               {allIngredients.map((ing, idx) => {
//                 const isAdded = addedIngredients.includes(ing.name);
//                 return (
//                   <div
//                     key={idx}
//                     className={`all-ingredient-chip px-3 py-2 rounded-pill border d-inline-flex align-items-center gap-2 ${
//                       isAdded
//                         ? "bg-success text-white border-success"
//                         : "bg-white"
//                     }`}
//                     style={{ cursor: "pointer", transition: "all 0.2s" }}
//                     onClick={() => !isAdded && handleAddIngredient(ing)}
//                   >
//                     {isAdded ? (
//                       <>
//                         <Check size={14} />
//                         <span className="small">{ing.name}</span>
//                       </>
//                     ) : (
//                       <>
//                         <Plus size={14} className="text-success" />
//                         <span className="small fw-medium">{ing.name}</span>
//                         <span className="text-muted small">
//                           ({ing.quantity})
//                         </span>
//                       </>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Related Items */}
//       <div className="container py-5">
//         <div className="d-flex align-items-center justify-content-between mb-4">
//           <div>
//             <h3 className="fw-bold text-dark mb-1">Related Dishes</h3>
//             <p className="text-muted mb-0">You might also like</p>
//           </div>
//           <button
//             className="btn btn-outline-success rounded-pill"
//             onClick={() =>
//               navigate(`/${type === "food" ? "food" : "products"}`)
//             }
//           >
//             View All
//           </button>
//         </div>

//         <div className="row g-3">
//           {data
//             .filter(
//               (d) =>
//                 d.category === item.category &&
//                 String(d.id) !== String(item.id),
//             )
//             .slice(0, 4)
//             .map((rel) => (
//               <div
//                 key={rel.id}
//                 className="col-lg-3 col-md-6"
//                 onClick={() => navigate(`/details/${type}/${rel.id}`)}
//                 style={{ cursor: "pointer" }}
//               >
//                 <div className="card border-0 rounded-3 overflow-hidden shadow-sm h-100 related-card">
//                   <div className="position-relative">
//                     <img
//                       src={rel.image}
//                       alt={rel.name}
//                       className="w-100"
//                       style={{ height: "140px", objectFit: "cover" }}
//                     />
//                     <span className="badge bg-dark position-absolute top-0 end-0 m-2 rounded-pill">
//                       ₹{rel.price}
//                     </span>
//                   </div>
//                   <div className="card-body text-center py-3">
//                     <h6 className="fw-semibold text-dark mb-1">{rel.name}</h6>
//                     <small className="text-muted d-flex align-items-center justify-content-center gap-1">
//                       <Clock size={12} />
//                       {rel.recipe?.cookTimeMinutes || 30} min
//                     </small>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>

//         {data.filter(
//           (d) =>
//             d.category === item.category && String(d.id) !== String(item.id),
//         ).length === 0 && (
//           <div className="text-center py-5">
//             <ChefHat size={48} className="text-muted mb-3" />
//             <h5 className="text-muted">No related dishes found</h5>
//           </div>
//         )}
//       </div>

//       <style>{`
//         .details-page {
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//         }

//         .step-card {
//           border: 1px solid #e9ecef;
//           border-radius: 12px;
//           overflow: hidden;
//           background: #fff;
//           transition: all 0.3s ease;
//         }

//         .step-card:hover {
//           box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
//         }

//         .step-header {
//           background: #fff;
//         }

//         .step-content {
//           border-top: 1px solid #e9ecef;
//           animation: slideDown 0.3s ease;
//         }

//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .ingredient-chip,
//         .all-ingredient-chip {
//           font-size: 13px;
//           transition: all 0.2s ease;
//         }

//         .ingredient-chip:hover:not(.bg-success) {
//           background: #d4edda !important;
//           border-color: #28a745 !important;
//         }

//         .all-ingredient-chip:hover:not(.bg-success) {
//           background: #d4edda !important;
//           border-color: #28a745 !important;
//           transform: translateY(-2px);
//         }

//         .related-card {
//           transition: all 0.3s ease;
//         }

//         .related-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12) !important;
//         }

//         .video-wrapper iframe {
//           border-radius: 16px;
//         }

//         .btn-success {
//           background: linear-gradient(135deg, #28a745, #20c997);
//           border: none;
//         }

//         .btn-success:hover {
//           background: linear-gradient(135deg, #218a39, #1db386);
//         }

//         .btn-outline-success:hover {
//           background: #28a745;
//           color: #fff;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default DetailsPage;
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/product_context/useProducts";
import { useFood } from "../context/foodContext/useFood";
import { useCart } from "../context/cartContext/useCart";
import { useAuth } from "../context/authContext/useAuth";
import { addToCartApi } from "../utils/api/cartApis/cartApis";
import { toast } from "react-toastify";
import {
  ShoppingCart,
  Clock,
  ChefHat,
  Flame,
  Plus,
  ArrowLeft,
  Check,
  Leaf,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const DetailsPage = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [addedIngredients, setAddedIngredients] = useState([]);
  const [expandedSteps, setExpandedSteps] = useState({ 0: true }); // First step open by default

  const { cartDispatch } = useCart();
  const { user } = useAuth();
  const userId = user?.user?.id;

  const productCtx = useProducts();
  const foodCtx = useFood();

  const data = type === "food" ? foodCtx.foodCache : productCtx.cache;

  if (!data.length)
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-success" role="status"></div>
      </div>
    );

  const item = data.find((d) => String(d.id) === String(id));

  if (!item)
    return (
      <div className="container my-5 text-center">
        <h4>Item not found</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );

  const getEmbed = (url) => {
    if (!url) return null;
    const match = url.match(/v=([^&]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const videoUrl = getEmbed(item.videoUrl || item.recipe?.videoUrl);

  const handleAddIngredient = async (ing) => {
    if (!userId) {
      toast.error("Please login to add items");
      return;
    }

    setAddedIngredients((prev) => [...prev, ing.name]);

    const updated = await addToCartApi(userId, {
      id: ing.name,
      title: ing.name,
      price: 10,
      image: item.image,
    });

    cartDispatch({ type: "SET_CART", payload: updated });
    toast.success(`${ing.name} added!`);

    setTimeout(() => {
      setAddedIngredients((prev) => prev.filter((n) => n !== ing.name));
    }, 1500);
  };

  const handleAddFood = async () => {
    if (!userId) {
      toast.error("Please login to add items");
      return;
    }

    const updated = await addToCartApi(userId, item);
    cartDispatch({ type: "SET_CART", payload: updated });
    toast.success(`${item.name} added!`);
  };

  const allIngredients =
    item.recipe?.steps?.flatMap((step) => step.ingredients || []) || [];
  const totalTime = item.recipe?.cookTimeMinutes || 0;

  const toggleStep = (index) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-3">
        {/* Back Button */}
        <button
          className="btn btn-link text-secondary text-decoration-none d-inline-flex align-items-center gap-2 mb-3"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Top Section - Food Image + Video */}
        <div className="row g-3 mb-4 align-items-stretch">
          {/* LEFT - FOOD CARD */}
          <div className="col-lg-4 d-flex">
            <div className="card border rounded-3 overflow-hidden w-100 h-100 shadow-sm">
              {/* IMAGE */}
              <div className="position-relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-100"
                  style={{ height: "280px", objectFit: "cover" }}
                />

                {/* ADD BUTTON */}
                <button
                  onClick={handleAddFood}
                  className="btn btn-success position-absolute bottom-0 end-0 m-2 rounded-pill px-3 py-2"
                >
                  Add to Cart
                </button>

                {/* VEG BADGE */}
                {item.category === "veg" && (
                  <span className="badge bg-success position-absolute top-0 start-0 m-2 rounded-pill">
                    Veg
                  </span>
                )}
              </div>

              {/* INFO */}
              <div className="card-body py-3 d-flex flex-column">
                <h4 className="fw-bold mb-2">{item.name}</h4>

                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="badge bg-warning text-dark">4.5 ★</span>
                  <span className="text-muted small">{totalTime} min</span>
                </div>

                <div className="mt-auto d-flex justify-content-between border-top pt-2">
                  <span className="fw-bold text-success fs-5">
                    ₹{item.price}
                  </span>
                  <span className="text-muted small">per portion</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - VIDEO + STATS */}
          <div className="col-lg-8 d-flex flex-column">
            {/* VIDEO */}
            <div className="card border rounded-3 overflow-hidden shadow-sm flex-grow-1">
              <div style={{ height: "320px" }}>
                {videoUrl ? (
                  <iframe
                    src={videoUrl}
                    title="recipe video"
                    className="w-100 h-100"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-center h-100 bg-light">
                    <p className="text-muted">No video available</p>
                  </div>
                )}
              </div>
            </div>

            {/* STATS */}
            <div className="row g-2 mt-2">
              <div className="col-4">
                <div className="card border rounded-3 p-2 text-center h-100">
                  <p className="mb-0 fw-bold">{totalTime} min</p>
                  <small className="text-muted">Cook Time</small>
                </div>
              </div>

              <div className="col-4">
                <div className="card border rounded-3 p-2 text-center h-100">
                  <p className="mb-0 fw-bold">
                    {item.recipe?.steps?.length || 0}
                  </p>
                  <small className="text-muted">Steps</small>
                </div>
              </div>

              <div className="col-4">
                <div className="card border rounded-3 p-2 text-center h-100">
                  <p className="mb-0 fw-bold">{allIngredients.length}</p>
                  <small className="text-muted">Ingredients</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Steps - Accordion Style */}
        {/* <div className="mb-4">
          <h4 className="fw-bold text-dark mb-3">
            <ChefHat size={22} className="me-2 text-success" />
            Recipe Steps
          </h4>

          <div className="accordion" id="recipeAccordion">
            {item.recipe?.steps?.map((step, i) => (
              <div key={i} className="accordion-item border rounded-2 mb-2">
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${expandedSteps[i] ? "" : "collapsed"}`}
                    type="button"
                    onClick={() => toggleStep(i)}
                    style={{ cursor: "pointer" }}
                  >
                    <span
                      className="rounded-circle text-white fw-bold d-flex align-items-center justify-content-center me-2"
                      style={{
                        width: "28px",
                        height: "28px",
                        background: "linear-gradient(135deg, #28a745, #20c997)",
                        fontSize: "12px",
                      }}
                    >
                      {step.stepNumber}
                    </span>
                    <span className="fw-bold">{step.title}</span>
                    <span className="text-muted ms-auto me-2 small">
                      {step.ingredients?.length} ingredients
                    </span>
                    {expandedSteps[i] ? (
                      <ChevronUp size={16} className="text-muted" />
                    ) : (
                      <ChevronDown size={16} className="text-muted" />
                    )}
                  </button>
                </h2>
                <div
                  className={`accordion-collapse ${expandedSteps[i] ? "show" : ""}`}
                >
                  <div className="accordion-body pt-2">
                    <p
                      className="text-muted small mb-3"
                      style={{ lineHeight: "1.6" }}
                    >
                      {step.description}
                    </p>

                    <div className="d-flex flex-wrap gap-2">
                      {step.ingredients?.map((ing, idx) => {
                        const isAdded = addedIngredients.includes(ing.name);
                        return (
                          <button
                            key={idx}
                            onClick={() => !isAdded && handleAddIngredient(ing)}
                            className={`btn btn-sm rounded-pill px-3 ${
                              isAdded
                                ? "btn-success text-white"
                                : "btn-outline-success"
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check size={12} className="me-1" />
                                {ing.name}
                              </>
                            ) : (
                              <>
                                <Plus size={12} className="me-1" />
                                {ing.name} ({ing.quantity})
                              </>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <div className="mb-4">
          <h4 className="fw-bold text-dark mb-3">
            <ChefHat size={22} className="me-2 text-success" />
            Recipe Steps
          </h4>

          <div className="row g-3">
            {item.recipe?.steps?.map((step, i) => (
              <div key={i} className="col-12">
                {/* STEP CARD */}
                <div className="card border rounded-3 shadow-sm">
                  {/* HEADER */}
                  <div className="card-header bg-white d-flex align-items-center gap-2">
                    <span
                      className="rounded-circle text-white fw-bold d-flex align-items-center justify-content-center"
                      style={{
                        width: "28px",
                        height: "28px",
                        background: "linear-gradient(135deg, #28a745, #20c997)",
                        fontSize: "12px",
                      }}
                    >
                      {step.stepNumber}
                    </span>

                    <h6 className="mb-0 fw-bold">{step.title}</h6>
                  </div>

                  {/* BODY */}
                  <div className="card-body">
                    {/* DESCRIPTION */}
                    <p
                      className="text-muted small mb-3"
                      style={{ lineHeight: "1.6" }}
                    >
                      {step.description}
                    </p>

                    {/* INGREDIENTS */}
                    <div className="d-flex flex-wrap gap-2">
                      {step.ingredients?.map((ing, idx) => {
                        const isAdded = addedIngredients.includes(ing.name);

                        return (
                          <button
                            key={idx}
                            onClick={() => handleAddIngredient(ing)}
                            className={`btn btn-sm rounded-pill px-3 ${
                              isAdded
                                ? "btn-success text-white"
                                : "btn-outline-success"
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check size={12} className="me-1" />
                                {ing.name}
                              </>
                            ) : (
                              <>
                                <Plus size={12} className="me-1" />
                                {ing.name} ({ing.quantity})
                              </>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Ingredients */}
        <div className="mb-4">
          <h4 className="fw-bold text-dark mb-3">
            <Leaf size={22} className="me-2 text-success" />
            All Ingredients
          </h4>
          <div
            className="card border rounded-3 p-3"
            style={{ background: "#f8f9fa" }}
          >
            <div className="d-flex flex-wrap gap-2">
              {allIngredients.map((ing, idx) => {
                const isAdded = addedIngredients.includes(ing.name);
                return (
                  <button
                    key={idx}
                    onClick={() => !isAdded && handleAddIngredient(ing)}
                    className={`btn rounded-pill px-3 py-1 ${
                      isAdded ? "btn-success text-white" : "btn-light border"
                    }`}
                    style={{ fontSize: "13px" }}
                  >
                    {isAdded ? (
                      <>
                        <Check size={12} className="me-1" />
                        {ing.name}
                      </>
                    ) : (
                      <>
                        <Plus size={12} className="me-1 text-success" />
                        {ing.name} ({ing.quantity})
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Related Items */}
        <div className="mb-4">
          <h4 className="fw-bold text-dark mb-3">Related Dishes</h4>
          <div className="row g-3">
            {data
              .filter(
                (d) =>
                  d.category === item.category &&
                  String(d.id) !== String(item.id),
              )
              .slice(0, 4)
              .map((rel) => (
                <div
                  key={rel.id}
                  className="col-lg-3 col-md-6"
                  onClick={() => navigate(`/details/${type}/${rel.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card border rounded-3 overflow-hidden h-100">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-100"
                      style={{ height: "130px", objectFit: "cover" }}
                    />
                    <div className="card-body text-center py-2">
                      <h6 className="mb-1 fw-bold text-dark small">
                        {rel.name}
                      </h6>
                      <div
                        className="d-flex align-items-center justify-content-center gap-2 text-muted"
                        style={{ fontSize: "12px" }}
                      >
                        <Clock size={10} />
                        {rel.recipe?.cookTimeMinutes || 30} min
                        <span className="text-success fw-bold">
                          ₹{rel.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
