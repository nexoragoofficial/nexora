import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiTruck, FiArrowRight, FiGrid } from 'react-icons/fi';

const HeroBanner = ({ banners = [], onSearchClick, heroData }) => {
  const title = heroData?.title || 'Everything You Need, Delivered to You.';
  const subtitle = heroData?.subtitle || 'One super app for all your daily needs.\nFast, reliable & secure delivery at your doorstep.';
  const primaryBtnText = heroData?.primaryBtnText || 'Get Started';
  const secondaryBtnText = heroData?.secondaryBtnText || 'Explore Services';
  const heroImage = '/home page .jpeg';

  // Split title for styling - make "Delivered to You." in blue
  const renderTitle = () => {
    const parts = title.split(/(Delivered to You\.?)/i);
    return parts.map((part, i) => {
      if (/delivered to you\.?/i.test(part)) {
        return <span key={i} style={{ color: '#2563eb' }}>{part}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="relative w-full overflow-hidden min-h-[450px] lg:min-h-[600px] flex items-center" style={{
      backgroundImage: `url('${heroImage}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center right',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Subtle Cityscape Silhouette Effect */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 200'%3E%3Crect x='50' y='80' width='40' height='120' fill='%232563eb'/%3E%3Crect x='100' y='40' width='30' height='160' fill='%232563eb'/%3E%3Crect x='140' y='60' width='50' height='140' fill='%232563eb'/%3E%3Crect x='200' y='90' width='35' height='110' fill='%232563eb'/%3E%3Crect x='250' y='50' width='45' height='150' fill='%232563eb'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'bottom',
        backgroundSize: 'auto 200px'
      }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-10 lg:pt-16 pb-8 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-4 lg:gap-6 lg:col-span-6"
          >
            <div className="space-y-3 lg:space-y-5">
              <h1 className="text-3xl sm:text-4xl lg:text-[3.5rem] xl:text-6xl font-[900] text-gray-900 leading-[1.1] tracking-tight">
                {renderTitle()}
              </h1>
              <p className="text-sm lg:text-lg text-gray-500 font-medium max-w-md leading-relaxed whitespace-pre-line">
                {subtitle}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-2 lg:mt-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(37, 99, 235, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={onSearchClick}
                className="px-7 py-3 lg:px-9 lg:py-3.5 text-white border-none rounded-full font-bold shadow-lg shadow-blue-500/25 flex items-center gap-2.5 text-sm lg:text-base transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' }}
              >
                {primaryBtnText}
                <FiArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#f0f6ff' }}
                whileTap={{ scale: 0.95 }}
                onClick={onSearchClick}
                className="px-7 py-3 lg:px-9 lg:py-3.5 bg-white text-gray-800 border-2 border-gray-200 rounded-full font-bold flex items-center gap-2.5 text-sm lg:text-base transition-all duration-300 hover:border-blue-300"
              >
                {secondaryBtnText}
                <FiGrid className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-4 lg:mt-6">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-600">
                <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center text-white shadow-sm">
                  <FiCheckCircle className="w-3.5 h-3.5" />
                </div>
                100% Secure Payments
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-600">
                <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center text-white shadow-sm">
                  <FiClock className="w-3.5 h-3.5" />
                </div>
                24/7 Customer Support
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-600">
                <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center text-white shadow-sm">
                  <FiTruck className="w-3.5 h-3.5" />
                </div>
                Fast & Reliable Delivery
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
