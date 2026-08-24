export const getPosts = () => {
  return JSON.parse(localStorage.getItem("lokart_posts")) || [];
};

export const savePosts = (posts) => {
  localStorage.setItem("lokart_posts", JSON.stringify(posts));
};

export const getMessages = () => {
  return JSON.parse(localStorage.getItem("lokart_messages")) || [];
};

export const saveMessages = (messages) => {
  localStorage.setItem("lokart_messages", JSON.stringify(messages));
};