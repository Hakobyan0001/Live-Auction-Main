const addItem = (key, item) => {
  localStorage.setItem(key, item);
};

const deleteItem = (key) => {
  localStorage.removeItem(key);
};

const getItem = (key) => {
  return  localStorage.getItem(key);
};

const clear = () => {
  localStorage.clear();
};

export default {
  addItem,
  deleteItem,
  getItem,
  clear
}
