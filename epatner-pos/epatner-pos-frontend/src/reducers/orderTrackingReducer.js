import {
    FETCH_ORDERS_SUCCESS,
    UPDATE_ORDER_STATUS_SUCCESS,
    GET_ORDER_COUNTDOWN_SUCCESS,
    GET_ORDER_DETAILS_SUCCESS,
    UPDATE_DELIVERY_ESTIMATE_SUCCESS,
    ADD_ORDER_NOTE_SUCCESS,
    GET_ORDER_HISTORY_SUCCESS
} from '../actions/orderTrackingActions';

const initialState = {
    orders: [],
    countdowns: {},
    orderDetails: {},
    orderHistory: {},
    loading: false,
    error: null
};

const orderTrackingReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.payload,
                loading: false
            };

        case UPDATE_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                orders: state.orders.map(order =>
                    order.id === action.payload.id ? action.payload : order
                ),
                loading: false
            };

        case GET_ORDER_COUNTDOWN_SUCCESS:
            return {
                ...state,
                countdowns: {
                    ...state.countdowns,
                    [action.payload.orderId]: action.payload.countdown
                },
                loading: false
            };

        case GET_ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                orderDetails: {
                    ...state.orderDetails,
                    [action.payload.id]: action.payload
                },
                loading: false
            };

        case UPDATE_DELIVERY_ESTIMATE_SUCCESS:
            return {
                ...state,
                orders: state.orders.map(order =>
                    order.id === action.payload.id ? action.payload : order
                ),
                orderDetails: {
                    ...state.orderDetails,
                    [action.payload.id]: action.payload
                },
                loading: false
            };

        case ADD_ORDER_NOTE_SUCCESS:
            return {
                ...state,
                orders: state.orders.map(order =>
                    order.id === action.payload.id ? action.payload : order
                ),
                orderDetails: {
                    ...state.orderDetails,
                    [action.payload.id]: action.payload
                },
                loading: false
            };

        case GET_ORDER_HISTORY_SUCCESS:
            return {
                ...state,
                orderHistory: {
                    ...state.orderHistory,
                    [action.payload.orderId]: action.payload.history
                },
                loading: false
            };

        default:
            return state;
    }
};

export default orderTrackingReducer;