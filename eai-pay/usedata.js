import axios from "axios"
//import moment from "moment"

// ------------------------------------------------------------------

// let graphqlserver = "https://8t8jt.sse.codesandbox.io/gql"
 let graphqlserver = "https://smxai.net/graphqleai2"


let usedata = function(StateContextM) {

  return {
    Pedidos: function() {
      return {
        get: async function(e) {
         
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query PedidoResumenSuma($Query: PedidoInput){
                  Pedidos{
                    Consultas{
                      PedidoResumenSuma(Query: $Query ){
                        Id
                        Fecha
                        Cuenta
                        Sucursal
                        SucursalDesc
                        Cliente
                        Nombre
                        Apellido
                        Status
                        Monto
                        Pagado
                        TipoEntrega
                        Confirmado
                        Atendido
                        Enviado
                        Entregado
                        Proceso
                        ProcesoObv
                        Obv
                        ConsumosMonto
                        ConsumosCuenta
                      }
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Codigo: String(e.Codigo),
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.Pedidos.Consultas.PedidoResumenSuma

          if (axdataRes) {return axdataRes} else {return 0}
        },



        upProceso : async function(e) {

          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation upPedido ($Query: PedidoInput ) {
                  PedidosM {
                    Registro {
                      UpdateProceso (Query: $Query)
                    }
                  }
                }
              `,
              variables: {
                Query: {
                  Id: Number(e.Id),
                  Proceso: e.Proceso,
                  ProcesoObv: e.ProcesoObv
                }
              }
            }
          });
    
          if (axdata.data) {return 1} else return 0
    
        },


      }
    },


    Consumos: function() {
      return {

        get2: async function(MiPedido) {
          try {
           // setLoading(true)
            var axdata = await axios({
              url: graphqlserver,
              method: "post",
              data: {
                query: `
                  query ConsumosResumen($Query: ConsumoInput) {
                    Consumos {
                      Consultas {
                        Resumen1(Query: $Query){
                          Pedido
                          Id
                          Fecha
                          Producto
                          ProductosTitulo
                          ProductosFoto
                          Precio
                          PrecioObv
                          Descuento
                          Cantidad
                          Importe
                          ConsumosExtrasImporte
                          ConsumoTotal
                          Obv
                          Proceso
                          ProcesoObv
                        }
                      }
                    }
                  }
                  `,
                variables: {
                  Query: { Pedido: MiPedido }
                }
              }
            });

             if (axdata.data.data.Consumos.Consultas.Resumen1) {
               return axdata.data.data.Consumos.Consultas.Resumen1
              } else return 0

          } catch (e) {console.error(e)}
        }, // ----get



      }
    },


    Location: function() {
      return {
        insert : async function(e) {
          console.log(e)
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
              mutation LocationInsert ($Query: PedidoLocationInput ) {
                PedidosLocationsM {
                  Registro {
                    Insert (Query: $Query)
                  }
                }
              }         
              `,
              variables: {
                Query: {
                  "Pedido": Number(e.Pedido),
                  "LocLat": Number(e.LocLat),
                  "LocLong": Number(e.LocLong),
                  "Accuracy": Number(e.Accuracy),
                  Marca: e.Marca,
                  Color: e.Color,
                  Obv: e.Obv
                 // Fecha: e.Fecha,
                }
              }
            }
          });
      
          let axdataRes = axdata.data.data.PedidosLocationsM.Registro.Insert;
      
          if (axdataRes) {return axdataRes} else { return 0}
        },

      };
    }, // ------- Location






    Pagos: function() {
      return {



        Stripe3: async (e) => {
         // console.log("PayStripe: " + JSON.stringify(token));
    
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
              mutation PagoToken ($PayIntent: StripePaymentIntent) {
                PagosM  {
                  Registro {
                    Pagar (Query: $PayIntent)
                  }
                }
              }
            `,
              variables: {
                PayIntent: {
                  Id: Number(e.Pedido),
                  Cart: e.Sucursal,
                  Token: 1234,
                  SToken: e.Token.token.id,
                  Amount: Number(e.Monto) * 100,
                  Descripcion: "Pedido Suc " + e.Sucursal + " # " + e.Pedido,
                  Ip: e.Token.token.client_ip,
                  Servicio: Number(e.Servicio),
                  Obv: e.Obv
                }
              }
            }
          });
    
          console.log(axdata.data);
          if (axdata.data.data.PagosM.Registro.Pagar === 1) {
            // setPayStatus({ Status: "Pagado", Color: "green" });
            return 1;
          } else {
           // setPayStatus({ Status: "Pago No Procesado", Color: "red" });
            return 0;
          }
        },











      };
    }, // ------- Pagos




























  }

}

export default usedata

