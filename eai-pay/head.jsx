import React, { useState, useEffect, useContext, createContext, Suspense } from "react"

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
import { Flex, Box, Button, Text, Image, Spinner, Grid, Input } from "@theme-ui/components";
import Theme from "./theme"


let App
const StateContext = createContext()

// ------------------------------------------------------------------

let Images = {
  logo1: {src: "https://smxai.net/sf/sflogo1.jpg"},
  logo2: {src: "https://smxai.net/sf/cs1/sflogo2.jpg"},
};




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

// ----------------------------------

const ModuloSimple  = () => {

  return (
    <div>
      <Flex sx={{ width: "100%" }}>
        <Box sx={{ width: "30%" }}>
          <Image sx={{ height: "34px" }} src={Images.logo2.src} />
        </Box>

        <Box sx={{ width: "70%" }}>
          <Box sx={{ width: "100%" }}>
            <Text sx={Estilo.d1}>{PedidoData.SucursalDesc}</Text>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Text sx={Estilo.d1}>¡Hola {PedidoData.Nombre}!</Text>
          </Box>
        </Box>
      </Flex>
    </div>
  )
}

// ----------------------------------

  try {

    return (
      <Grid sx={{p:2, m: 2}}>
        {Loading ? <Spinner size={17} ml={3} /> : 
          <div>
            {(props.useStatus.head()===1) ? ModuloSimple() : <div/>}
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
