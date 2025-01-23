// ================================================================================
//

// Getting the current date using the Date object
export async function getCurrentDate() {
  // Get the current date
  const currentDate = new Date();

  // Format the day and month
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  // Extract components
  const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' }); // e.g., Monday
  const monthAndDate = currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) // e.g., November 18

  return { day, monthAndDate };
}

// Format date to today
export function formatDateToDay(dateStr) {
  const date = new Date(dateStr);
  const options = { weekday: 'short' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Function to capitalize the first letter of words in a string
export function capitalizeWords(str) {
  return str.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getInput() {
  const input = document.getElementById('search-input');
  const city = input.value;
  return city;
}

// Clear input field
export function clearInput() {
  const searchInput = document.getElementById('search-input');
  searchInput.value = '';
}