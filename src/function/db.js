import GoTrue from 'gotrue-js';

// Instantiate the GoTrue auth client with an optional configuration

export default userAuth = new GoTrue({
  APIUrl: 'https://kubuka-space.netlify.app/.netlify/identity',
  audience: '',
  setCookie: false,
});
