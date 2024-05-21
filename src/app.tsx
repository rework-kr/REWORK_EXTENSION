import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/global.css';
import Main from "@/app/main";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Main/>
    </React.StrictMode>,
)
