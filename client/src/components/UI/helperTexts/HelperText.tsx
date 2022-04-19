import React, { FC } from "react";

interface HelperTextProps {
    error: null | string,
    message: string,
}

const HelperText: FC <HelperTextProps> = ({error, message}) => {
    return (
        <div style={{color: error ? '#E72831' : '#3FE736'}}>
            {message && <h2>{message}</h2>}
        </div>
    )
}

export default HelperText