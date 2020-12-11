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
  const [Loading, setLoading] = props.useContext.Loading.Registros
  const [Registros, setRegistros] = props.useContext.Registros
  const [PedidoData, setPedidoData] = props.useContext.PedidoData

// -----------------------------------------------------------------------------

const Renglon = props => {
  const Estilo = useThemeUI().theme.styles;
  const { Row, Color, navigate, setRouter, getDetalleConsumo, i, usedata } = props;

  return (
    <Grid sx={{ width: "100%", bg: Color, borderTopStyle: i===0 ? "none" : "solid", borderWidth:2, borderColor: "#D3D3D3", }}>

        <Flex sx={{ width: "100%", bg: Color }} columns={[1,null,2]}>
          <Flex sx={{ width: "34px", bg: Color, pr:0 }}>
            <Image sx={{ height: "34px", borderRadius: 3 }} src={Row.ProductosFoto} />
          </Flex>

          <Grid sx={{ width: "85%", bg: Color, gridGap: 0 }}>
            <Flex sx={{ width: "100%", bg: Color }}>
              <Box sx={{ width: "80%" }}>
                <Text sx={Estilo.d1s}>{Row.ProductosTitulo} {"   "}
                  {Row.PrecioObv ? ( Row.PrecioObv ) : <div/>}
                </Text>
              </Box>

              <Box sx={{ width: "10%" }}>
                <Text sx={Estilo.d1s}>{Row.Cantidad}</Text>
              </Box>

              <Box sx={{ width: "15%" }}>
                <Text sx={Estilo.d1s}>$ {Row.ConsumoTotal} </Text>
              </Box>
            </Flex>

            <Flex sx={{ width: "100%", bg: Color }}>
              <Box sx={{ width: "90%" }}>
                <Text sx={Estilo.d1s}>{Row.Obv}</Text>
              </Box>
            </Flex>
          </Grid>

        </Flex>
      
    </Grid>
  );
};


// ------------------------------

const Listado = props => {
  const Estilo = useThemeUI().theme.styles;
  let Micolor = "#f2f2f2";

  const Renglones = Registros.map((row, index) => {
    Micolor === "#f2f2f2" ? (Micolor = "White") : (Micolor = "#f2f2f2");

    return (
      <Renglon
        key={row.Id}
        Row={row}
        Color={"White"}
        i={index}
      />
    );
  });

  return (
    <div>
      <Box bg="White" css={{ height: 13 }} />
        <Flex>
          <Box sx={{ width: "100%" }}>{Renglones}</Box>
        </Flex>

        <Grid sx={{ width: "100%", borderTopStyle: "solid", borderWidth:4, borderColor: "#808080", }}>
        <Flex>

        <Grid sx={{ width: "100%", }} >
            <Flex sx={{ width: "100%"}}>
              <Box sx={{ width: "75%" }}>
                <Text sx={Estilo.d1s}>
                </Text>
              </Box>

              <Box sx={{ width: "8%" }}>
                <Text sx={Estilo.d1sb}>{PedidoData.ConsumosCuenta}</Text>
              </Box>

              <Box sx={{ width: "14%" }}>
                <Text sx={Estilo.d1sb}>$ {PedidoData.ConsumosMonto} </Text>
              </Box>
            </Flex>

          </Grid>

        </Flex>
      </Grid>

    </div>
  );
};

// ------------------------------------------

  try {

    return (
      <Grid sx={{p:0, m: 0}}>
        {Loading ? <Spinner size={17} ml={3} /> : 
          <div>
            <Listado/>
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
