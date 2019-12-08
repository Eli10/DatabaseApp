import axios from 'axios';


export const GetAllRestaurants = () => {
  return axios
  .get('https://cybertron-api.azurewebsites.net/restaurants')
  .then(res => res.data)
  .catch(err => {
    console.log("Error with routing in https://cybertron-api.azurewebsites.net/restaurants", err);
    return [];
  });
}
