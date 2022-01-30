export type TAlertInfo = 'info';
export type TAlertSuccess = 'success';
export type TAlertDanger = 'danger';

export enum E_ALERT {
    INFO = 'info',
    SUCCESS = 'success',
    DANGER = 'danger',
    ERROR = 'error',
    WARNING = 'warning',
}

export type TAlertType = E_ALERT;

export type TError = {
    type: TAlertType;
    message: string;
};
export type TAlertsState = { messages: Array<TError> };

export type TAlertsContext = TAlertsState & {
    // setAlerts: React.Dispatch<React.SetStateAction<TAlertsState>>;
    setAlerts: (e: any) => void;
};

export type TAlertsProps = {
    timeout?: number;
    withAlerts?: boolean;
};

export type TAlertProps = {
    type: TAlertType;
    shadow?: boolean;
};

export type TContextProps = {
    children?: React.ReactNode;
};
