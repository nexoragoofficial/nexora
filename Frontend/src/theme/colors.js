/**
 * Centralized Theme Colors Configuration
 * Separate themes for User and Vendor modules
 * Update colors here to change theme across entire app
 * 
 * Usage:
 * - User module: import { userTheme } from '../../../../theme'
 * - Vendor module: import { vendorTheme } from '../../../../theme'
 * - Worker module: import { workerTheme } from '../../../../theme'
 */

// Homestr LOGO Core Brand Colors
const brand = {
  teal: 'var(--brand-teal)',
  premiumTeal: '#0D9488',
  yellow: 'var(--brand-yellow)',
  orange: 'var(--brand-orange)',
  gradient: 'var(--brand-gradient)',
  conic: 'conic-gradient(from 0deg, var(--brand-teal), var(--brand-yellow), var(--brand-orange), var(--brand-teal))'
};

// User Theme Colors
const userTheme = {
  backgroundGradient: 'var(--bg-gradient)',
  gradient: brand.gradient,
  headerGradient: 'linear-gradient(135deg, #00a6a6 0%, #008a8a 50%, #006b6b 100%)', // Keeping specific gradient for now
  headerBg: 'var(--primary-header)',
  button: brand.teal,
  primary: brand.teal,
  icon: brand.teal,
  cardShadow: 'var(--card-shadow)',
  cardBorder: '1px solid var(--border-color)',
  brand: brand
};

// Vendor Theme Colors
const vendorTheme = {
  backgroundGradient: 'var(--bg-gradient)',
  gradient: brand.gradient,
  headerGradient: '#000000',
  accentGradient: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)',
  button: '#1e3a8a',
  primary: '#1e3a8a',
  icon: '#1e3a8a',
  brand: brand
};

// Worker Theme Colors
const workerTheme = {
  backgroundGradient: 'var(--bg-gradient)',
  gradient: brand.gradient,
  headerGradient: '#1e3a8a',
  button: '#1e3a8a',
  primary: '#1e3a8a',
  icon: '#1e3a8a',
  brand: brand
};

// Default theme (for backward compatibility)
const themeColors = userTheme;

// Export all themes
export { userTheme, vendorTheme, workerTheme, brand };
export default themeColors;


