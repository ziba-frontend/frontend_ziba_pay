// utils.ts - Formatting utility functions

/**
 * Format a number as Nigerian Naira currency
 * @param amount Number to format as currency
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  /**
   * Format a date string into a human-readable format
   * @param dateString ISO date string to format
   * @param format Optional format type ('full', 'short', 'time')
   * @returns Formatted date string
   */
  export const formatDate = (dateString: string, format: 'full' | 'short' | 'time' = 'full'): string => {
    try {
      const date = new Date(dateString);
      
      // Return empty string if invalid date
      if (isNaN(date.getTime())) {
        return '';
      }
  
      switch (format) {
        case 'short':
          // Format: 24 Mar 2025
          return date.toLocaleDateString('en-NG', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          });
        
        case 'time':
          // Format: 14:30
          return date.toLocaleTimeString('en-NG', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          });
        
        case 'full':
        default:
          // Format: Mar 24, 2025, 14:30
          return date.toLocaleString('en-NG', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });
      }
    } catch (error) {
      console.error('Date formatting error:', error);
      return dateString || '';
    }
  };
  
  /**
   * Format a date relative to now (e.g., "2 hours ago")
   * @param dateString ISO date string to format
   * @returns Relative time string
   */
  export const formatRelativeTime = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      
      // Return empty string if invalid date
      if (isNaN(date.getTime())) {
        return '';
      }
      
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
      
      // Less than a minute
      if (diffInSeconds < 60) {
        return 'just now';
      }
      
      // Less than an hour
      if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
      }
      
      // Less than a day
      if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
      }
      
      // Less than a week
      if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
      }
      
      // Just return the formatted date for older dates
      return formatDate(dateString, 'short');
    } catch (error) {
      console.error('Relative time formatting error:', error);
      return dateString || '';
    }
  };