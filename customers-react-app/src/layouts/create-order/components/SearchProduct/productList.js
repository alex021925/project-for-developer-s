// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Images
import logo from "assets/images/logos/logo.png";


// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import { useCreateOrderContext, useCreateOrderDispatchContext} from "../../context";


function ProductList() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const dispatch = useCreateOrderDispatchContext();
  const createOrderContext = useCreateOrderContext();

  const addHandler = (e) => {
    dispatch({
      type: 'added',
      element: e,
    });
  };

  return (

    <MDBox p={2}>
      <Grid container spacing={3}>

        { createOrderContext.searchProductsList.map(element => {
          return (
            <Grid item xs={12} key={element.id}>
              <MDBox
                borderRadius="lg"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={3}
                sx={{
                  border: ({borders: {borderWidth, borderColor}}) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                }}
              >
                <MDBox component="img" src={logo} alt="logo" width="10%" mr={3}/>

                <MDBox>
                  <MDTypography variant="h6" fontWeight="medium">
                    {element.name}
                  </MDTypography>

                  <MDTypography variant="h6" fontWeight="regular" color="text">
                    ${element.price}
                  </MDTypography>

                </MDBox>

                <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
                  <MDButton circular={true} size={"medium"} onClick={ () => addHandler(element) }>
                    <Tooltip title="Add to order" placement="top">
                      <Icon sx={{cursor: "pointer"}} fontSize="medium">
                        add
                      </Icon>
                    </Tooltip>
                  </MDButton>
                </MDBox>
              </MDBox>
            </Grid>
          );
        })}


      </Grid>
    </MDBox>

  );
}

export default ProductList;
