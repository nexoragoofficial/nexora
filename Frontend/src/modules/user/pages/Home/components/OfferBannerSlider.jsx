import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';

const OfferBannerSlider = ({ banners }) => {
  const navigate = useNavigate();

  if (!banners || banners.length === 0) return null;

  const handleBannerClick = (banner) => {
    if (banner.link) {
      if (banner.link.startsWith('http')) {
        window.open(banner.link, '_blank');
      } else {
        navigate(banner.link);
      }
    }
  };

  return (
    <div className="mb-4 w-full px-0">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="w-full overflow-hidden shadow-sm"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner._id}>
            <div 
              className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[21/9] bg-white rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform duration-200 flex items-center justify-center"
              onClick={() => handleBannerClick(banner)}
            >
              <img 
                src={banner.imageUrl} 
                alt={banner.title} 
                className="w-full h-full object-contain"
                loading="lazy"
              />
              {/* Optional: Add a subtle overlay or text if needed */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #2874f0 !important;
        }
        .swiper-pagination {
          bottom: 10px !important;
        }
      `}</style>
    </div>
  );
};

export default OfferBannerSlider;
