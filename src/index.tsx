import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import store from "./redux/store";
import './index.scss';
import App from "./components/app/app";
import Modal from "react-modal";


Modal.setAppElement('#root');

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);