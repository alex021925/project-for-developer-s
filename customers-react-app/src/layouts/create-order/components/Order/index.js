// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import {useCreateOrderContext, useCreateOrderDispatchContext} from "../../context";
import Tooltip from "@mui/material/Tooltip/Tooltip";
import Grid from "@mui/material/Grid";
import CustomersService from "../../../../services/customers-service";
import MDSnackbar from "../../../../components/MDSnackbar";
import {useState} from "react";
import MDAlert from "../../../../components/MDAlert";




function ProductOrder({ name, id, price, amount }) {

  const dispatch = useCreateOrderDispatchContext();

  const amountHandler = (e) => {
    if (e.target.value.match(/^[1-9][0-9]*$/)) {
      dispatch({
        type: 'changed',
        element: {
          id: id,
          amount: Number(e.target.value),
        },
      });
    }
  };

  const removeHandler = (e) => {
    dispatch({
      type: 'deleted',
      element:{
        name: name,
        id: id,
        price: price,
        amount: amount
      },
    });
  };

  return (

    <Grid container
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
          {name}
        </MDTypography>
        <MDTypography variant="caption" fontWeight="regular" color="text">
          ${price}
        </MDTypography>
      </Grid>
      <Grid item display="flex" alignItems="center" xs={5} justifyContent="space-between">
        <MDInput label="Amount" size="small" type="number" value={amount} onChange={amountHandler}/>
        <MDBox display="flex" alignItems="center" lineHeight={1} ml={3} sx={{ cursor: "pointer" }}>
          <MDTypography variant="button" fontWeight="bold" mr={1}>
            ${price * amount}
          </MDTypography>
          <MDButton circular={true} size={"medium"} onClick={ removeHandler }>
            <Tooltip title="Remove product of the order." placement="top">
              <Icon sx={{cursor: "pointer"}} fontSize="medium">
                close
              </Icon>
            </Tooltip>
          </MDButton>
        </MDBox>
      </Grid>
    </Grid>

  );
}

// Typechecking props for the ProductOrder
ProductOrder.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
};



function Order() {

  const createOrderContext = useCreateOrderContext();
  const dispatch = useCreateOrderDispatchContext();
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorText, setErrorText] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const clearHandler = () => {
    dispatch({
      type: 'cleared',
    });
  };

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Create Order successful"
      content="Your Order was created correctly."
      dateTime=""
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error at Create Order"
      content="The order was not created correctly, an error occurred in the process."
      dateTime=""
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      // bgWhite
    />
  );


  const createOrderHandler = async (e) => {
    setErrorText(false);
    const response = await CustomersService.createOrder(JSON.stringify({
      products: createOrderContext.orderProductsList,
      subtotal: subTotal(),
      taxes: taxes(),
      total:total(),
    }))
      .catch(e => {
        openErrorSB();
      console.log(e);
      setErrorText(e);
    });
    if(response && response.result == "ok")
    {
      openSuccessSB();
      clearHandler();
    }

  };

  const subTotal = () => {
    return createOrderContext.orderProductsList.reduce((a, b) => a + (b.productAmount * b.price), 0);
  };

  const taxes = () => {
    return subTotal() * createOrderContext.taxes / 100;
  };

  const total = () => {
    return subTotal() + taxes();
  };

  const errorsToArray =  (errors) =>
  {
    const result = [];
    Object.keys(errors).forEach(key => {
      result.push([key, errors[key]]);
    });
    return result;
  };

  const errorTextrender = (errors) => {
    const errorsArray = errorsToArray(errors);
    return (
      errorsArray.map(error => {
        return (
          <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
            {
              error[1].map( element => (
                <MDBox component="li" display="flex" flexDirection="column" p={0} m={0} color={"white"}>
                  { element }
                </MDBox>
              ))
            }
          </MDBox>
        )
      })
    );
  };

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        // borderRadius="lg"
        coloredShadow="info"
        borderRadius="xl"
        pt={2} px={2} pb={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" color="white">
          New Order
        </MDTypography>
        <MDButton variant="outlined" color="error" size="small" onClick={ clearHandler }>
          Clear Order
        </MDButton>
      </MDBox>

      { errorText !== false ? (
        <MDAlert color="error" dismissible>
            {/*{errorText.message}*/}
          {
            errorText.errors ? errorTextrender(errorText.errors) : <div></div>
          }
        </MDAlert>
      ):
        <div></div>
      }



      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {
            createOrderContext.orderProductsList.map(element => {
              return <ProductOrder key={element.id} name={element.name} id={element.id}
                                   price={element.price} amount={element.productAmount} />
            })
          }
        </MDBox>
      </MDBox>


      <Grid container
            display="flex"
            justifyContent="end"
            alignItems="center"
            py={1}
            pr={3}
            mb={1}
      >
        <Grid item lineHeight={1.125} xs={12} sm={5} >
          <Grid container mb={1}>
            <Grid item xs={6} display="flex" justifyContent="end" >
              <MDTypography variant="caption" fontWeight="regular" color="text">
                Subtotal
              </MDTypography>
            </Grid>
            <Grid item xs={6} pr={3} display="flex" justifyContent="end">
              <MDTypography variant="caption" fontWeight="regular" color="text">
                { subTotal()}
              </MDTypography>
            </Grid>
          </Grid>
          <Grid container mb={1}>
            <Grid item xs={6} display="flex" justifyContent="end" >
              <MDTypography variant="caption" fontWeight="regular" color="text">
                Taxes ({createOrderContext.taxes}%)
              </MDTypography>
            </Grid>
            <Grid item xs={6} pr={3} display="flex" justifyContent="end">
              <MDTypography variant="caption" fontWeight="regular" color="text">
                {taxes()}
              </MDTypography>
            </Grid>
          </Grid>
          <Grid container mb={1}>
            <Grid item xs={6} display="flex" justifyContent="end" >
              <MDTypography  variant="block" fontWeight="medium">
                Total
              </MDTypography>
            </Grid>
              <Grid item xs={6} pr={3} display="flex" justifyContent="end">
                <MDTypography variant="block" fontWeight="regular" color="text">
                  {total()}
                </MDTypography>
              </Grid>
          </Grid>
          <Grid container my={3}>
            <Grid item xs={12} pl={4} display="flex" justifyContent="center" >
              <MDButton variant="gradient" color="info" size="medium" fullWidth onClick={ createOrderHandler }>
                Submit Order&nbsp;&nbsp;&nbsp;
                <Icon>check</Icon>
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {renderSuccessSB}
      {renderErrorSB}
    </Card>
  );
}

export default Order;
