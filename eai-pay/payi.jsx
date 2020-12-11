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
      Pago: useState(useContext(createContext(true))),
      Deliver: useState(useContext(createContext(false))),
    },

    Images: {
      Logo1: useState(useContext(createContext({src: "https://smxai.net/sf/sflogo1.jpg"}))),
      Logo2: useState(useContext(createContext({src: "https://smxai.net/sf/sflogo2.jpg"}))),
      Flechad: useState(useContext(createContext({src: "https://smxai.net/sf/cs1/arrowd1.png"}))),
      Flechau: useState(useContext(createContext({src: "https://smxai.net/sf/cs1/arrowu1.png"}))),
      Ayuda: useState(useContext(createContext({src: "https://smxai.net/sf/cs1/ayuda.jpg"}))),

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
    PedidoData: useState(useContext(createContext({Sucursal: 6}))),
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



    Tokens: useState(useContext(createContext(
      {
        6 : "pk_live_XeCZoqEJLdnAqKuLRoMTrETC00501hfITJ",
        11 : "pk_live_gAvCBHk4hD5pLpSBTl75RJRI00G0c6pnCT",
      }
    ))),














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
  const [PedidoData, setPedidoData] = useContext(StateContext).PedidoData
  const [Tokens] = useContext(StateContext).Tokens

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
      if (PedidoData.Pagado>0) {return 0}

      return 1
    },

    pago: function() {

      if (PedidoData.Pagado>0) {return 2}

      return 1
    },

    deliver: function() {

      if (PedidoData.TipoEntrega==="1") {return 1}

      return 0
    },


    token: function() {
      return Tokens[PedidoData.Sucursal]
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

  const [Servicio, setServicio] = useContext(StateContext).Servicio


  const [Share, setShare] = useContext(StateContext).Location.Share
  const [Marca, setMarca] = useContext(StateContext).Location.Marca
  const [Color, setColor] = useContext(StateContext).Location.Color
  const [LocObv, setLocObv] = useContext(StateContext).Location.Obv

  const [ExtendDeliver, setExtendDeliver] = useContext(StateContext).Extend.Deliver



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

    

    addPosition : async (e) => {
      console.log({e})
      console.log({Marca})
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
          Marca: e.Marca,
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
          Marca: e.Marca
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

      let add = await useData.Location().insert({
        Pedido: PedidoData.Id,
        LocLat: 0,
        LocLong: 0,
        Accuracy: 0,
        Marca: Marca,
        Color: Color,
        Obv: LocObv
        //Fecha: timestamp
      }) 


      



      return 1
    },





    PagarStripe : async function (e) {
      console.log({PagarStripe: e})

      let MiPago

      try{

         // ---- El bueno

          MiPago = await useData.Pagos().Stripe3({
              Token: e,
              Pedido: PedidoData.Id,
              Sucursal: PedidoData.Sucursal,
              Monto: PedidoData.ConsumosMonto, 
              Servicio: Servicio,
              Obv: "",
            }
          ) 

          

        // ---- Test
        // MiPago = 1

        if(MiPago===1){
          setPedidoData({ ...PedidoData, Pagado: PedidoData.ConsumosMonto + Servicio})

          setExtendDeliver(true)



         // this.Inscribir() ---- cual va?
        }

        return MiPago

      } catch (e) {console.error(e); return 0}

    },









  }
}

// -----------------------------------------------------------------------------


const Body = props => {
  const useacciones = new useAcciones(StateContext)
  const usestatus = new useStatus(StateContext)
  const [PedidoData, setPedidoData] = useContext(StateContext).PedidoData
  const [Share, setShare] = useContext(StateContext).Location.Share
  const [Marca, setMarca] = useContext(StateContext).Location.Marca

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
      channel.bind('report', ()=> useacciones.addPosition({Marca: Marca}), {Pedido:PedidoData.Id})
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
                 // useContext={useContext(StateContext)}

                  useContext={ 
                   { 
                     Loading: useContext(StateContext).Loading.DataMain,
                     PedidoData: useContext(StateContext).PedidoData,
                     Extend: useContext(StateContext).Extend.Pago,
                     Images: useContext(StateContext).Images,
                     Servicio: useContext(StateContext).Servicio,

                    
                  
                  }
                  }




                  useAcciones = {useacciones}
                  useStatus = {usestatus}
                />

                <Box css={{ height: 5 }} />


                {/* <Deliver 
                  useContext={useContext(StateContext)}
                  useAcciones = {useacciones}
                  useStatus = {usestatus}
                /> */}



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


const Body2 = props => {
  const useacciones = new useAcciones(StateContext)
  const usestatus = new useStatus(StateContext)
  const [PedidoData, setPedidoData] = useContext(StateContext).PedidoData
  const [Share, setShare] = useContext(StateContext).Location.Share
  const [Marca, setMarca] = useContext(StateContext).Location.Marca

  const [ExtendCuenta, setExtendCuenta] = useContext(StateContext).Extend.Cuenta

  // const [UserId, setUserId] = useContext(StateContext).User.Id;


  var channel = pusher.subscribe('csradar');



// ------------


// ------------
  try {

    return (

      <Flex bg="WhiteSmoke" sx={{width: "100%" }}>
          <Flex sx={{width: "100%" }}>
            <Box sx={{ width: "100%" }}>

              <main>


                <Box css={{ height: 5 }} />


                <Deliver 
                  useContext={useContext(StateContext)}
                  useAcciones = {useacciones}
                  useStatus = {usestatus}
                  marca = {useContext(StateContext).Location.Marca}
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
            //justifyContent: 'center'
            width: "100%",
            minWidth: "375px"
          }}
          css={{ maxWidth: "500px", minWidth: "375px" }}
        >

      <Flex sx={{ width: "100%", pl: 3, pr:3 }}>
            <Box sx={{ width: "100%" }}>



          <header sx={{width: "100%"}}>
          </header>

          <main sx={{width: "100%"}}>
            <Body {...props} />
            <Body2 {...props} />

          </main>

        </Box>
        </Flex>


        </Flex>




      </ContextProvider>

    </div>
  );
});

// ----------------------------------------------------------------------------


