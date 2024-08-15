import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import store from "./redux/store";
import './index.scss';
import App from "./components/app/app";
import Modal from "react-modal";
import {HashRouter} from "react-router-dom";

Modal.setAppElement('#root');

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		{/*<BrowserRouter>*/}
		<HashRouter>
			<Provider store={store}>
				<App/>
			</Provider>
		</HashRouter>
	</React.StrictMode>
);
