import React, { useState, useEffect, useContext, createContext, Suspense } from "react"

// ---------- styles
  /** @jsx jsx */ 
  import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
  import { Grid, Flex, Box, Button, Text, Image, Spinner, Input } from "@theme-ui/components"
  import Theme from "./theme"
  import "@babel/polyfill"



// ------------------
import usedata from "./usedata"




let App;
const StateContext = createContext();

// -------------------------------------------

let server = "https://sushifactory.app"



const useStateUniv = () => {
  return {
    Theme: useState(useContext(createContext(Theme))),
    LoadingSecc1: useState(useContext(createContext(false))),
    Empresa: useState(useContext(createContext(1))),

    User: {
      Id: useState(useContext(createContext(null))),
      Name: useState(useContext(createContext(""))),
      LoginName: useState(useContext(createContext(""))),
      LoginPass: useState(useContext(createContext(""))),
      Info: useState(useContext(createContext({}))),
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

// -----------------------------------------------------------------------------


let useAcciones = function(StateContext) {
  const [Empresa, setEmpresa] = useContext(StateContext).Empresa;



  // ---------------------
  
  return {
    Loader : async function (props) {
      console.log("loader")
    },
  }
}








// -----------------------------------------------------------------------------

const Body = props => {
  const useacciones = new useAcciones(StateContext)

  const [Loading, setLoading] = useContext(StateContext).LoadingSecc1
  const [UserId, setUserId] = useContext(StateContext).User.Id;


// ------------
    // useEffect(() => {useacciones.Loader(props) }, [])
    // useEffect(() => {useacciones.getCliente(UserId) }, [UserId])

// ------------
  try {

    return (

      <Flex bg="WhiteSmoke" sx={{width: "100%" }}>
        {Loading ? <Spinner size={17} ml={3} /> : 
          <Flex sx={{width: "100%" }}>
            <Box sx={{ width: "100%" }}>

              <main>
                Body
              </main>

            </Box>
          </Flex>
        }
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
          css={{ maxWidth: "768px", minWidth: "410px" }}
        >
          <header sx={{width: "100%"}}>
            {/* <Headi {...props} />
            <MenuHeader2 {...props} /> */}
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