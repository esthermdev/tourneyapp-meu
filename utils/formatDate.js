export const formatDate = (dateString) => {
    if (!dateString) return '';
  
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
  
    return date.toLocaleDateString('en-US', options);
  };