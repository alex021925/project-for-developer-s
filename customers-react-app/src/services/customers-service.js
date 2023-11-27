import HttpService from "./htttp.service";

class CustomersService {


  getProducts = async(searchText) => {
    const getProducts= 'products';
    return await HttpService.post(getProducts, searchText);
  }


}

export default new CustomersService();
