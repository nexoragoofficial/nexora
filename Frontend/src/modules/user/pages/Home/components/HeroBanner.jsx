import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiTruck, FiArrowRight, FiGrid } from 'react-icons/fi';
import { toAssetUrl } from '../../../../admin/pages/UserCategories/utils';

const HeroBanner = ({ banners = [], onSearchClick, heroData }) => {
  const title = heroData?.title || 'Everything You Need, Delivered to You.';
  const subtitle = heroData?.subtitle || 'One super app for all your daily needs.\nFast, reliable & secure delivery at your doorstep.';
  const primaryBtnText = heroData?.primaryBtnText || 'Get Started';
  const secondaryBtnText = heroData?.secondaryBtnText || 'Explore Services';
  // Desktop image: from API, fallback to static file
  const desktopImage = heroData?.imageUrl ? toAssetUrl(heroData.imageUrl) : '/home page .jpeg';
  // Mobile image: from API, fallback to desktop image
  const mobileImage = heroData?.mobileImageUrl ? toAssetUrl(heroData.mobileImageUrl) : desktopImage;

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
    <div className="relative w-full overflow-visible lg:overflow-hidden min-h-[450px] lg:min-h-[600px] flex items-center">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        {/* Mobile: uses mobileImage */}
        <img
          src={mobileImage}
          alt="Hero background mobile"
          className="lg:hidden w-full h-full object-cover object-[70%_center]"
        />
        {/* Desktop: uses desktopImage */}
        <img
          src={desktopImage}
          alt="Hero background desktop"
          className="hidden lg:block w-full h-full object-cover object-right"
        />
        {/* Mobile gradient overlay */}
        <div className="absolute inset-0 lg:hidden"
          style={{
            background: 'linear-gradient(to right, rgba(230,242,255,1) 0%, rgba(230,242,255,0.92) 45%, rgba(230,242,255,0.55) 65%, rgba(230,242,255,0.05) 100%)'
          }}
        />
      </div>

      {/* Subtle Cityscape Silhouette Effect */}
      <div className="absolute inset-0 opacity-[0.03] z-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 200'%3E%3Crect x='50' y='80' width='40' height='120' fill='%232563eb'/%3E%3Crect x='100' y='40' width='30' height='160' fill='%232563eb'/%3E%3Crect x='140' y='60' width='50' height='140' fill='%232563eb'/%3E%3Crect x='200' y='90' width='35' height='110' fill='%232563eb'/%3E%3Crect x='250' y='50' width='45' height='150' fill='%232563eb'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'bottom',
        backgroundSize: 'auto 200px'
      }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-6 lg:pt-16 pb-6 lg:pb-12 w-full self-stretch">
        {/* Mobile Layout */}
        <div className="flex lg:hidden flex-col h-full min-h-[400px] py-5">
          {/* TOP: Text content - left ~40% so background content is visible on right */}
          <div className="flex flex-col gap-2 max-w-[40%] pt-5">
            <h1 className="text-[1.4rem] sm:text-2xl font-[900] text-gray-900 leading-[1.15] tracking-tight">
              {renderTitle()}
            </h1>
            <p className="text-[10px] sm:text-xs text-gray-600 font-medium leading-relaxed">
              {subtitle.replace('\n', ' ')}
            </p>
          </div>

          {/* Buttons Column directly under text */}
          <div className="flex flex-col gap-2 w-[45%] mt-3">
            {/* Get Started Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onSearchClick}
              className="w-full py-2 text-white border-none rounded-full font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-1 text-[10px] transition-all duration-300"
              style={{ background: '#2563eb' }}
            >
              {primaryBtnText}
              <FiArrowRight className="w-3 h-3" />
            </motion.button>

            {/* Explore Services Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onSearchClick}
              className="w-full py-2 bg-white/90 backdrop-blur-sm text-gray-800 border border-gray-200 rounded-full font-bold flex items-center justify-center gap-1 text-[10px] transition-all duration-300"
            >
              {secondaryBtnText}
              <FiGrid className="w-3 h-3" />
            </motion.button>
          </div>

          {/* SPACER - scooter image shows here */}
          <div className="flex-1" />

          {/* BOTTOM: Badges pinned to bottom */}
          <div className="flex flex-col gap-2 w-full">
            {/* White Card Badges - overlaps into next section */}
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 mt-3 relative z-20 mb-[-44px] translate-y-5">
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-sm">
                    <FiCheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-bold text-gray-700 leading-tight">100% Secure Payments</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-sm">
                    <FiClock className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-bold text-gray-700 leading-tight">24/7 Customer Support</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-sm">
                    <FiTruck className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-bold text-gray-700 leading-tight">Fast & Reliable Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout: Unchanged original design */}
        <div className="hidden lg:grid grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-2.5 sm:gap-4 lg:gap-6 lg:col-span-6"
          >
            <div className="space-y-1.5 sm:space-y-3 lg:space-y-5">
              <h1 className="text-xl sm:text-3xl lg:text-[3.5rem] xl:text-6xl font-[900] text-gray-900 leading-[1.1] tracking-tight">
                {renderTitle()}
              </h1>
              <p className="text-xs sm:text-sm lg:text-lg text-gray-500 font-medium max-w-[280px] sm:max-w-md leading-tight sm:leading-relaxed whitespace-pre-line">
                {subtitle}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2 mt-1 sm:mt-2 lg:mt-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(37, 99, 235, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={onSearchClick}
                className="px-4 py-2 sm:px-7 sm:py-3 lg:px-9 lg:py-3.5 text-white border-none rounded-full font-bold shadow-lg shadow-blue-500/25 flex items-center gap-1.5 text-xs sm:text-sm lg:text-base transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' }}
              >
                {primaryBtnText}
                <FiArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#f0f6ff' }}
                whileTap={{ scale: 0.95 }}
                onClick={onSearchClick}
                className="px-4 py-2 sm:px-7 sm:py-3 lg:px-9 lg:py-3.5 bg-white text-gray-800 border-2 border-gray-200 rounded-full font-bold flex items-center gap-1.5 text-xs sm:text-sm lg:text-base transition-all duration-300 hover:border-blue-300"
              >
                {secondaryBtnText}
                <FiGrid className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2 lg:mt-6">
              <div className="flex items-center gap-1 text-[10px] sm:text-sm font-semibold text-gray-600">
                <div className="w-4 h-4 sm:w-6 sm:h-6 bg-blue-500 rounded-md flex items-center justify-center text-white shadow-sm">
                  <FiCheckCircle className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                </div>
                100% Secure Payments
              </div>
              <div className="flex items-center gap-1 text-[10px] sm:text-sm font-semibold text-gray-600">
                <div className="w-4 h-4 sm:w-6 sm:h-6 bg-blue-500 rounded-md flex items-center justify-center text-white shadow-sm">
                  <FiClock className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                </div>
                24/7 Customer Support
              </div>
              <div className="flex items-center gap-1 text-[10px] sm:text-sm font-semibold text-gray-600">
                <div className="w-4 h-4 sm:w-6 sm:h-6 bg-blue-500 rounded-md flex items-center justify-center text-white shadow-sm">
                  <FiTruck className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
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
