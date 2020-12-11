import React, { useState, useEffect, useContext, createContext } from "react";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image, Spinner, Grid, Input, Link } from "@theme-ui/components"
import Theme from "./theme"

import {CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe, StripeProvider, Elements} from "react-stripe-elements"


let App;

// -----------------------------------------------------------------------


let CardImages = {
  no: {src: "https://smxai.net/sf/card_no.jpg"},
  vs: {src: "https://smxai.net/sf/card_vs.jpg"},
  mc: {src: "https://smxai.net/sf/card_mc.jpg"},
  am: {src: "https://smxai.net/sf/card_am.jpg"},
}

// ---------------------------------------





// ---------------------------------------

  const StateContext = createContext();

// ---------------------------------------

const useStateLocal = () => {
  return {
    Theme: useState(useContext(createContext(Theme))),
    Loading: useState(useContext(createContext(false))),
    Pagado: useState(useContext(createContext(0))),
    Monto: useState(useContext(createContext(0))),
    PayStatus: useState(useContext(createContext({ Status: "Pagar", Color: "#66cc99" }))),
    Indica: useState(useContext(createContext("Llena  todos los datos"))),
    Disabled: useState(useContext(createContext(false))),
    CardType: useState(useContext(createContext("--"))),
  };
};

// ------------------

const ContextProvider = props => {
  return (
    <StateContext.Provider value={useStateLocal()}>
      <ThemeProvider theme={Theme}>{props.children}</ThemeProvider>
    </StateContext.Provider>
  );
};

// ------------------------------------------------------------------------

