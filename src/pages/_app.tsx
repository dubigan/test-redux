import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'normalize.css';
import '../styles/app.scss';
import { Provider as ReduxProvider } from 'react-redux';
import type { AppProps } from 'next/app';
import { AlertProvider } from '../components/lib/alert/AlertContext';
import Layout from '../components/Layout';
import { useStore } from '../store/redux/redux';
import { initialState } from '../store/redux/reducers';
// import store from '../store/redux/redux';

type ComponentWithPageLayout = AppProps & {
    Component: AppProps['Component'] & {
        PageLayout?: React.ComponentType;
    };
};

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
    const store = useStore(initialState);
    return (
        <ReduxProvider store={store}>
            <Layout>
                <AlertProvider>
                    <Component {...pageProps} />
                </AlertProvider>
            </Layout>
        </ReduxProvider>
    );
}
export default MyApp;
