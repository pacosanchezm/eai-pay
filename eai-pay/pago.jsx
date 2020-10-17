import React, { useState, useEffect, useContext, createContext, Suspense } from "react"

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
import { Flex, Box, Button, Text, Image, Spinner, Grid, Input } from "@theme-ui/components";
import Theme from "./theme"

import Ccard from "./cc1st1"


let App
const StateContext = createContext()

// ------------------------------------------------------------------

const useStateLocal = () => {
  return {
    Theme: useState(useContext(createContext(Theme))),
    LoadingSecc1: useState(useContext(createContext(false))),
  };
};

// ------------------

const ContextProvider = ({ children }) => {
  return (
    <StateContext.Provider value={useStateLocal()}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </StateContext.Provider>
  );
};

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

const Body = props => {
  const Estilo = useThemeUI().theme.styles
  const [Loading, setLoading] = props.useContext.Loading.DataMain
  const [PedidoData, setPedidoData] = props.useContext.PedidoData
  const [Extend, setExtend] = props.useContext.Extend.Pago
  const Images = props.useContext.Images

  const [Servicio, setServicio] = props.useContext.Servicio
  const Cuenta = PedidoData.ConsumosMonto


// ----------------------------------

// ----------------------------------

const ModuloSlim  = () => {
  return (
    <div>
      <Flex sx={{ width: "100%" }}>
        <Box
          //bg="primary"
          sx={{
            fontWeight: "normal",
            fontSize: 1,
            color: "text",
            fontFamily: "body",
            width: "100%"
          }}
        >

          <Flex sx={{ width: "100%", height: "21px" }}>
            <Box sx={{ width: "90%" }}>

              <Text sx={Estilo.d1sb}>Total a Pagar: $ {PedidoData.ConsumosMonto + Servicio}
              </Text>

            </Box>

            <Box sx={{ width: "10%", p:0 }}>
              <Button
                sx={{width : "100%", p:0, bg: "transparent"}}
                onClick={() => {
                  setExtend(true)
                }}
              >
                <Image  src={Images.Flechad[0].src} />
              </Button>
            </Box>
          </Flex>

        </Box>
      </Flex>
    </div>
  )
}

// ----------------------------------


const ModuloSimple  = () => {

  return (
    <div>
      <Flex sx={{ width: "100%" }}>
        <Box
          //bg="primary"
          sx={{
            fontWeight: "normal",
            fontSize: 1,
            color: "text",
            fontFamily: "body",
            width: "100%"
          }}
        >

          <Flex sx={{ width: "100%", height: "21px" }}>
            <Box sx={{ width: "90%" }}>
            <Text sx={Estilo.d1sb}>Total a Pagar: $ {PedidoData.ConsumosMonto + Servicio}</Text>
            </Box>

            <Box sx={{ width: "10%", p:0 }}>
              <Button
                sx={{width : "100%", p:0, bg: "transparent"}}
                onClick={() => {
                  setExtend(false)
                }}
              >
                <Image  src={Images.Flechau[0].src} />
              </Button>
            </Box>
          </Flex>











          <Flex sx={{ width: "100%" }}>
            <Ccard
              Indica={props.useContext.Indica}
              Pagar={(e) => props.useAcciones.PagarStripe(e)}
              token={"pk_test_51HOpsyGJ7Qox7HrulwMiLbcAReD0Q7T3gDWQ69GRiiYsZCuN6hO4X7XzX7L0jo97wRWqPGJhbCcyVlZMc3MwtRsE00rJ8gtEZR"}

              // token={"pk_live_51HOpsyGJ7Qox7Hru2YA4aF3IldU6R7BhKOhtdb0zEf3yy07eOHRNvRjfGPvZd7OBVaSKCIzK4EO7P8jwRxMvnSo600gmaYSDCE"}
            />

          </Flex> 

        </Box>
      </Flex>
    </div>
  )
}

// ----------------------------------

  try {

    return (
      <Grid sx={{p:2, m: 2, borderStyle: "solid", borderWidth:1, borderColor: "#D3D3D3", borderRadius: "5px"}}>

        {Loading ? <Spinner size={17} ml={3} /> : 
          <div>
            {(props.useStatus.pago()===1 & Extend) ? ModuloSimple() : <div/>}
            {(props.useStatus.pago()===1 & !Extend) ? ModuloSlim() : <div/>}

          </div>
        }

      </Grid>
    )
    
  } catch (e) {
    console.error(e);
  }
}

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  return (
    <div>
      <ContextProvider>
        <Flex>
          <main sx={{width: "100%"}}>
            <Body {...props} />
          </main>
        </Flex>
      </ContextProvider>
    </div>
  );
});

// -------------------------------------------------------------------------------
