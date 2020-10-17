import React, { useState, useEffect, useContext, createContext, Suspense } from "react"

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
import { Flex, Box, Button, Text, Image, Spinner, Grid, Input } from "@theme-ui/components";
import Theme from "./theme"


let App
const StateContext = createContext()

// ------------------------------------------------------------------

const useStateLocal = () => {
  return {
    Theme: useState(useContext(createContext(Theme))),
    LoadingSecc1: useState(useContext(createContext(false))),

    BotonesOp: useState(useContext(createContext({
      Boton1: {
        Status: "5%",
        Color: "#D3D3D3",
        Text: "#696969",
        Importe: 0
      },
      Boton2: {
        Status: "10%",
        Color: "#D3D3D3",
        Text: "#696969",
        Importe: 0
      },
      Boton3: {
        Status: "15%",
        Color: "#D3D3D3",
        Text: "#696969",
        Importe: 0
      }
    }))),




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
  const [Extend, setExtend] = props.useContext.Extend.Servicio
  const Images = props.useContext.Images

  const [Servicio, setServicio] = props.useContext.Servicio;
  const [BotonesOp, setBotonesOp] = useContext(StateContext).BotonesOp;
  const Cuenta = PedidoData.ConsumosMonto;

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
              <Text sx={Estilo.d1sb}>Servicio: $ {Servicio}
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
              <Text sx={Estilo.d1sb}>Servicio: </Text>
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




            <Box bg="White" css={{ height: 5 }} />

              <Flex>
                <Box bg="White" css={{ height: 34 }} />
                <Text sx={Estilo.t3s}>
                  ¿Deseas incluir un extra para el repartidor?
                </Text>
              </Flex>

              <Box bg="White" css={{ height: 5 }} />

              <Flex>
                <Box sx={{ width: "25%", mr:2 }}>
                  <Input
                    {...props.useAcciones.useChange(Servicio, setServicio)}
                    onChange={e => {
                      setServicio(e.target.value);
                      setBotonesOp({
                        Boton1: {
                          Status: "5%",
                          Color: "#D3D3D3",
                          Text: "#696969"
                        },
                        Boton2: {
                          Status: "10%",
                          Color: "#D3D3D3",
                          Text: "#696969"
                        },
                        Boton3: {
                          Status: "15%",
                          Color: "#D3D3D3",
                          Text: "#696969"
                        }
                      });
                    }}
                  />
                </Box>


                <Button
                  sx={{
                    width: "20%",
                    height: "25px",
                    mr:2,
                    "&:hover": { color: "text" }
                  }}
                  bg={BotonesOp.Boton1.Color}
                  color={BotonesOp.Boton1.Text}
                  onClick={() => {
                    setServicio(Math.round(Cuenta * 0.05));
                    setBotonesOp({
                      Boton1: {
                        Status: "5%",
                        Color: "green",
                        Text: "white"
                      },
                      Boton2: {
                        Status: "10%",
                        Color: "#D3D3D3",
                        Text: "#696969"
                      },
                      Boton3: {
                        Status: "15%",
                        Color: "#D3D3D3",
                        Text: "#696969"
                      }
                    });
                  }}
                >
                  5%
                </Button>

                <Button
                  sx={{
                    width: "20%",
                    height: "25px", mr:2,

                    "&:hover": { color: "text" }
                  }}
                  bg={BotonesOp.Boton2.Color}
                  color={BotonesOp.Boton2.Text}
                  onClick={() => {
                    setServicio(Math.round(Cuenta * 0.1));
                    setBotonesOp({
                      Boton1: {
                        Status: "5%",
                        Color: "D3D3D3",
                        Text: "696969"
                      },
                      Boton2: {
                        Status: "10%",
                        Color: "green",
                        Text: "white"
                      },
                      Boton3: {
                        Status: "15%",
                        Color: "#D3D3D3",
                        Text: "#696969"
                      }
                    });
                  }}
                >
                  10%
                </Button>

                <Button
                  sx={{
                    width: "20%",
                    height: "25px",
                    "&:hover": { color: "text" }
                  }}
                  bg={BotonesOp.Boton3.Color}
                  color={BotonesOp.Boton3.Text}
                  onClick={() => {
                    setServicio(Math.round(Cuenta * 0.15));
                    setBotonesOp({
                      Boton1: {
                        Status: "Bono de 300  (Recibes 350",
                        Color: "#D3D3D3",
                        Text: "#696969"
                      },
                      Boton2: {
                        Status: "Bono de 500  (Recibes 600",
                        Color: "#D3D3D3",
                        Text: "#696969"
                      },
                      Boton3: {
                        Status: "Bono de 1000  (Recibes 1250",
                        Color: "green",
                        Text: "white"
                      }
                    });
                  }}
                >
                  15%
                </Button>
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
            {(props.useStatus.servicio()===1 & Extend) ? ModuloSimple() : <div/>}
            {(props.useStatus.servicio()===1 & !Extend) ? ModuloSlim() : <div/>}

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
