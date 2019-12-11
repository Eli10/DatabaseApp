import axios from 'axios';
const opencage = require('opencage-api-client');


export const GetAllRestaurants = () => {
  return axios
  .get('https://cybertron-api.azurewebsites.net/restaurants')
  .then(res => res.data)
  .catch(err => {
    console.log(err);
    return [];
  });
}

export const GetRestaurant = (id) => {
  return axios
  .get(`https://cybertron-api.azurewebsites.net/restaurant/${id}`)
  .then(res => res.data)
  .catch(err => {
    console.log(err);
    return []
  })
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

export const GetCoords = (address, city, zip) => {
  return opencage
  .geocode({q: `${address},${city},${zip}`, key: 'b4fb2e152a3d49d1a60a8a7d8ce2790d'})
  .then(res => res.results[0].geometry)
  .catch(err=> {
    console.log(err);
  })
}

export const SetRestaurant = (contents) => {
  return axios
  .post('https://cybertron-api.azurewebsites.net/create_restaurant', contents)
  .then(res => res.data)
  .catch(err => {
    console.log(err);
    return false;
  })

}


export const UpdateMenu = (contents) => {
  return axios
  .put('https://cybertron-api.azurewebsites.net/menu_item', contents)
  .then(res => res.data)
  .catch(err => {
    console.log(err);
  })
}

export const DeleteMenu = (contents) => {
  return axios
  .delete('https://cybertron-api.azurewebsites.net/menu_item', {data: contents})
  .then(res => res.data)
  .catch(err => {
    console.log(err);
  })
}

export const AddMenu = (contents) => {
  return axios
  .post('https://cybertron-api.azurewebsites.net/menu_item', contents)
  .then(res => res.data)
  .catch(err => {
    console.log(err);
  })
}

export const DeleteRestaurant = (contents) => {
  return axios
  .delete('https://cybertron-api.azurewebsites.net/restaurants', {data: contents})
  .then(res => res.data)
  .catch(err => {
    console.log(err);
  })
}
