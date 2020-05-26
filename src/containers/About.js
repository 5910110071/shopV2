import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const About = () => {
    return (
        <div>
            <Header />
            <div className = "container col-md-5">
                <h3>สวัสดีครับ</h3>
                <p>
                    รายละเอียดของร้าน
                </p>
                <h4>
                    จาก เฮลตี้ คาเฟ่
                </h4>
            </div>
            <Footer company="Olanlab" email="olan@olanlab.com" />
        </div>
    )
}
export default About 