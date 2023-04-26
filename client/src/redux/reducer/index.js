import{
    GET_PHONES, 
    GET_PHONE,
    GET_DETAIL,
    GET_BRANDS,
    POST_PHONE,
    ORDER_BY_NAME,
    ORDER_BY_RELEASED,
    TIDY_PRICE,
    FILTER_BRANDS,

    GET_COLORES,
    GET_CAPACITY,

    GET_USERS,
    POST_USER,
    GET_USER,

    CLEAN_DETAIL,
    CLEAN_BROAD,
    FILTER_CAPACITY,

    LOGIN_SUCCESS,
    LOG_OUT,
    GET_REVIEWS,
    POST_REVIEW,
    GET_ALL_ORDERS,
    GET_ORDERS_DATE,
    SEND_ORDER,

    GET_TOTAL_ORDERS,
    GET_TOTAL_PARAMETROS,
    GET_USERS_STATISTICS

}from"../actions/index"

const initialState = {
  Phones: [],
  PhonesCopy: [],
  ArrayFilters: [],
  User: {},
  Brands: [],
  Capacity:[],
  Color:[],
  details: [],
  Users: [],
  StatisticsTotal: [],
  Range: {},
  StatisticsUsers: [],
  Reviews:[],
  message: "",
  Orders:[]
};

