import {
    FETCH_CUSTOMERS_SUCCESS,
    CREATE_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER_SUCCESS,
    FETCH_SALES_QUOTATIONS_SUCCESS,
    CREATE_SALES_QUOTATION_SUCCESS,
    FETCH_SALES_ORDERS_SUCCESS,
    CREATE_SALES_ORDER_SUCCESS,
    FETCH_INVOICES_SUCCESS,
    CREATE_INVOICE_SUCCESS,
    FETCH_RETURNS_SUCCESS,
    CREATE_RETURN_SUCCESS,
    UPDATE_CREDIT_LIMIT_SUCCESS,
    FETCH_SALES_ANALYTICS_SUCCESS
} from '../actions/salesActions';

const initialState = {
    customers: [],
    salesQuotations: [],
    salesOrders: [],
    invoices: [],
    returns: [],
    salesAnalytics: null,
    loading: false,
    error: null
};

const salesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CUSTOMERS_SUCCESS:
            return {
                ...state,
                customers: action.payload,
                loading: false
            };

        case CREATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                customers: [...state.customers, action.payload],
                loading: false
            };

        case UPDATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                customers: state.customers.map(customer =>
                    customer.id === action.payload.id ? action.payload : customer
                ),
                loading: false
            };

        case FETCH_SALES_QUOTATIONS_SUCCESS:
            return {
                ...state,
                salesQuotations: action.payload,
                loading: false
            };

        case CREATE_SALES_QUOTATION_SUCCESS:
            return {
                ...state,
                salesQuotations: [...state.salesQuotations, action.payload],
                loading: false
            };

        case FETCH_SALES_ORDERS_SUCCESS:
            return {
                ...state,
                salesOrders: action.payload,
                loading: false
            };

        case CREATE_SALES_ORDER_SUCCESS:
            return {
                ...state,
                salesOrders: [...state.salesOrders, action.payload],
                loading: false
            };

        case FETCH_INVOICES_SUCCESS:
            return {
                ...state,
                invoices: action.payload,
                loading: false
            };

        case CREATE_INVOICE_SUCCESS:
            return {
                ...state,
                invoices: [...state.invoices, action.payload],
                loading: false
            };

        case FETCH_RETURNS_SUCCESS:
            return {
                ...state,
                returns: action.payload,
                loading: false
            };

        case CREATE_RETURN_SUCCESS:
            return {
                ...state,
                returns: [...state.returns, action.payload],
                loading: false
            };

        case UPDATE_CREDIT_LIMIT_SUCCESS:
            return {
                ...state,
                customers: state.customers.map(customer =>
                    customer.id === action.payload.customerId
                        ? { ...customer, creditLimit: action.payload.newCreditLimit }
                        : customer
                ),
                loading: false
            };

        case FETCH_SALES_ANALYTICS_SUCCESS:
            return {
                ...state,
                salesAnalytics: action.payload,
                loading: false
            };

        default:
            return state;
    }
};

export default salesReducer;