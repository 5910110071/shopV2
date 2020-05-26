import React, { Component } from 'react'
import Header from "./Header"
import Footer from "./Footer"

const NotFound = ()=>{
    return(
        <div>
            <Header/>
            <div className = "container col-md-8 text-center">
                <h1 style={{fontSize : 120}}>404</h1>
                <h2>Not Found</h2>
                <p className = "title">ขออภัยไม่พบหน้าที่คุณค้นหา ดูเหมือนว่าหน้าเว็บคุณพยายามเข้าถึงหน้าที่+ไม่มีอยู่อีกต่อไปหรืออาจจะย้ายไปเว็บอื่น</p>
            </div>
            <Footer/>

        </div>
    )

}
export default NotFound