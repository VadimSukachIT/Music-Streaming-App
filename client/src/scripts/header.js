export default () => {
  const headerSection = document.getElementById('header-section');
  const searchSection = document.getElementById('search-section');
  const closeButton = document.getElementById('closeSearchButton');

  closeButton.addEventListener('click', () => {
    searchSection.style.display = 'none';
  });

  headerSection.addEventListener('click', (event) => {
    const { target } = event;

    if (target.closest('#search-button')) {
      searchSection.style.display = 'block';
    }
  });
};

