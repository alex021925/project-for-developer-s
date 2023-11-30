/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";



// Images
import { Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import LaravelDataTable from "../../examples/Tables/LaravelDataTable";


const Product = ({product}) => {
  console.log(product);
  return (
    <Grid key={product.id}
            container
            component="li"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={1}
            pr={1}
            mb={1}
      >
        <Grid item lineHeight={1.125} xs={7}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {product.name}
          </MDTypography>
          <MDTypography variant="caption" fontWeight="regular" color="text">
            ${product.price}
          </MDTypography>
        </Grid>
        <Grid item display="flex" alignItems="center" xs={5} justifyContent="space-between">
          <MDTypography variant="button" fontWeight="bold" mr={1}>
            {product.productAmount}
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={1} ml={3} sx={{ cursor: "pointer" }}>
            <MDTypography variant="button" fontWeight="bold" mr={1}>
              ${product.totalPrice}
            </MDTypography>
          </MDBox>
        </Grid>
      </Grid>
    )
};


export default function data() {

  const productColumns = [
    { Header: "name", accessor: "name", align: "left" },
    { Header: "price", accessor: "price", align: "center" },
    { Header: "productAmount", accessor: "productAmount", align: "center" },
    { Header: "totalPrice", accessor: "totalPrice", align: "center" },
  ];

  const Rows = (dataRows) => {
    return dataRows.map( elementRow => {
      return {
        id: elementRow.id,
        date: (new Date(elementRow.date)).toDateString() ,
        subtotal: elementRow.subtotal,
        taxes: elementRow.taxes,
        total: (
          <MDBox>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" mr={2} fontSize={20}>
              {elementRow.total},
            </MDTypography>
          </MDBox>
        ),
        details: (

            <Accordion>
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <MDTypography>
                  <MDTypography>detail</MDTypography>
                </MDTypography>
              </AccordionSummary>
              <AccordionDetails>
                <LaravelDataTable
                  table={{ columns: productColumns,  rows: elementRow.products}}
                  noEndBorder
                />
                {/*<MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>*/}
                {/*  {*/}
                {/*    elementRow.products.map( (product) => (*/}
                {/*      <Product product={product}/>*/}
                {/*    ))*/}
                {/*  }*/}
                {/*</MDBox>*/}
                </AccordionDetails>
            </Accordion>
        ),
      };
    });
  };

  return {
    columns: [
      { Header: "id", accessor: "id", align: "center"},
      { Header: "date", accessor: "date", align: "left" },
      { Header: "subtotal", accessor: "subtotal", align: "center" },
      { Header: "taxes", accessor: "taxes", align: "center" },
      { Header: "total", accessor: "total", align: "center" },
      { Header: "details", accessor: "details", align: "center", width: "50%" },
    ],

    rows: Rows,
  };
}
