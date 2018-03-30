import { actionsEnums } from "../common/actionsEnums";
import { ToastType } from "../components/Toast/Toast";

class ToastReducerState {
    message: string;
    type: ToastType;

    constructor() {
        this.message = "";
        this.type = ToastType.Info;
    }
}

const handleSetErrorToast = (state: ToastReducerState, action: any) => {
    return {
        ...state,
        message: action.errorMessage,
        type: ToastType.Error,
    };
};

const handleSetInfoToast = (state: ToastReducerState, action: any) => {
    return {
        ...state,
        message: action.infoMessage,
        type: ToastType.Info,
    };
};

const handleSetSuccessToast = (state: ToastReducerState, action: any) => {
    return {
        ...state,
        message: action.successMessage,
        type: ToastType.Success,
    };
};

const handleClearToast = (state: ToastReducerState, action: any) => {
    return {
        ...state,
        message: "",
    };
};

export const toastReducer = (state: ToastReducerState = new ToastReducerState(), action: any) => {
    switch (action.type) {
        case actionsEnums.SET_ERROR_TOAST:
            return handleSetErrorToast(state, action);
        case actionsEnums.SET_INFO_TOAST:
            return handleSetInfoToast(state, action);
        case actionsEnums.SET_SUCCESS_TOAST:
            return handleSetSuccessToast(state, action);
        case actionsEnums.CLEAR_TOAST:
            return handleClearToast(state, action);
        default:
            return state;
    }
};
