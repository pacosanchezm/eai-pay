import React, { useState, useEffect, useContext, createContext, Suspense } from "react"

// ---------- styles
  /** @jsx jsx */ 
  import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
  import { Grid, Flex, Box, Button, Text, Image, Spinner, Input } from "@theme-ui/components"
  import Theme from "./theme"
  import "@babel/polyfill"


// ------------------
import usedata from "./usedata"
import Head from "./head"
import Order from "./order"
import Cuenta from "./cuenta"
import Servicio from "./servicio"
import Pago from "./pago"


let App;
const StateContext = createContext();

// -------------------------------------------

let server = "https://sushifactory.app"




const useStateUniv = () => {
  return {
    Theme: useState(useContext(createContext(Theme))),
    Loading: {
      DataMain: useState(useContext(createContext(false))),
    },

    Extend: {
      Order: useState(useContext(createContext(true))),
      Cuenta: useState(useContext(createContext(false))),
      Servicio: useState(useContext(createContext(false))),
      Pago: useState(useContext(createContext(false))),
      Deliver: useState(useContext(createContext(false))),
    },






    User: {
      Id: useState(useContext(createContext(null))),
      Name: useState(useContext(createContext(""))),
      LoginName: useState(useContext(createContext(""))),
      LoginPass: useState(useContext(createContext(""))),
      Info: useState(useContext(createContext({}))),
    },

    Empresa: useState(useContext(createContext(1))),
    Sucursal: useState(useContext(createContext({value: 6}))),
    Pedido: useState(useContext(createContext(9999))),
    PedidoData: useState(useContext(createContext({}))),
    Servicio: useState(useContext(createContext(0))),

    Indica: useState(useContext(createContext("Llena todos los datos"))),

  };
}

// ------------------

const ContextProvider = ({ children }) => {
  return (
    <StateContext.Provider value={useStateUniv()}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </StateContext.Provider>
  );
}

// --------------------------------------------------------------------------

let useStatus = function(StateContextM) {

  return {

    head: function() {
      return 1
    },

    order: function() {
      return 1
    },

    servicio: function() {
      return 1
    },

    pago: function() {
      return 1
    },

  }
}

// --------------------------------------------------------------------------

let useAcciones = function(StateContext) {
  const useData = new usedata()
  const [Empresa, setEmpresa] = useContext(StateContext).Empresa
  const [PedidoData, setPedidoData] = useContext(StateContext).PedidoData
  const [LoadingDataMain, setLoadingDataMain] = useContext(StateContext).Loading.DataMain


  // ---------------------
  
  return {
    Loader : async function (props) {
      setLoadingDataMain(true)
        let MiPedido = await useData.Pedidos().get({Codigo: props.id})
        setPedidoData(MiPedido[0])
      setLoadingDataMain(false)

    },
  }
}

// -----------------------------------------------------------------------------


const Body = props => {
  const useacciones = new useAcciones(StateContext)
  const usestatus = new useStatus(StateContext)

  // const [UserId, setUserId] = useContext(StateContext).User.Id;


// ------------
    useEffect(() => {useacciones.Loader(props) }, [])
    // useEffect(() => {useacciones.getCliente(UserId) }, [UserId])

// ------------
  try {

    return (

      <Flex bg="WhiteSmoke" sx={{width: "100%" }}>
          <Flex sx={{width: "100%" }}>
            <Box sx={{ width: "100%" }}>

              <main>
                <Head 
                  useContext={useContext(StateContext)}
                  useAcciones = {useacciones}
                  useStatus = {usestatus}
                />
                
                <Box css={{ height: "1px" }} />

                <Order 
                  useContext={useContext(StateContext)}
                  useAcciones = {useacciones}
                  useStatus = {usestatus}
                />
                
                <Box css={{ height: 5 }} />

                <Cuenta 
                  useContext={useContext(StateContext)}
                  useAcciones = {useacciones}
                  useStatus = {usestatus}
                />
                
                <Box css={{ height: 5 }} />



                <Servicio 
                  useContext={useContext(StateContext)}
                  useAcciones = {useacciones}
                  useStatus = {usestatus}
                />
                
                <Box css={{ height: 5 }} />


                <Pago 
                  useContext={useContext(StateContext)}
                  useAcciones = {useacciones}
                  useStatus = {usestatus}
                />

              </main>

            </Box>
          </Flex>
        
      </Flex>

    )
    
  } catch (e) {
    console.error(e);
  }
}

// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>

      <ContextProvider>
        <Flex bg="WhiteSmoke"
          sx={{
            display: "flex",
            flexDirection: "column",
            // set this to `minHeight: '100vh'` for full viewport height
            //minHeight: '100vh',
            justifyContent: 'center'
          }}
          css={{ maxWidth: "768px", minWidth: "375px" }}
        >
          <header sx={{width: "100%"}}>
          </header>

          <main sx={{width: "100%"}}>
            <Body {...props} />
          </main>

        </Flex>
      </ContextProvider>

    </div>
  );
});

// ----------------------------------------------------------------------------

