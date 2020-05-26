import React from "react"
export default ({ input, label, type, required, meta }) => {
    //console.log(meta)
    return (
        <div className="form-group">
            <label className="title">{label} </label> 
            <input type={type} required={required} {...input} className="form-control-file" />

            {meta.error && meta.touched &&
                <div className="mt-2 text-danger title text-right">
                    {meta.error}
                </div>
            } 
        </div>
    )
}