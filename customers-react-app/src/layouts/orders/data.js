/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";



// Images
import { Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import LaravelDataTable from "../../examples/Tables/LaravelDataTable";

export default function data() {

  const productColumns = [
    { Header: "name", accessor: "name", align: "left" },
    { Header: "price", accessor: "price", align: "center" },
    { Header: "amount", accessor: "productAmount", align: "center" },
    { Header: "total", accessor: "totalPrice", align: "center" },
  ];

  const Rows = (dataRows) => {
    return dataRows.map( elementRow => {
      return {
        id: elementRow.id,
        date: (new Date(elementRow.date)).toDateString() ,
        subtotal: '$' + elementRow.subtotal,
        taxes: '$' + elementRow.taxes,
        total: (
          <MDBox>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" mr={2} fontSize={20}>
              ${elementRow.total}
            </MDTypography>
          </MDBox>
        ),
        details: (

            <Accordion style={{ boxShadow: "none" }}>
              <AccordionSummary>
                  <MDTypography display="block" style={{ width: "100%"}}>Products</MDTypography>
              </AccordionSummary>
              <AccordionDetails>
                <LaravelDataTable
                  table={{ columns: productColumns,  rows: elementRow.products}}
                  noEndBorder
                  canSearch={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                />
                </AccordionDetails>
            </Accordion>
        ),
      };
    });
  };

  return {
    columns: [
      { Header: "id", accessor: "id", align: "center"},
      { Header: "details", accessor: "details", align: "center", width: "40%" },
      { Header: "date", accessor: "date", align: "left" },
      { Header: "subtotal", accessor: "subtotal", align: "center" },
      { Header: "taxes", accessor: "taxes", align: "center" },
      { Header: "total", accessor: "total", align: "center" },
    ],

    rows: Rows,
  };
}
