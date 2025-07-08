import React from "react";
import {
  FaUsers,
  FaGlobe,
  FaIndustry,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiRuby,
  SiFramer,
  SiMixpanel,
} from "react-icons/si";

function CompanyProfile() {
  return (
    <div className="p-6 flex flex-col h-full overflow-y-auto gap-6">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-main_blue w-20 h-20 rounded-lg flex items-center justify-center text-white text-4xl font-bold">
            S
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Stripe</h1>
            <a
              href="https://stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-main_blue text-sm font-semibold hover:underline"
            >
              https://stripe.com
            </a>
            <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <FaCalendarAlt className="text-main_blue" /> Founded{" "}
                <span className="font-semibold ml-1">July 31, 2011</span>
              </div>
              <div className="flex items-center gap-1">
                <FaUsers className="text-main_blue" /> Employees{" "}
                <span className="font-semibold ml-1">4000+</span>
              </div>
              <div className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-main_blue" /> Location{" "}
                <span className="font-semibold ml-1">20 countries</span>
              </div>
              <div className="flex items-center gap-1">
                <FaIndustry className="text-main_blue" /> Industry{" "}
                <span className="font-semibold ml-1">Payment Gateway</span>
              </div>
            </div>
          </div>
        </div>
        <button className="bg-main_blue text-white px-4 py-2 rounded font-semibold shadow hover:bg-blue-600 transition">
          24 Jobs
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* Left Column */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          {/* Company Profile */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="font-bold text-lg mb-2">Company Profile</h2>
            <p className="text-gray-600 text-sm">
              Stripe is a software platform for starting and running internet
              businesses. Millions of businesses rely on Stripe's software tools
              to accept payments, expand globally, and manage their businesses
              online. Stripe has been at the forefront of expanding internet
              commerce, powering new business models, and supporting the latest
              platforms, from marketplaces to mobile commerce sites. We believe
              that growing the GDP of the internet is a problem rooted in code
              and design, not finance. Stripe is built for developers, makers,
              and creators. We work on solving the hard technical problems
              necessary to build global economic infrastructure—from designing
              highly reliable systems to developing advanced machine learning
              algorithms to prevent fraud.
            </p>
          </div>
          {/* Contact */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="font-bold text-lg mb-2">Contact</h2>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-main_blue" /> contact@stripe.com
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-main_blue" /> +1 800-123-4567
              </div>
              <div className="flex gap-3 mt-2">
                <a
                  href="https://twitter.com/stripe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-main_blue"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href="https://facebook.com/StripeHQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-main_blue"
                >
                  <FaFacebook size={20} />
                </a>
                <a
                  href="https://linkedin.com/company/stripe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-main_blue"
                >
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <div className="bg-white rounded-lg  p-6">
            <h2 className="font-bold text-lg mb-2">Office Location</h2>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-lg">🇺🇸</span> United States
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🇬🇧</span> England
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🇯🇵</span> Japan
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🇦🇺</span> Australia
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🇨🇳</span> China
              </div>
              <a
                href="#"
                className="text-main_blue text-xs font-semibold mt-2 hover:underline"
              >
                View countries →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyProfile;
