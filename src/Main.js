import React, { Component } from 'react'
import App from "./App";
import Login from "./containers/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { connect } from "react-redux"
import { getUser, resetUser } from "./actions"

import Register from "./containers/register/Register"


//import firebase from "firebase"

import { authen } from "./FirebaseConfig";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

// firebase.initializeApp({
//     apiKey: "AIzaSyDxUjkmrMuPt-9RnnnozxJGdQg9u7MgT7E",
//     authDomain: "eonlineshop-be81d.firebaseapp.com",
//     databaseURL: "https://eonlineshop-be81d.firebaseio.com",
//     projectId: "eonlineshop-be81d",
//     storageBucket: "eonlineshop-be81d.appspot.com",
//     messagingSenderId: "133881687769",
//     appId: "1:133881687769:web:bacc443c66e14729a298c8",
//     measurementId: "G-BBHGHXVLK3"

// })

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSignedIn: false,
            user: null
        }

    }
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            authen.auth.GoogleAuthProvider.PROVIDER_ID,
            authen.auth.FacebookAuthProvider.PROVIDER_ID
            // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            // firebase.auth.GithubAuthProvider.PROVIDER_ID,
            // firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }

    componentDidMount = () => {


        authen.auth().onAuthStateChanged(user => {
            //console.log("firebase.auth().onAuthStateChanged")
            this.setState({
                isSignedIn: !!user,
                user: user
            })
            //console.log("this.state", this.state)
            if (user) {
                //console.log("this.props.getUser")
                this.props.getUser(user.uid)
            }
            else {
                this.props.resetUser()
                //console.log("here")
            }
        })
    }

    render() {
        //console.log("this.props.user", this.props.user)
        return (
            <div >
                {/* <Login/> */}
                {this.props.user == null ? (

                    <div className="container" style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }} >
                        
                        {this.state.isSignedIn ? (
                            <span>
                                {/* <div>Signed In!</div> */}
                                {/* <button onClick={() => authen.auth().signOut()}>Sign out!</button> */}
                                

                                <img
                                    className=" card-img-top img-thumbnail mb-2 rounded mx-auto d-block " Style="width: 100px;"
                                    alt="profile picture"
                                    src={authen.auth().currentUser.photoURL}
                                />
                                <h1 className = "text-center">ยินดีต้อนรับคุณ {authen.auth().currentUser.displayName}</h1>

                            </span>
                        ) : (

                                <div className="justify-content-center " >

                                    <div className="card">
                                        <h2 className="text-center pt-3 mb-3">กรุณาเข้าสู่ระบบ</h2>
                                        <StyledFirebaseAuth
                                            uiConfig={this.uiConfig}
                                            firebaseAuth={authen.auth()}
                                        />
                                    </div>
                                </div>


                            )}
                        {(this.props.user == null && this.state.user != null) &&
                            <div>
                                <Register user_id={this.state.user.uid} user_image = {this.state.user.photoURL} />
                            </div>
                        }
                    </div>
                ) :
                    <div>
                        <App />
                    </div>}
            </div>
        )
    }
}
function mapStateToProps({ user }) {
    //console.log("mapStateToProps",user)
    return { user }
}
export default connect(mapStateToProps, { getUser, resetUser })(Main);