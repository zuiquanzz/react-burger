import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import {Provider} from "react-redux";
import {configureStore} from "./services/store";
import {HashRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root')  as HTMLElement);

const store = configureStore();

root.render(
    <HashRouter>
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    </HashRouter>
)

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals