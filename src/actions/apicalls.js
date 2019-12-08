import axios from 'axios';


export const GetAllRestaurants = () => {
  return axios
  .get('https://cybertron-api.azurewebsites.net/restaurants')
  .then(res => res.data)
  .catch(err => {
    console.log(err);
    return [];
  });
}

export const GetRestaurantFood = (id) => {
  return axios
  .get(`https://cybertron-api.azurewebsites.net/${id}/menu_items`)
  .then(res => res.data)
  .catch(err => {
    console.log(err);
    return []
  })
}