// const baseUrl = "http://localhost:2000";

const baseUrl='https://hackerramp-backend.herokuapp.com'

export const api = `${baseUrl}/api`;
export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
};
