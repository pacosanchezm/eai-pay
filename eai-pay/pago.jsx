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

  const [Loading, setLoading] = props.useContext.Loading
  const [PedidoData, setPedidoData] = props.useContext.PedidoData
  const [Extend, setExtend] = props.useContext.Extend
  const Images = props.useContext.Images
  const [Servicio, setServicio] = props.useContext.Servicio
  const Cuenta = PedidoData.ConsumosMonto


  const Token = props.useStatus.token()



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

          <Flex sx={{ width: "100%", height: "21px", mt:2, mb:2 }}>
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
const ModuloSlimPagado  = () => {
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

          <Flex sx={{ width: "100%", height: "21px", mt:2, mb:2 }}>
            <Box sx={{ width: "90%" }}>

              <Text sx={Estilo.d1sb}>Pagado: $ {PedidoData.Pagado}
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

          <Flex sx={{ width: "100%", height: "27px", borderBottomStyle: "solid", borderWidth:1, borderColor: "#D3D3D3", borderRadius: "0px", mt:2, mb:2 }}>
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
              //Indica={props.useContext.Indica}
              Indica={""}

              Pagar={(e) => props.useAcciones.PagarStripe(e)}
              // Pagar={(e) => {console.log("Pagare")}}

              token={Token}
            />

          </Flex> 

        </Box>
      </Flex>
    </div>
  )
}

// ----------------------------------


const ModuloSimplePagado  = () => {

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

          <Flex sx={{ width: "100%", height: "27px", borderBottomStyle: "solid", borderWidth:1, borderColor: "#D3D3D3", borderRadius: "0px", mt:2, mb:2 }}>
            <Box sx={{ width: "90%" }}>
            <Text sx={Estilo.d1sb}>Pagado: $ {PedidoData.Pagado}</Text>
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

            <Box sx={{ width: "90%" }}>
              <Text sx={Estilo.d1sb}>Esta orden ya ha sido pagada</Text>
            </Box>

          </Flex> 

        </Box>
      </Flex>
    </div>
  )
}

// ----------------------------------










  try {

    return (
      <Grid sx={{p:0, m: 0, borderStyle: "solid", borderWidth:1, borderColor: "#D3D3D3", borderRadius: "5px"}}>
         

        {Loading ? <Spinner size={17} ml={3} /> : 
          <div>
            {(props.useStatus.pago()===1 & Extend) ? ModuloSimple() : <div/>}

            {(props.useStatus.pago()===1 & !Extend) ? ModuloSlim() : <div/>}

            {(props.useStatus.pago()===2 & Extend) ? ModuloSimplePagado() : <div/>}
            {(props.useStatus.pago()===2 & !Extend) ? ModuloSlimPagado() : <div/>}



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
