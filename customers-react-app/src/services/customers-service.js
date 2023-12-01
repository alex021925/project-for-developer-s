import HttpService from "./htttp.service";

class CustomersService {


  getProducts = async(searchText) => {
    const url= 'products';
    return await HttpService.post(url, searchText);
  };

  createOrder = async(order) => {
    const url= 'orders';
    return await HttpService.post(url, order);
  };

  orders = async(url) => {
    url = url? url :'orders';
    return await HttpService.get(url);
  };


}

export default new CustomersService();
