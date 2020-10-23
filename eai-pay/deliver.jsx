import React, { useState, useEffect, useContext, createContext, Suspense } from "react"

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
import { Flex, Box, Button, Text, Textarea, Image, Spinner, Grid, Input } from "@theme-ui/components";
import Theme from "./theme"

import Dropbox from "react-select"
import DropboxCss from "./select"


let App
const StateContext = createContext()

// ------------------------------------------------------------------

const Colores = [
  { value: "Otro", label: "Otro" },
  { value: "Blanco", label: "Blanco" },
  { value: "Negro", label: "Negro" },
  { value: "Gris", label: "Gris" },
  { value: "Rojo", label: "Rojo" },
  { value: "Azul", label: "Azul" },
  { value: "Amarillo", label: "Amarillo" },
  { value: "Verde", label: "Verde" },
  { value: "Cafe", label: "Cafe" },
];



const useStateLocal = () => {
  return {
    Theme: useState(useContext(createContext(Theme))),
    LoadingSecc1: useState(useContext(createContext(false))),
    Extended: useState(useContext(createContext(false))),

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

  const [Extend, setExtend] = props.useContext.Extend.Deliver
  const Images = props.useContext.Images

  const [Marca, setMarca] = props.useContext.Location.Marca
  const [Color, setColor] = props.useContext.Location.Color
  const [Obv, setObv] = props.useContext.Location.Obv
  const [Share, setShare] = props.useContext.Location.Share
  const [LocationProceso, setLocationProceso] = props.useContext.Location.Proceso







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
              <Text sx={Estilo.d1sb}>Entrega:  
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
              <Text sx={Estilo.d1sb}>Entrega: </Text>
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



          <Flex sx={{ width: "100%", pl: 3, pr:3 }}>
            <Box sx={{ width: "100%" }}>



          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "50%", mr:2 }}>
              <Text sx={Estilo.t3s}> ¿Qué modelo es tu auto?</Text>
            </Box>

            <Box sx={{ width: "50%", mr:2 }}>
              <Input
                {...props.useAcciones.useChange(Marca, setMarca)}
              />
            </Box>
          </Flex>

          <Box css={{ height: 5 }} />

          <Flex>
            <Box sx={{ width: "50%", mr:2 }}>
              <Text sx={Estilo.t3s}> ¿Qué color?</Text>
            </Box>

            <Box sx={{ width: "50%" }}>
                <Dropbox
                  name="Color"
                  isSearchable={false}
                  styles={DropboxCss.filtro2}
                  value={{
                    value: Color,
                    label: Color
                  }}
                  options={Colores}
                  onChange={async e => {
                    setColor(e.value);
                  }}
                />
            </Box>
          </Flex>


            <Text sx={Estilo.h2}>Indicaciones:</Text>

          <Flex>
            <Flex sx={{ width: "100%" }}>
              <Box sx={{ width: "100%" }}>
                <Textarea
                  {...props.useAcciones.useChange(Obv, setObv)}
                  rows={3}
                />
              </Box>
            </Flex>
          </Flex>

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "100%", mr:2 }}>
              <Text sx={Estilo.h2}>Comparte tu ubicación</Text>
            </Box>

            <Box sx={{ width: "50%", mr:2 }}>


            </Box>
          </Flex>

          <Flex sx={{ width: "100%", bg: Color }}>
            <Button
              sx={{ height: "34px", mb: 3, width: "100%" }}
              bg={Share ? "green":"#A52A2A"}
              Disabled={false}
              onClick={ async () => {
                await setShare(!Share)
                if(!Share) {props.useAcciones.addPosition()}
              }}
            >
              {Share ? "Compartiendo": "Compartir Ubicación"}
            </Button>
          </Flex>

          <Flex sx={{ width: "100%" }}>
            <Box sx={{ width: "100%", mr:2 }}>
              <Text sx={Estilo.h2}>ó cuéntanos cómo vas</Text>
            </Box>

          </Flex>

          <Flex sx={{ width: "100%", bg: Color }}>



            <Button
              sx={{ height: "34px", mb: 3, width: "100%" }}
              bg={LocationProceso===1 ? "green":"gray"}
              Disabled={false}
              onClick={ async () => {
                await setLocationProceso(1)
                props.useAcciones.upProceso({
                  Proceso: "RutaTogo",
                  ProcesoObv: "El cliente marcó que está en camino"
                })
              }}
            >
              Voy en Camino
            </Button>



            <Button
              sx={{ height: "34px", mb: 3, width: "100%" }}
              bg={LocationProceso===2 ? "green":"gray"}
              Disabled={false}
              onClick={ async () => {
                await setLocationProceso(2)
                props.useAcciones.upProceso({
                  Proceso: "Llegando",
                  ProcesoObv: "El cliente marcó que está llegando"
                })
              }}
            >
              Voy llegando
            </Button>



            <Button
              sx={{ height: "34px", mb: 3, width: "100%" }}
              bg={LocationProceso===3 ? "green":"gray"}
              Disabled={false}
              onClick={ async () => {
                await setLocationProceso(3)
                props.useAcciones.upProceso({
                  Proceso: "EnEspera",
                  ProcesoObv: "El cliente marcó que está esperando"
                })
              }}
            >
              Estoy esperando
            </Button>




          </Flex>


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
            {(props.useStatus.deliver()===1 & Extend) ? ModuloSimple() : <div/>}
            {(props.useStatus.deliver()===1 & !Extend) ? ModuloSlim() : <div/>}

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
