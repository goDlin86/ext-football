import React from 'react'
import { goBack } from 'react-chrome-extension-router'

export default function BackButton () {
    return (
        <button onClick={() => goBack()}>
            Домой
        </button>
    )
}