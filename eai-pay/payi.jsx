import React, { useState, useEffect, useContext, createContext, Suspense } from "react"

// ---------- styles
  /** @jsx jsx */ 
  import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
  import { Grid, Flex, Box, Button, Text, Image, Spinner, Input } from "@theme-ui/components"
  import Theme from "./theme"
  import "@babel/polyfill"

  import Pusher from 'pusher-js'



// ------------------
import usedata from "./usedata"
import Head from "./head"
import Order from "./order"
import Cuenta from "./cuenta"
import Servicio from "./servicio"
import Pago from "./pago"
import Deliver from "./deliver"



let App;
const StateContext = createContext();

// -------------------------------------------

let server = "https://sushifactory.app"

var pusher = new Pusher('bef17b566c9f80236bf8', {
  cluster: 'us2'
});



const useStateUniv = () => {
  return {
    Theme: useState(useContext(createContext(Theme))),
    Loading: {
      DataMain: useState(useContext(createContext(false))),
      Registros: useState(useContext(createContext(false))),

    },

    Extend: {
      Order: useState(useContext(createContext(true))),
      Cuenta: useState(useContext(createContext(false))),
      Servicio: useState(useContext(createContext(true))),
      Pago: useState(useContext(createContext(false))),
      Deliver: useState(useContext(createContext(true))),
    },

    Images: {
      Logo1: useState(useContext(createContext({src: "https://smxai.net/sf/sflogo1.jpg"}))),
      Logo2: useState(useContext(createContext({src: "https://smxai.net/sf/sflogo2.jpg"}))),
      Flechad: useState(useContext(createContext({src: "https://smxai.net/sf/cs1/arrowd1.png"}))),
      Flechau: useState(useContext(createContext({src: "https://smxai.net/sf/cs1/arrowu1.png"}))),
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
    Registros: useState(useContext(createContext([]))),


    Servicio: useState(useContext(createContext(0))),
    Indica: useState(useContext(createContext("Llena todos los datos"))),

    Location: {
      Share: useState(useContext(createContext(false))),
      Proceso: useState(useContext(createContext(0))),

      Marca: useState(useContext(createContext(""))),
      Color: useState(useContext(createContext("Otro"))),
      Obv: useState(useContext(createContext(""))),
    },



    



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

    cuenta: function() {
      return 1
    },


    servicio: function() {
      return 1
    },

    pago: function() {
      return 1
    },

    deliver: function() {
      return 1
    },
  }
}

// --------------------------------------------------------------------------

let useAcciones = function(StateContext) {
  const useData = new usedata()
  const [Empresa, setEmpresa] = useContext(StateContext).Empresa
  const [PedidoData, setPedidoData] = useContext(StateContext).PedidoData
  const [Registros, setRegistros] = useContext(StateContext).Registros

  const [LoadingDataMain, setLoadingDataMain] = useContext(StateContext).Loading.DataMain
  const [LoadingRegistros, setLoadingRegistros] = useContext(StateContext).Loading.Registros


  const [Share, setShare] = useContext(StateContext).Location.Share
  const [Marca, setMarca] = useContext(StateContext).Location.Marca
  const [Color, setColor] = useContext(StateContext).Location.Color
  const [LocObv, setLocObv] = useContext(StateContext).Location.Obv




  // ---------------------
  
  return {
    Loader : async function (props) {
      setLoadingDataMain(true)
        let MiPedido = await useData.Pedidos().get({Codigo: props.id})
        setPedidoData(MiPedido[0])
      setLoadingDataMain(false)
    },
    

    LoaderCuenta : async function (props) {
      setLoadingRegistros(true)
        let MisRegistros = await useData.Consumos().get2(PedidoData.Id)
        setRegistros(MisRegistros)
      setLoadingRegistros(false)
    },


    useChange : (Field, setField) => {
      return {
        name: Field,
        value: Field,
        fontSize: 1,
        color: "#595959",
        bg: "#DCDCDC",
        onChange: e => {
          setField(e.target.value);
        }
      }
    },

    

    addPosition : async () => {

      const defaultSettings = {
        Active: true,
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
  
      const showPosition = async (position) => {
        let add = await useData.Location().insert({
          Pedido: PedidoData.Id,
          LocLat: position.coords.latitude,
          LocLong: position.coords.longitude,
          Accuracy: position.coords.accuracy,
          Marca: Marca,
          Color: Color,
          Obv: LocObv
          //Fecha: timestamp
        }) 
  
        return add
      }
  
      const onError = error => { console.log(error)}// setError(error.message)}
  

      console.log({Share})

      if(Share){
        let geo = await navigator.geolocation.getCurrentPosition(showPosition, onError, defaultSettings)
  
        let upProceso = await useData.Pedidos().upProceso({
          Id: PedidoData.Id,
          Proceso: "RutaTogo",
        }) 
      }
  
      return 1
    },

    upProceso : async (e) => {
      let upProceso = await useData.Pedidos().upProceso({
        Id: PedidoData.Id,
        Proceso: e.Proceso,
        ProcesoObv: e.ProcesoObv,
      }) 

      return upProceso
    },


  }
}

// -----------------------------------------------------------------------------


const Body = props => {
  const useacciones = new useAcciones(StateContext)
  const usestatus = new useStatus(StateContext)
  const [PedidoData, setPedidoData] = useContext(StateContext).PedidoData
  const [Share, setShare] = useContext(StateContext).Location.Share

  const [ExtendCuenta, setExtendCuenta] = useContext(StateContext).Extend.Cuenta

  // const [UserId, setUserId] = useContext(StateContext).User.Id;


  var channel = pusher.subscribe('csradar');



// ------------
    useEffect(() => {
      useacciones.Loader(props)
      channel.bind('report', useacciones.addPosition, {Pedido:PedidoData.Id})
    }, [])

    useEffect(() => {
      if(ExtendCuenta){useacciones.LoaderCuenta()}
    }, [ExtendCuenta]);




    useEffect(() => {
      channel.unbind('report');
      channel.bind('report', useacciones.addPosition, {Pedido:PedidoData.Id})
    }, [PedidoData.Id]);

    useEffect(() => {
      channel.unbind('report');
      channel.bind('report', useacciones.addPosition, {Pedido:PedidoData.Id})
    }, [Share]);


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

                <Box css={{ height: 5 }} />


                <Deliver 
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


