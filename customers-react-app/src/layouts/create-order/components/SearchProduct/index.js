// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";


// Material Dashboard 2 React context
import {useState, useEffect} from 'react';
// services
import CustomersService from "../../../../services/customers-service";

import {useCreateOrderDispatchContext} from "../../context"


function SearchProduct() {

  const [searchText, setSearchText] = useState("");
  const dispatch = useCreateOrderDispatchContext();

  const searchHandler = async (e) => {
    setSearchText(e.target.value);
      const response = await CustomersService.getProducts(JSON.stringify({
        name: e.target.value,
      })).catch(e => {
        console.log(e.message)
      });

      dispatch({
        type: 'searched',
        data: response.data,
        taxes:  response.taxes,
      });

  };

  useEffect(() => {
    searchHandler({
      target: {
        value: ''
      }
    });
  }, []);

  return (

      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Products
        </MDTypography>
        <MDBox ml={1} width="100%">
          <MDInput
            type="text"
            fullWidth
            name="productName"
            placeholder="Search Product..."
            onChange={searchHandler}
            value={searchText}
          />
        </MDBox>
      </MDBox>

  );
}

export default SearchProduct;
