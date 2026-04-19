import React from "react";
import Hero from "../components/ui/Hero";


import investImg from "../assets/images/invest.jpg";
import ecommerceImg from "../assets/images/shoe.jpg";
import foodImg from "../assets/images/food.jpg";
import groceryImg from "../assets/images/grocery.jpg";

import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/ui/FeatureCard";
import { useProducts } from "../context/product_context/useProducts";

const HomePage = () => {
  const navigate = useNavigate();
  const{productDispatch}=useProducts()

  return (
    <>
      <Hero />
      

   
      <section className="py-5">
        <div className="container">
          <div className="row g-6">

          
            <div className="col-md-6 col-lg-4">
              <FeatureCard title="Investment" image={investImg}>
                <button
                  onClick={() =>{ window.scrollTo({ top: 0, behavior: "smooth" });
                 navigate("/invest")}}
                  className="btn text-white position-absolute bottom-0 start-50 translate-middle-x mb-3 px-4"
                  style={{ backgroundColor: "#008060" }}
                >
                  Invest Now
                </button>
              </FeatureCard>
            </div>

          
            <div className="col-md-6 col-lg-4">
              <FeatureCard title="E-Commerce" image={ecommerceImg}>
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                   productDispatch({type:"SET_CATEGORY",payload:"all"}) 
                    navigate("/shopping")}}
                  className="btn text-white position-absolute bottom-0 start-50 translate-middle-x mb-3 px-4"
                  style={{ backgroundColor: "#008060" }}
                >
                  Order Now
                </button>
              </FeatureCard>
            </div>

           
            <div className="col-md-6 col-lg-4">
              <FeatureCard title="Food & Dining" image={foodImg}>
                <button
                  onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); navigate("/orderFood")}}
                  className="btn text-white position-absolute bottom-0 start-50 translate-middle-x mb-3 px-4"
                  style={{ backgroundColor: "#008060" }}
                >
                  Order Now
                </button>
              </FeatureCard>
            </div>


          </div>
        </div>
      </section>

      
    </>
  );
};

export default HomePage;