function rootReducer(state = initialState, action){

    switch (action.type) {
  
      case GET_PHONES:
        return{
          ...state,
          Phones: action.payload,
          PhonesCopy: action.payload,
        };
      
      case GET_PHONE:
        return{
          ...state,
          Phones: action.payload,
          PhonesCopy: action.payload,
        };
  
      case GET_DETAIL:
        return{
          ...state,
          details: action.payload
        };

      case GET_USERS:
        return{
          ...state,
          Users: action.payload
        };

      case GET_USER:
        return{
          ...state,
          Users: action.payload
        }

      case GET_TOTAL_ORDERS:
        return{
          ...state,
          StatisticsTotal: action.payload
        }

      case GET_TOTAL_PARAMETROS:
        return{
          ...state,
          Range: action.payload
        }

      case GET_USERS_STATISTICS:
        return{
          ...state,
          StatisticsUsers: action.payload
        }

      case CLEAN_DETAIL:
        return{
          ...state,
          details: action.payload
        }

      case CLEAN_BROAD:
        return{
          ...state,
          ArrayFilters: []          
      }

        case LOGIN_SUCCESS:

          window.localStorage.setItem('user-log', JSON.stringify(action.payload));

          console.log("action", action.payload)

          return{
            ...state,
            User: action.payload,
        }

        case LOG_OUT:

          window.localStorage.removeItem('user-log');

          return{
            ...state,
            User: {},
          }

    //   case POST_PHONE:
    //     return {
    //       ...state,
    //       Phones: action.payload,
    //       PhonesCopy: action.payload,
    //     };
  

      case GET_BRANDS:
        return {
          ...state,
          Brands: action.payload,
        };

        case GET_COLORES:
          return {
            ...state,
            Color: action.payload,
          };

          case GET_CAPACITY:
            return {
              ...state,
              Capacity: action.payload,
            };
 
  
      case POST_PHONE:
        return {
          ...state,
        };

      case POST_USER:
        return{
          ...state,
        };
  
      //reducers de ordenamiento
  
      case ORDER_BY_NAME:

        let order =
          action.payload === "asc"
            ? state.PhonesCopy.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                  return 1;
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                  return -1;
                }
                return 0;
              })
            : state.PhonesCopy.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                  return -1;
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                  return 1;
                }
                return 0;
              });
        return {
          ...state,
          PhonesCopy: order,
        };
  
      case ORDER_BY_RELEASED:
        let orderByReleased =
          action.payload === "asc"
            ? state.PhonesCopy.sort(function (a, b) {
                if (a.year > b.year) {
                  return 1;
                }
                if (b.year > a.year) {
                  return -1;
                }
                return 0;
              })
            : state.PhonesCopy.sort(function (a, b) {
                if (a.year> b.year) {
                  return -1;
                }
                if (b.year > a.year) {
                  return 1;
                }
                return 0;
              });
        return {
          ...state,
          PhonesCopy: orderByReleased,
        };
  
      case TIDY_PRICE:
        let TidyPrice =
          action.payload === "min"
            ? state.PhonesCopy.sort(function (a, b) {
                if ( parseInt(a.price.toLowerCase()) > parseInt(b.price.toLowerCase())) {
                  return 1;
                }
                if (parseInt(b.price.toLowerCase()) > parseInt(a.price.toLowerCase())) {
                  return -1;
                }
                return 0;
              })
            : state.PhonesCopy.sort(function (a, b) {
                if (parseInt(a.price.toLowerCase()) > parseInt(b.price.toLowerCase())) {
                  return -1;
                }
                if (parseInt(b.price.toLowerCase()) > parseInt(a.price.toLowerCase())) {
                  return 1;
                }
                return 0;
              });
        return {
          ...state,
          PhonesCopy: TidyPrice,
        };
  
      //reduces de filtrados
  
  
      case FILTER_BRANDS:

        let AllBran;

        if(state.ArrayFilters.length === 0){

          AllBran = state.Phones;
          state.ArrayFilters.push(action.payload.type);

          const TypePhonesFilter = action.payload.info === "all" ? AllBran : AllBran?.filter((t) => (state.Brands[t.brandId-1]?.name)?.includes(action.payload.info));
          return {
            ...state,
            PhonesCopy: TypePhonesFilter,
          }
        }

        else{

          if(state.ArrayFilters.includes(action.payload.type)){
            AllBran = state.Phones;

            const TypePhonesFilter = action.payload.info === "all" ? AllBran : AllBran?.filter((t) => (state.Brands[t.brandId-1]?.name)?.includes(action.payload.info));
            return {
              ...state,
              PhonesCopy: TypePhonesFilter,
            }
          }

          else{

            state.Phones = state.PhonesCopy;
            state.ArrayFilters.push(action.payload.type);

            AllBran = state.Phones;

            const TypePhonesFilter = action.payload.info === "all" ? AllBran : AllBran?.filter((t) => (state.Brands[t.brandId-1]?.name)?.includes(action.payload.info));
            return {
              ...state,
              PhonesCopy: TypePhonesFilter,
            }
          }          
        }

        case FILTER_CAPACITY:

          let AllCap;

          if(state.ArrayFilters.length === 0){

            AllCap = state.Phones;
            state.ArrayFilters.push(action.payload.type);
  
            const TypePhonesFilterCapacidad = action.payload === "all" ? AllCap : AllCap?.filter((t) => (state.Capacity[t.storageCapacityId-1]?.capacity) == (action.payload.info))
            return {
              ...state,
              PhonesCopy: TypePhonesFilterCapacidad,
            }
          }
  
          else{
  
            if(state.ArrayFilters.includes(action.payload.type)){
              AllCap = state.Phones;
  
              const TypePhonesFilterCapacidad = action.payload === "all" ? AllCap : AllCap?.filter((t) => (state.Capacity[t.storageCapacityId-1]?.capacity) == (action.payload.info))
              return {
                ...state,
                PhonesCopy: TypePhonesFilterCapacidad,
              }
            }
  
            else{
  
              state.Phones = state.PhonesCopy;
              state.ArrayFilters.push(action.payload.type);
  
              AllCap = state.Phones;
  
              const TypePhonesFilterCapacidad = action.payload === "all" ? AllCap : AllCap?.filter((t) => (state.Capacity[t.storageCapacityId-1]?.capacity) == (action.payload.info))
                return {
                ...state,
                PhonesCopy: TypePhonesFilterCapacidad,
            }
            }          
          }


      case GET_REVIEWS:
        return{
          ...state,
          Reviews: action.payload,
         
        };
        case POST_REVIEW:
          console.log("action.payload es: ",  action.payload)
          return {
            ...state,
            message: action.payload
          }; 

          case GET_ALL_ORDERS:
          return {
            ...state,
            Orders: action.payload
          };

          case GET_ORDERS_DATE:
            return{
              ...state,
              Orders: action.payload
            };

          case SEND_ORDER:
            return {
              ...state,
            };
  
      default: {
        return state;
      }
    }
  }
  
  export default rootReducer;