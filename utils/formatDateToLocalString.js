export const formatDateToLocalString = (date) => {
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/New_York' // Adjust this to your tournament's timezone
  };
  return date.toLocaleDateString('en-US', options);
};