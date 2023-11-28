import HttpService from "./htttp.service";

class CustomersService {


  getProducts = async(searchText) => {
    const getProducts= 'products';
    return await HttpService.post(getProducts, searchText);
  }

  createOrder = async(order) => {
    const getProducts= 'orders';
    return await HttpService.post(getProducts, order);
  }


}

export default new CustomersService();
