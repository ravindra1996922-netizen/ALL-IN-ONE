import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/ui/Hero';
import FeatureCard from '../components/ui/FeatureCard';
import Footer from '../components/layout/Footer';

import investImg from '../assets/images/invest.jpg';
import ecommerceImg from '../assets/images/shoe.jpg';
import foodImg from '../assets/images/food.jpg';
import groceryImg from '../assets/images/grocery.jpg';

const HomePage = () => {
  return (
    <>
      
      <Hero />

      {/* 4 Cards Section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <FeatureCard title="Investment" image={investImg} />
            </div>

            <div className="col-md-6 col-lg-3">
              <FeatureCard title="E-Commerce" image={ecommerceImg}>
                <button className="btn btn-dark position-absolute bottom-0 start-50 translate-middle-x mb-3 px-4" style={{opacity:0.8}}>Latest Trends</button>
              </FeatureCard>
            </div>

            <div className="col-md-6 col-lg-3">
              <FeatureCard title="Food & Dining" image={foodImg}>
                <button className="btn text-white position-absolute bottom-0 start-50 translate-middle-x mb-3 px-4" style={{backgroundColor:'#008060'}}>Order Now</button>
              </FeatureCard>
            </div>

            <div className="col-md-6 col-lg-3">
              <FeatureCard title="Groceries" image={groceryImg} badge={<>Same-Day<br/>Delivery</>}/>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HomePage;