import React from "react"

export default ({ input: { value: omitValue, ...inputProps }, meta: omitMeta, ...props }) => {
    return (
        <div className="form-group">
            <label className="title">หลักฐานการชำระเงิน </label>
            <input type='file' {...inputProps} {...props} className="form-control-file" required = {true}/>
        </div>

    )
}

