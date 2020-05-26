import React, { Component } from "react"
import { connect } from "react-redux"

import CommentForm from "../../containers/product/CommentForm"

import { commentPost, ratingFetch } from '../../actions'

// import Rating from '@material-ui/lab/Rating';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';


import axios from 'axios'

import StarRatingComponent from 'react-star-rating-component';

class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rating: 0,
            saved: false
        }
    }
    componentDidMount() {

    }

    onStarClick(nextValue, prevValue, name) {
        console.log("prevValue", prevValue)
        console.log("nextValue", nextValue)
        if (nextValue == prevValue && nextValue == 1)
            this.setState({ rating: 0 });
        else
            this.setState({ rating: nextValue });
    }

    onSubmit(formValues) {
        formValues.user_id = this.props.user._id
        formValues.user_image = this.props.user.user_image
        formValues.user_name = this.props.user.user_name
        formValues.product_id = this.props.product_id
        formValues.rating = this.state.rating

        this.props.ratingFetch(this.props.product_id, formValues)

        // axios.get("http://localhost:5000/rating/" + this.props.product_id).then(
        //     res => {
        //         console.log("Rating55555555555555555555", res.data)
        //         if (res.data == null) {
        //             console.log("Here1", formValues.rating)
        //             axios.post("http://localhost:5000/rating", { product_id: this.props.product_id, sum: formValues.rating, count: 1, average: formValues.rating }).then( //ต้องแก้โดยการส่งไปที่ DB ของ user แต่ละคน หลังจากนั้นจะดึง ข้อมูลของ User แต่ละคนมาแสดงว่ายืนยันรายการอะไรไปแล้วมั้ง 
        //                 res => {
        //                     console.log("Rating", res.data)
        //                 }
        //             )
        //         }
        //         else {
        //             let value = {
        //                 product_id: this.props.product_id,
        //                 sum: (res.data.sum + formValues.rating),
        //                 count: res.data.count + 1,
        //                 average: (res.data.sum + formValues.rating) / (res.data.count + 1)
        //             }
        //             console.log("res.data.sum ", res.data.sum , "formValues.rating" ,formValues.rating )
        //             axios.put("http://localhost:5000/rating/" + this.props.product_id, value).then(
        //                 res => {
        //                     console.log("Rating", res.data)
        //                 }
        //             )
        //         }
        //     }
        // )

        this.props.commentPost(formValues, this.props.product_id)


        this.setState({
            rating: 0,
            saved: true
        });

    }
    render() {

        const { rating } = this.state;

        console.log("this.state.rating", this.state.rating)
        const { formValues } = this.props;
        return (

            <div className="container">
                <h2 className="mt-3 text-center">แสดงความคิดเห็น</h2>
                <div className="card">
                    <div className="row">
                        <div className="col-12 text-center mt-3">
                            {this.state.saved &&
                                <div className="container">
                                    <div class="alert alert-success text-center " role="alert">
                                        <h4 className="title col-12 text-right text-center">บันทึกความคิดเห็นแล้ว</h4>
                                    </div>
                                </div>
                            }
                            <label className="mt-3 text-center " className="title" >ระดับคะแนน</label>
                            <div>
                                < StarRatingComponent
                                    name="rate1"
                                    starCount={5}
                                    value={rating}
                                    renderStarIcon={() => <h1>★</h1>}
                                    onStarClick={this.onStarClick.bind(this)}
                                />
                            </div>
                        </div>
                        <div className="col-12" >
                            {/* <Box component="fieldset" mb={3} borderColor="transparent">
                                    <Typography component="legend">Controlled</Typography>
                                    <Rating
                                        name="simple-controlled"
                                        value={this.state.value}
                                        onChange={(event, newValue) => {
                                            this.setState({
                                                value: newValue
                                            });
                                        }}
                                    />
                                </Box> */}
                            <CommentForm onCommentSubmit={() => this.onSubmit(formValues)} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps({ form, user }) {
    return { formValues: form.commentForm ? form.commentForm.values : null, user }
}
export default connect(mapStateToProps, { commentPost, ratingFetch })(Comment)