const Body = props => {

  const Estilo = useThemeUI().theme.styles


  const [Disabled, setDisabled] = useContext(StateContext).Disabled;

  const {Pagar, Indica, token} = props

// ------------------

  const ccNumberRef = React.useRef(null);

  // -----------------------------------------------------------------

















  const SplitForm = props => {
    const [PayStatus, setPayStatus] = useContext(StateContext).PayStatus

    const [refCard, setRefCard] = useState(null);
    const [refVenc, setRefVenc] = useState(null);
    const [refCvc, setRefCvc] = useState(null);

    let [CardType, setCardType] = useState(CardImages.no.src);
    const [Pagando, setPagando] = React.useState(false);


    const CardImage = (card) => {
      if (card==="visa") {return CardImages.vs.src}
      if (card==="mastercard") {return CardImages.mc.src}
      if (card==="amex") {return CardImages.am.src}

      return CardImages.no.src
    }




const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize: fontSize,
        color: "#424770",
        letterSpacing: "0.025em",
        fontFamily: "Source Code Pro, monospace",
        "::placeholder": {
          color: "#aab7c4",
          fontFamily: "Arial, Helvetica, sans-serif"
        },
        border: "5px solid red",
        padding
      },
      invalid: {
        color: "#9e2146"
      }
    }
  };
};



















      const ColorBoton = function(props) {

        if(PayStatus.Status==="Rechazado") { return PayStatus.Color}
        if(refCard && refVenc && refCvc ){return "#228B22"}
        return "lightgrey";
      }




      const handleSubmit = async ev => {
        ev.preventDefault()
        let Pago

        if (props.stripe) {
          setPagando(true)

          // ------ Bueno
           let Token = await props.stripe.createToken()
          //  console.log({token: Token})

          // ------ Test
          //let Token = { token: { id: "TT0Ken", client_ip: "299.300" } }

           if (Token.token) {
              Pago = await Pagar(Token)

            } else {Pago = 0}

            if(Pago===0) {setPayStatus({ Status: "Rechazado", Color: "DarkOrange" })}

          console.log({pago: Pago})
          setPagando(false)
        }
      }


      // -------------------------

      // const handleSubmit = async ev => {
      //   ev.preventDefault()
      //   let Pago

      //   let Token = token

      //   console.log({Token})

      // }
      
















    try {

      return (
        <Flex sx={{ width: "100%", ml: 5 }}>
          <form style={{width: "260px"}} onSubmit={handleSubmit}>



          <Flex sx={{ width: "100%" }}>                        
              <label sx={Estilo.cardl1} >Número de tarjeta</label>
          </Flex>


          <Flex sx={{ width: "100%" }}>                        
            <Box sx={{width: "90%" }}>
                <CardNumberElement
                  ref={ccNumberRef}
                  //onReady={e => {setRefCard(e)}}
                  {...createOptions(33)}
                  css={{
                    // fontSize: "40px",
                    border: "1px solid grey",
                    borderRadius: "5px",
                    height: 30,
                    width: 180,
                    paddingLeft: 15,
                    paddingTop: 9
                  }}
                  onChange={e => {
                    setCardType(CardImage(e.brand))
                    setRefCard(e.complete)
                  }}
                />

            </Box>
            <Box sx={{width: "30%" }}>
              <Image sx={{mt: 1, mb:1, ml:2, verticalAlign: "middle" }} src={CardType} />
            </Box>

          </Flex>


          <Box css={{ height: 3 }} />

          <Flex sx={{ width: "100%", ml: "30px" }}> 

            <Box sx={{ width: "130px", mt:3 }}>                       
              <label sx={Estilo.cardl1} >Vigencia</label>
            </Box>

            <Box sx={{ width: "70px", mt:3 }}>  
              <label sx={Estilo.cardl1} >Código</label>

            </Box>


          </Flex>

          <Box css={{ height: 2 }} />


          <Flex sx={{ width: "100%" }}>                        
            <Box sx={{width: "50%" }}>
              <CardExpiryElement
                css={{
                  border: "1px solid grey",
                  borderRadius: "5px",
                  height: 30,
                  width: 80,
                  paddingLeft: 30,
                  paddingTop: 9
                }}
                //onChange={handleChange}
                {...createOptions(15)}
                //onReady={e => setRefVenc(e)}
                onChange={e => {setRefVenc(e.complete)}}
              />
            </Box>

            <Box sx={{width: "50%" }}>
              <CardCVCElement
                css={{
                  border: "1px solid grey",
                  borderRadius: "5px",
                  height: 30,
                  width: 80,
                  paddingLeft: 40,
                  paddingTop: 9
                }}
                //onChange={handleChange}
                {...createOptions(3)}
                //onReady={e => setRefCvc(e)}
                onChange={e => {setRefCvc(e.complete)}}
              />
            </Box>
            </Flex>


            <Box css={{ height: 21 }} />

              <Flex sx={{ width: "100%" }}>                      
                  <Box sx={{ width: "100%" }}>

                      <Button 
                        //sx={Estilo.cardbtn1(PayStatus.Color)}
                        sx={Estilo.cardbtn1(ColorBoton())}

                        width={1}
                        bg={ColorBoton()}
                        Disabled={false}
                      >
                        <Text Disabled={Disabled}>
                          {PayStatus.Status}
                          {Pagando ? <Spinner size={17} ml={3} /> : <div/>}
                        </Text>
                      </Button>

                  </Box>
              </Flex>

            <Box css={{ height: 21 }} />

          </form>

        </Flex>
      )

    } catch (e) {
      console.error(e);
    }
  }

  // -----------------------------------------------------------------

    const SSplitForm = injectStripe(SplitForm);

  // -------------------------

  try {
    return (
      <div>
      
          <div>
            <Flex sx={{ width: "100%" }}>
              <Box
                bg="WhiteSmoke"
                sx={{
                  fontWeight: "normal",
                  fontSize: 1,
                  color: "text",
                  fontFamily: "body",
                  width: "100%"
                }}
              >

                <StripeProvider apiKey={token}>
                  <div className="Checkout">
                    <Elements>
                      <SSplitForm fontSize={{ elementFontSize: "30px" }}/>
                    </Elements>
                  </div>                 
                </StripeProvider>

              </Box>
            </Flex>

          </div>
       
      </div>
    );
  } catch (e) {
    console.error(e);
  }


};


// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  //console.log(props.Paid)
  return (
    <ContextProvider Theme={props.Theme}>
      <Flex sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>

          <Body {...props} texto="Roll" />

        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------