import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../../assets/heropage.css"
import { Footer } from '../layouts/Footer';
import { Navbar } from '../layouts/Navbar';

export const HeroPage = () => {
  const [language, setLanguage] = useState("English (India)");
  const destinations = [
    { from: "New Delhi", to: "Chandigarh" },
    { from: "New Delhi", to: "Jaipur" },
    { from: "New Delhi", to: "Agra" }
  ];
  const faqs = [
    {
      question: "How do I book a carpool ride?",
      answer:
        "You can book a carpool ride on our mobile app or website. Simply search for your destination, choose your travel date, and select a carpool that suits you best!",
      more:
        "Once you've selected a ride, confirm your booking and contact the driver if needed. Payments can be made securely within the app.",
    },
    {
      question: "How do I publish a carpool ride?",
      answer:
        "Offering a carpool ride is simple. Use our app or website to enter your departure and arrival locations, date, and available seats.",
      more:
        "You can set your own price, choose preferences for passengers, and confirm bookings instantly or manually.",
    },
    {
      question: "What are the benefits of travelling by carpool?",
      answer:
        "Carpooling is cost-effective, eco-friendly, and a great way to meet new people while reducing traffic congestion.",
      more:
        "You save money on fuel, contribute to a greener environment, and make your journey more enjoyable by sharing it with others.",
    },
    {
      question: "How do I cancel my carpool ride?",
      answer:
        "If your plans change, you can cancel your ride from the 'My Rides' section in the app.",
      more:
        "We recommend canceling as early as possible to allow other users to book the seat. Refund policies may apply based on the timing of cancellation.",
    },
  ];
  const [expanded, setExpanded] = useState(null);
  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };
  return (
    <>
    <div>
      <Navbar/>
    </div>
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className='hero-image'>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          {/* <h2>Ride Smarter, Save More, Go Greener!</h2> */}
          <div className="features">
            <div className="feature-box">
              <h1>🤝</h1>
              <h3>Ride Smart, Ride Together</h3>
              <p>Connect with reliable riders and make every trip more affordable. Share the journey, cut costs, and enjoy the ride!</p>
            </div>
            <div className="feature-box">
              <h1>🌱</h1>
              <h3>Eco-Friendly & Wallet-Friendly</h3>
              <p>Reduce your carbon footprint while saving money. Every shared ride helps build a greener and more sustainable future!</p>
            </div>
            <div className="feature-box">
              <h1>⚡</h1>
              <h3> Fast, Safe & Convenient</h3>
              <p>Find trusted ride partners in seconds. Enjoy a smooth, secure, and hassle-free travel experience!</p>
            </div>
            {/* <div className="feature-box">
          <span>🔔</span>
          <h3>Smart Reminders</h3>
          <p>Stay on track with real-time notifications and alerts.</p>
        </div> */}
          </div>
        </section>
        <section>
          <div className='blockmain'>
            <div className='block1'>
            </div>
            <div className='block2'>
              <h2>Your Safety, Our Priority</h2>
              <p style={{ margin: "35px 0px" }}>At RideTogether, we are committed to making your ride-sharing experience safe and reliable. While we work hard to ensure security, we want you to stay informed about potential risks and how to avoid them. Follow our safety tips and ride with confidence!</p>
              <button className='learn-more'>Learn More</button>
            </div>
          </div>
        </section>
        <section>
          <div className='driving'>
            <div className='driving-block2'>
              <h2>Hitting the road soon?</h2>
              <p style={{ margin: "35px 0px" }}>Make your trip smarter share your ride and save more on the journey!</p>
              <button className='offer'>Offer A Ride</button>
            </div>
            <div className='driving-block1'>
            </div>
          </div>
        </section>
        <section>
          <div className='freq-places'>
            <div className="freq-container">
              <h2 className="heading">Where’s Your Next Ride?</h2>
              <div className="button-container">
                {destinations.map((route, index) => (
                  <button key={index} className="destination-button">
                    {route.from} → {route.to}
                  </button>
                ))}
              </div>
              <a href="#" className="link">See our most popular rides</a>
            </div>
          </div>
        </section>
        <section>
          <div>
            <h1 className="title">Ride-Together Help Centre</h1>
            <div className="help-centre">
              <div className="faq-container">
                {faqs.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <h3 className="faq-question">{faq.question}</h3>
                    <p className="faq-answer">
                      {faq.answer}
                      {expanded === index && <span className="faq-more"> {faq.more}</span>}
                    </p>
                    <button className="read-more" onClick={() => toggleExpand(index)}>
                      {expanded === index ? "" : "Read more"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="read-button-container">
            <button className="help-button">Read our Help Centre</button>
          </div>
        </section>
        <section>
          <Footer />
        </section>
      </div>
    </>
  )
}
