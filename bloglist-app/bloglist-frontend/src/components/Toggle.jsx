import React, { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Toggle = forwardRef((props, ref) => {
    const [revealForm, setRevealForm] = useState(false)
    const hideWhenVisible = { 'display': revealForm ? 'none' : '' }
    const showWhenVisible = { 'display': revealForm ? '' : 'none' }

    const toggleVisibility = () => setRevealForm(!revealForm)

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })
    return (
        <div>
            <div style={hideWhenVisible}>
                <button className="reveal-btn" onClick={() => setRevealForm(true)}>{props?.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button className="close-btn" onClick={() => setRevealForm(false)}>Close</button>
            </div>
        </div>
    )
})

PropTypes.Toggle = {
    buttonLabel: PropTypes.string.isRequired
}

export default Toggle