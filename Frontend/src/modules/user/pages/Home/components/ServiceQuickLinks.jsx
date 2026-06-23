import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight, HiDotsHorizontal } from 'react-icons/hi';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { 
  FiZap, 
  FiDroplet, 
  FiTool, 
  FiWind, 
  FiShield, 
  FiScissors, 
  FiCoffee, 
  FiTruck, 
  FiLayout, 
  FiHome,
  FiBox,
  FiShoppingBag,
  FiHeart,
  FiMonitor,
  FiPackage,
  FiSmartphone
} from 'react-icons/fi';

const ServiceQuickLinks = ({ categories = [], onCategoryClick, onSeeAllClick, title = "Our Services" }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Mapping of category slugs/titles to icons and background colors
  const getCategoryMeta = (category) => {
    const titleText = category.title?.toLowerCase() || '';
    const slug = category.slug?.toLowerCase() || '';
    
    if (titleText.includes('food') || slug.includes('food')) 
      return { icon: <FiCoffee />, bg: '#fff8f0', color: '#f97316' };
    if (titleText.includes('grocer') || slug.includes('grocer')) 
      return { icon: <FiShoppingBag />, bg: '#f0fdf4', color: '#22c55e' };
    if (titleText.includes('medic') || titleText.includes('health') || slug.includes('medic')) 
      return { icon: <FiHeart />, bg: '#fdf2f8', color: '#ec4899' };
    if (titleText.includes('parcel') || titleText.includes('deliver') || slug.includes('parcel')) 
      return { icon: <FiPackage />, bg: '#fffbeb', color: '#eab308' };
    if (titleText.includes('electron') || slug.includes('electron')) 
      return { icon: <FiMonitor />, bg: '#eff6ff', color: '#3b82f6' };
    if (titleText.includes('home') || slug.includes('home')) 
      return { icon: <FiHome />, bg: '#f5f3ff', color: '#8b5cf6' };
    if (titleText.includes('beauty') || titleText.includes('salon') || slug.includes('beauty')) 
      return { icon: <FiScissors />, bg: '#fdf2f8', color: '#ec4899' };
    if (titleText.includes('electric') || slug.includes('electric')) 
      return { icon: <FiZap />, bg: '#fffbeb', color: '#f59e0b' };
    if (titleText.includes('plumb') || slug.includes('plumb') || titleText.includes('water')) 
      return { icon: <FiDroplet />, bg: '#eff6ff', color: '#3b82f6' };
    if (titleText.includes('clean') || slug.includes('clean')) 
      return { icon: <FiBox />, bg: '#f0fdf4', color: '#22c55e' };
    if (titleText.includes('repair') || titleText.includes('fix') || slug.includes('fix')) 
      return { icon: <FiTool />, bg: '#fef2f2', color: '#ef4444' };
    if (titleText.includes('ac') || titleText.includes('air') || slug.includes('ac')) 
      return { icon: <FiWind />, bg: '#ecfeff', color: '#06b6d4' };
    if (titleText.includes('security') || titleText.includes('guard')) 
      return { icon: <FiShield />, bg: '#eff6ff', color: '#3b82f6' };
    if (titleText.includes('shift') || titleText.includes('pack') || titleText.includes('move')) 
      return { icon: <FiTruck />, bg: '#fff7ed', color: '#f97316' };
    if (titleText.includes('phone') || titleText.includes('mobile')) 
      return { icon: <FiSmartphone />, bg: '#f5f3ff', color: '#8b5cf6' };
    
    return { icon: <FiLayout />, bg: '#f8fafc', color: '#64748b' };
  };

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [categories]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = direction === 'left' ? -280 : 280;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  if (!categories || categories.length === 0) return null;

  const visibleCategories = categories.slice(0, 12);
  const hasMore = categories.length > 6;

  return (
    <section className="max-w-[1400px] mx-auto px-5 relative z-20 mt-10 mb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          {title}
        </h2>
        {hasMore && (
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Cards Container - Horizontal Scroll */}
      <div className="relative">
        {/* Left Fade */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden lg:block" />
        )}
        
        {/* Right Fade */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden lg:block" />
        )}

        <div 
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto pt-4 pb-4 px-1 scrollbar-hide"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {visibleCategories.map((category, index) => {
            const meta = getCategoryMeta(category);
            return (
              <motion.div
                key={category.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.1)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onCategoryClick?.(category)}
                className="flex-shrink-0 flex flex-col items-center bg-white rounded-2xl p-3 sm:p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100/80 cursor-pointer transition-all duration-300 hover:border-blue-200/60 group"
                style={{ minWidth: '115px', maxWidth: '125px' }}
              >
                {/* Icon Container */}
                <div 
                  className="w-11 h-11 sm:w-12 sm:h-12 mb-2 sm:mb-2.5 flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: meta.bg }}
                >
                  {category.icon ? (
                    <img 
                      src={category.icon} 
                      alt={category.title} 
                      className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                    />
                  ) : (
                    <div className="text-xl sm:text-2xl" style={{ color: meta.color }}>
                      {meta.icon}
                    </div>
                  )}
                </div>
                
                {/* Title */}
                <span className="text-[12px] sm:text-[13px] font-bold text-gray-900 text-center leading-tight mb-1">
                  {category.title}
                </span>
                
                {/* Description */}
                <span className="text-[9px] sm:text-[10px] font-medium text-gray-400 text-center leading-tight line-clamp-2">
                  {category.description || 'Service at your doorstep'}
                </span>
              </motion.div>
            );
          })}

          {/* "More" Card */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: visibleCategories.length * 0.05, duration: 0.4 }}
              whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.96 }}
              onClick={onSeeAllClick}
              className="flex-shrink-0 flex flex-col items-center bg-white rounded-2xl p-3 sm:p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100/80 cursor-pointer transition-all duration-300 hover:border-blue-200/60 group"
              style={{ minWidth: '115px', maxWidth: '125px' }}
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 mb-2 sm:mb-2.5 flex items-center justify-center rounded-xl bg-blue-50 transition-transform duration-300 group-hover:scale-110">
                <HiDotsHorizontal className="text-xl sm:text-2xl text-blue-500" />
              </div>
              <span className="text-[12px] sm:text-[13px] font-bold text-gray-900 text-center leading-tight mb-1">
                More
              </span>
              <span className="text-[9px] sm:text-[10px] font-medium text-gray-400 text-center leading-tight">
                Many more
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Custom scrollbar hide style */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default ServiceQuickLinks;
