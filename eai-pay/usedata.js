import axios from "axios"
//import moment from "moment"

// ------------------------------------------------------------------

let graphqlserver = "https://8t8jt.sse.codesandbox.io/gql"
// let graphqlserver = "https://smxai.net/graphqleai2"


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


      }
    }
  }

}

export default usedata

