import React from 'react'
import { Link } from 'react-router-dom'

import "./index.css"

export default function Page({ children, header = "" }) {
    return (
        <div className='fixed-t-l full-screen page'>
            <div className='flex-row'>
                <Link className='button' to="/">
                    {"<< Back"}
                </Link>
                <h1>
                    {header}
                </h1>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}
