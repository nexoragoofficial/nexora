import React from 'react';
import { FiUsers, FiShoppingBag, FiTruck, FiCheckCircle } from 'react-icons/fi';

const StatsBar = ({ statsData }) => {
  const iconMap = {
    FiUsers: FiUsers,
    FiShoppingBag: FiShoppingBag,
    FiTruck: FiTruck,
    FiCheckCircle: FiCheckCircle
  };

  const defaultStats = [
    { icon: FiUsers, label: 'Happy Customers', value: '10K+' },
    { icon: FiShoppingBag, label: 'Orders Delivered', value: '25K+' },
    { icon: FiTruck, label: 'Service Partners', value: '500+' },
    { icon: FiCheckCircle, label: 'On-Time Delivery', value: '99%' },
  ];

  const stats = (statsData && statsData.length > 0) 
    ? statsData.map(s => ({
        label: s.label,
        value: s.value,
        icon: iconMap[s.icon] || FiCheckCircle
      }))
    : defaultStats;

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[24px] lg:rounded-[28px] p-6 lg:p-8 shadow-xl shadow-blue-600/20 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-4 h-full items-center">
      {stats.map((stat, index) => (
        <div key={index} className="flex flex-col items-center text-center gap-2">
          <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center text-white border border-white/10">
            <stat.icon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl lg:text-2xl xl:text-3xl font-[900] text-white leading-tight">
              {stat.value}
            </div>
            <div className="text-[10px] font-bold text-blue-100 uppercase tracking-wider mt-0.5">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
