import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";

import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaYoutube,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaArrowUp,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import "./Footer.css";


const QUICK_LINKS = [
  { label: "Home", path: "/" },
  { label: "Marketplace", path: "/marketplace" },
  { label: "Services", path: "/services" },
  { label: "Sell Product", path: "/sell-product" },
  { label: "Contact Us", path: "/contact" },
];


const SELLER_LINKS = [
  { label: "Sell Product", path: "/sell-product" },
  { label: "Create Profile", path: "/create-profile" },
  { label: "Post Work", path: "/post-work" },
];


const SUPPORT_LINKS = [
  { label: "FAQ", path: "/faq" },
  { label: "Help Center", path: "/help" },
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Terms & Conditions", path: "/terms" },
];


const SOCIAL_LINKS = [
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/919876543210"
  },
  {
    icon: FaFacebook,
    label: "Facebook",
    href: "#"
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "#"
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "#"
  },
  {
    icon: FaYoutube,
    label: "YouTube",
    href: "#"
  },
  {
    icon: FaXTwitter,
    label: "X Twitter",
    href: "#"
  },
];


const Footer = () => {

  const navigate = useNavigate();


  const handleScrollToTop = () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  const safeNavigate = (path) => {

    if(path){
      navigate(path);
    }

  };


  return (

    <footer className="lokart-footer">


      <div className="footer-top">


        {/* Brand */}

        <div className="footer-brand-section">


          <div className="footer-logo">


            <img
              src={logo}
              alt="LokArt Logo"
              className="footer-logo-img"
            />


            <span>
              LokArt
            </span>


          </div>


          <p className="footer-brand-desc">

            गांव की पहचान, देश की शान।
            Empowering local village artisans and connecting
            skilled rural workers with a global digital marketplace.

          </p>


        </div>



        {/* Quick Links */}

        <div>

          <h4 className="footer-heading">
            Quick Links
          </h4>


          <ul className="footer-links-list">

            {
              QUICK_LINKS.map(({label,path}) => (

                <li key={path}>

                  <button
                    className="footer-link-btn"
                    onClick={()=>safeNavigate(path)}
                  >

                    {label}

                  </button>

                </li>

              ))
            }

          </ul>


        </div>



        {/* Seller */}

        <div>

          <h4 className="footer-heading">
            Seller
          </h4>


          <ul className="footer-links-list">

          {
            SELLER_LINKS.map(({label,path})=>(

              <li key={path}>

                <button
                className="footer-link-btn"
                onClick={()=>safeNavigate(path)}
                >

                  {label}

                </button>

              </li>

            ))
          }

          </ul>


        </div>



        {/* Support */}

        <div>

          <h4 className="footer-heading">
            Support
          </h4>


          <ul className="footer-links-list">


          {
            SUPPORT_LINKS.map(({label,path})=>(

              <li key={path}>

                <button
                className="footer-link-btn"
                onClick={()=>safeNavigate(path)}
                >

                {label}

                </button>


              </li>

            ))
          }


          </ul>


        </div>



        {/* Contact */}


        <div>


          <h4 className="footer-heading">
            Contact
          </h4>



          <div className="footer-contact-item">

            <FaEnvelope className="footer-contact-icon"/>

            <span>
              support@lokart.in
            </span>

          </div>



          <div className="footer-contact-item">

            <FaPhoneAlt className="footer-contact-icon"/>

            <span>
              +91 XXXXX XXXXX
            </span>

          </div>



          <div className="footer-contact-item">

            <FaMapMarkerAlt className="footer-contact-icon"/>

            <span>
              Rajasthan, India
            </span>

          </div>



          <div className="footer-social-container">


          {
            SOCIAL_LINKS.map(({icon:Icon,label,href})=>(

              <a
                key={label}
                href={href}
                className="footer-social-icon"
                target="_blank"
                rel="noreferrer"
              >

                <Icon/>

              </a>

            ))
          }


          </div>



          <form
          className="newsletter-form"
          onSubmit={(e)=>e.preventDefault()}
          >

            <input
            type="email"
            placeholder="Enter your email"
            />


            <button>
              Subscribe
            </button>


          </form>



        </div>


      </div>



      <div className="footer-bottom">


        <div className="footer-bottom-layout">


          <p className="footer-copyright">

            © {new Date().getFullYear()} LokArt. All Rights Reserved.

            <br/>

            Empowering Rural India through Technology.

          </p>



          <button
          className="btn-scroll-top"
          onClick={handleScrollToTop}
          >

            <FaArrowUp/>

          </button>


        </div>


      </div>


    </footer>

  );

};


export default Footer;