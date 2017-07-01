import fetch from 'node-fetch';

export default () => (
  fetch(`http://api.open-notify.org/astros.json`).then(response => response.ok ? response.json() : Promise.reject(response))
);
