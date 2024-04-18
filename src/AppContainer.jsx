import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { Helmet } from 'react-helmet';
import createAppStore from "./redux/store.js";
import FallBackLoading from "./components/pages/FallBackLoading.jsx";

const ErrorComponent = ({ errorMessage }) => (
    <div className="text-red-500 font-bold text-center">{errorMessage}</div>
);



const AppContainer = () => {
    const [store, setStore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initializeStore = async () => {
            try {
                const appStore = await createAppStore();
                setStore(appStore);
            } catch (err) {
                setError(`Error initializing the app: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        initializeStore().finally();
    }, []);

    if (loading || error) {
        return (
            <div className="flex items-center justify-center h-screen">
                {loading ? <FallBackLoading /> : <ErrorComponent errorMessage={error} />}
            </div>
        );
    }

    return (
        <Provider store={store}>
            <Helmet>
                <title>Tax Pass</title>
            </Helmet>
            <App />
        </Provider>
    );
};

export default AppContainer;
