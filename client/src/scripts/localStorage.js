const getUser = () => {
  const userObj = localStorage.getItem('user');
  return JSON.parse(userObj);
};

const setUser = (user) => {
  const obj = JSON.stringify(user);
  localStorage.setItem('user', obj);
};

const removeUser = () => {
  localStorage.removeItem('user');
};

export { getUser, setUser, removeUser };
