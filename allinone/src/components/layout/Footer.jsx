import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white pt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              {[
                {t:'About', l:['About Us','Careers']},
                {t:'Services', l:['Investing','Shopping','Food & Dining']},
                {t:'Support', l:['Help Center','FAQs','Contact Us']},
                {t:'Legal', l:['Privacy Policy','Terms of Service']},
              ].map(sec => (
                <div className="col-6 col-md-3" key={sec.t}>
                  <h6 className="fw-bold mb-3">{sec.t}</h6>
                  <ul className="list-unstyled">
                    {sec.l.map(i=> <li key={i}><a href="#" className="text-decoration-none text-secondary small">{i}</a></li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <div className="d-flex gap-2 mb-4">
              <a className="btn btn-sm rounded-circle text-white" style={{background:'#3b5998'}}><FaFacebookF/></a>
              <a className="btn btn-sm rounded-circle text-white" style={{background:'#55acee'}}><FaTwitter/></a>
              <a className="btn btn-sm rounded-circle text-white" style={{background:'#e4405f'}}><FaInstagram/></a>
              <a className="btn btn-sm rounded-circle text-white" style={{background:'#0077b5'}}><FaLinkedinIn/></a>
            </div>
            <h6>Subscribe to our Newsletter</h6>
            <div className="d-flex gap-2">
              <input className="form-control" placeholder="Enter your email"/>
              <button className="btn text-white" style={{backgroundColor:'#008060'}}>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-3 mt-4 border-top small text-muted">© 2026 ALL IN ONE BUSINESS...</div>
    </footer>
  );
};
export default Footer;