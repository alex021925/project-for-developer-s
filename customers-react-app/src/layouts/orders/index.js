// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import LaravelDataTable from "examples/Tables/LaravelDataTable";

// Data
import authorsTableData from "./data";
import CustomersService from "../../services/customers-service";
import {useEffect, useState} from "react";

const Orders = () => {
  const { columns, rows } = authorsTableData();
  const [dataRows, setdataRows] = useState([]);

  const getOrders = async () => {
    let exit = false;
    let nextUrl = undefined;
    let rows = [];
    while(! exit)
    {
      const response = await CustomersService.orders(nextUrl).catch(e => {
        console.log(e.message)
      });
      rows = rows.concat(response.data);
      setdataRows(rows);
      if(response.meta.current_page >= response.meta.last_page)
        exit = true;
      else
        nextUrl = response.links.next;
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Orders Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <LaravelDataTable
                  table={{ columns, rows: rows(dataRows)}}
                  isSorted={true}
                  entriesPerPage={{ defaultValue: 15, entries: [10, 15, 30, 50] }}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Orders;
