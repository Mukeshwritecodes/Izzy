import React, { useState } from "react";
import Branch from "../Assets/Images/Branch.png";
import BranchR from "../Assets/Images/BranchR.png";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Clear success message after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      title: "Visit Our Store",
      details: ["123 Literary Lane", "Bookworm District, BD 12345", "Open: Mon-Sat 9AM-8PM, Sun 10AM-6PM"],
      icon: "📍",
    },
    {
      title: "Get In Touch",
      details: ["Phone: (555) 123-BOOK", "Email: hello@izzystore.com", "Support: support@izzystore.com"],
      icon: "📞",
    },
    {
      title: "Follow Our Journey",
      details: ["@IzzyBookstore on Instagram", "@IzzyReads on Twitter", "Izzy Literary Community on Facebook"],
      icon: "📱",
    },
  ];

  const faqItems = [
    {
      question: "What are your shipping policies?",
      answer: "We offer free shipping on orders over $35. Standard delivery takes 3-5 business days, and express delivery is available for next-day or 2-day shipping.",
    },
    {
      question: "Can I return or exchange books?",
      answer: "Yes! We accept returns within 30 days of purchase for unopened books in original condition. Exchanges are welcome for store credit or different titles.",
    },
    {
      question: "Do you offer book recommendations?",
      answer: "Absolutely! Our literary experts love helping readers discover their next favorite book. Visit our store or contact us with your preferences.",
    },
    {
      question: "Are there book clubs or events?",
      answer: "We host monthly book clubs, author readings, and literary workshops. Check our blog or follow our social media for upcoming events.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1F1E3E] to-[#B787B6] py-16 px-4 sm:px-6 lg:px-12">
        <img src={Branch} alt="Decorative branch" className="absolute top-0 left-0 w-20 h-20 opacity-50 rotate-90" />
        <img src={BranchR} alt="Decorative branch" className="absolute bottom-0 right-0 w-24 h-24 opacity-50" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F8FBE6] mb-4" style={{ fontFamily: "Irish Grover, cursive" }}>
            Get in Touch
          </h1>
          <p className="text-xl sm:text-2xl text-[#F8FBE6] opacity-90 mb-8" style={{ fontFamily: "Playfair Display, serif" }}>
            "Every great conversation starts with a simple hello"
          </p>
          <div className="w-24 h-1 bg-[#F27C66] mx-auto"></div>
        </div>
      </div>

      {/* Contact Form and Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-[#1F1E3E] mb-6" style={{ fontFamily: "Jura, sans-serif" }}>
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">Have a question, suggestion, or just want to share your latest reading adventure? We'd love to hear from you!</p>

              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg">
                  <p className="text-green-800 font-semibold">📍 Thank you! Your message has been sent successfully.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-[#1F1E3E] mb-2">
                      Full Name *
                    </label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B787B6] focus:border-transparent" placeholder="Your full name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#1F1E3E] mb-2">
                      Email Address *
                    </label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B787B6] focus:border-transparent" placeholder="your.email@example.com" />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-[#1F1E3E] mb-2">
                    Subject *
                  </label>
                  <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B787B6] focus:border-transparent">
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="recommendation">Book Recommendation</option>
                    <option value="order">Order Support</option>
                    <option value="partnership">Partnership/Collaboration</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#1F1E3E] mb-2">
                    Message *
                  </label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="6" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B787B6] focus:border-transparent resize-vertical" placeholder="Tell us what's on your mind..."></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-[#B787B6] hover:bg-[#A076A5] disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-[#1F1E3E] mb-6" style={{ fontFamily: "Jura, sans-serif" }}>
                Visit Izzy
              </h2>
              <p className="text-gray-600 mb-8">Step into our literary sanctuary where stories come alive and every book lover feels at home.</p>

              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#F27C66] rounded-full flex items-center justify-center text-white text-xl">{info.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#1F1E3E] mb-2">{info.title}</h3>
                      <div className="space-y-1">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-600">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 h-64 bg-gradient-to-br from-[#B787B6] to-[#CCA1E5] rounded-xl flex items-center justify-center relative overflow-hidden">
                <img src={Branch} alt="Decorative" className="absolute top-0 right-0 w-16 h-16 opacity-60 rotate-180" />
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">📍</div>
                  <p className="text-lg font-semibold">Interactive Map Coming Soon</p>
                  <p className="text-sm opacity-90">Visit us at 123 Literary Lane</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F1E3E] mb-4" style={{ fontFamily: "Jura, sans-serif" }}>
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-[#F27C66] mx-auto"></div>
          </div>

          <div className="space-y-6">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#1F1E3E] mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-gradient-to-r from-[#1F1E3E] to-[#B787B6] relative">
        <img src={BranchR} alt="Decorative branch" className="absolute top-0 right-0 w-32 h-32 opacity-50 rotate-270" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FBE6] mb-4" style={{ fontFamily: "Jura, sans-serif" }}>
            Join Our Literary Community
          </h2>
          <p className="text-lg text-[#F8FBE6] opacity-90 mb-8">Connect with fellow book lovers, discover new authors, and share your reading journey with us.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#F27C66] hover:bg-[#E06B55] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">Follow Us on Instagram</button>
            <button className="bg-transparent border-2 border-[#F8FBE6] text-[#F8FBE6] hover:bg-[#F8FBE6] hover:text-[#1F1E3E] font-semibold py-3 px-6 rounded-lg transition-colors duration-200">Join Our Newsletter</button>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white relative">
        <img src={Branch} alt="Decorative branch" className="absolute bottom-0 left-0 w-28 h-28 opacity-20" />
        <div className="relative max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl sm:text-3xl lg:text-4xl text-[#1F1E3E] font-italic leading-relaxed" style={{ fontFamily: "Playfair Display, serif" }}>
            "A book is a dream that you hold in your hand."
          </blockquote>
          <cite className="block mt-6 text-lg text-[#B787B6] font-semibold">- Neil Gaiman</cite>
        </div>
      </section>
    </div>
  );
}
