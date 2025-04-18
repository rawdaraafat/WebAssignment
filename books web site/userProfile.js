// Load user data from localStorage
function loadUserData() {
  const savedData = localStorage.getItem('userProfile');
  return savedData ? JSON.parse(savedData) : null;
}

// Update the profile page with user data
function updateProfilePage() {
  const userData = loadUserData();
  if (!userData) return;

  // Update basic info
  document.querySelector('.profileOverview h3').textContent = userData.name;
  document.querySelector('p:nth-of-type(1)').innerHTML = `<strong>Age:</strong> ${userData.age}`;
  document.querySelector('p:nth-of-type(2)').innerHTML = `<strong>Location:</strong> ${userData.location}`;
  document.querySelector('p:nth-of-type(3)').innerHTML = `<strong>Hobbies:</strong> ${userData.hobbies}`;
  document.querySelector('p:nth-of-type(4)').innerHTML = `<strong>Profile password:</strong> ********`;
  document.querySelector('p:nth-of-type(5)').innerHTML = `<strong>Card password:</strong> ********`;
  //document.querySelector('p:nth-of-type(4)').innerHTML = `<strong>Profile password:</strong> ${userData.profilePassword}`;
  //document.querySelector('p:nth-of-type(5)').innerHTML = `<strong>Card password:</strong> ${userData.cardPassword}`;
  document.querySelector('p:nth-of-type(6)').innerHTML = `<strong>Card number:</strong> ${'4001 1253 **** ****'}`;

}

// Update the profile when the page loads
document.addEventListener('DOMContentLoaded', updateProfilePage);
