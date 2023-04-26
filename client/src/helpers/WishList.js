import axios from 'axios'
// const API_URL = "http://localhost:3001/wishlist/"
// const {BACK_URL} = process.env
const API_URL = `http://localhost:3001/wishlist`
class WishListService{

  // const { idUser, idProduct } = req.body

  PostProductWishList(data){
    return axios.post(API_URL, data);
  }

  // const { idUser } = req.params

  /*GetProductsWishList(id){
    return axios.get(API_URL + `/${id}`)
      .then(response => alert(response.data))
      .catch(error => {
        console.error(error);
        throw error;
      });
  }*/

  // const { idUser, idProduct } = req.params;

  
}

export default new WishListService;