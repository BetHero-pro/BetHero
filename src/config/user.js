import jwtDecode from 'jwt-decode';

export function getUserId() {
  const jsonToken = localStorage.getItem('jwt');
  const dt = jwtDecode(jsonToken);
  const userData = dt.data[0];
  return userData._id;
}
