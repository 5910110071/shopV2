import React, { Component } from "react"
import { connect } from "react-redux"
import { reduxForm, Field } from "redux-form"
import FormField from "../../components/FormField"
import { CommentFormFields } from "./CommentFormFields"


class RegisterForm extends Component {

    renderFields(CommentFormFields) {

        return CommentFormFields.map(({ label, name, type, required }) => {
            return (
                <Field key={name} label={label} name={name} type={type} required={required} component={FormField} />
            )
        })

    }
    render() {
        const { onCommentSubmit } = this.props
        return (
            <div className="container mb-3">
               
                    <form onSubmit={this.props.handleSubmit(onCommentSubmit)}>
                    
                        {this.renderFields(CommentFormFields)}
                        <div className="d-flex flex-row-reverse bd-highlight">
                            <button className="btn btn-danger title mb-4 mt-4  " type="submit" >บันทึก</button>
                        </div>
                    </form>
               
            </div>
        )
    }
}

function validate(values) {
    console.log("values", values)
    const errors = {};
    CommentFormFields.forEach(({ name, required }) => {
        if (!values[name] && required) {
            errors[name] = 'กรุณากรอกข้อมูล'
        }
    })
    return errors // redux from จะจัดการโดยการส่ง error ไปให้ Field
}

function mapStateToProps({ orders }) {
    // if (orders && orders.id) {
    //     return { initialValues: orders }
    // }
    // else {
    //     return {}
    // }
    return { orders }
}

RegisterForm = reduxForm({ validate, form: "commentForm" })(RegisterForm)
export default connect(mapStateToProps)(RegisterForm)