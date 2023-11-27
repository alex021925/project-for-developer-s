// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";



import SearchProduct from "./components/SearchProduct";

import { CreateOrderProvider } from "./context"
import Card from "@mui/material/Card";
import ProductList from "./components/SearchProduct/productList";
import Order from "./components/Order";



function CreateOrder() {

  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <MDBox mt={8}>
        <MDBox mb={3}>
          <CreateOrderProvider>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Card id="products">
                      <SearchProduct/>
                      <ProductList/>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Order/>
              </Grid>
            </Grid>
          </CreateOrderProvider>
        </MDBox>

      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CreateOrder;
