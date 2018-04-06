const showSpinner = (id) => {
  const el = `
  <div class="dot1"></div>
  <div class="dot2"></div>`;

  const div = document.createElement('div');
  div.innerHTML = el.trim();
  div.id = 'spinner';
  const parent = document.getElementById(id);
  parent.append(div);
};

const hideSpinner = () => {
  const spinner = document.getElementById('spinner');
  if (spinner) {
    spinner.remove();
  }
};

export { showSpinner, hideSpinner };
