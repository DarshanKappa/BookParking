import axios from "axios"
import { useState } from "react"
import { useCookies } from "react-cookie"


const STATUS = 'success'

const server_host = process.env.NEXT_PUBLIC_SERVER_HOST



export const signin = (data, res, catch_error) => {

    const url = `${server_host}/api/auth/signin`

    const json = {
        email: data.email,
        password: data.password
    }

    axios.post(url, json)
    .then(r=>{
        console.log("Signin API success: ", r)
        res(r);
    })
    .catch(e=>{
        console.log("Signin API warning: ", e)
        catch_error(e);
    })
}


export const signup = (data, res, catch_error) => {

    const url = `${server_host}/api/auth/signup`

    const json = {
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        email: data.email,
        mobile: data.mobile,
        password: data.password
    }

    axios.post(url, json)
    .then(r=>{
        console.log("Signup API success: ", r)
        res(r);
    })
    .catch(e=>{
        console.log("Signup API warning: ", e)
        catch_error(e);
    })

}


export const payment_status_API = () => {

    const [response, setResponse] = useState({})

    // const request = ()=>{
        
    //     const payment_request_id = data.payment_request_id
    
    //     const url = `${server_host}/api/payments/${payment_request_id}/status`
    
    //     const json = {
    //         payment_id: payment_id
    //     }
    
    //     const config = {
    //         headers: {
    //             Authorisation: `Bearer ${''}`
    //         }
    //     }
    
    //     axios.post(url, json)
    //     .then(r=>{
    //         console.log("Payment Status API success: ", r)
    //         res(r);
    //     })
    //     .catch(e=>{
    //         console.log("Payment Status warning: ", e)
    //         catch_error(e);
    //     })

    // }

    return "Darshan"
}

