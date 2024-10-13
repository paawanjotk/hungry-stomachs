import React, { useEffect } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import axios from 'axios';
import { setLocalCart } from '../storage';

const PaymentProcessing = () => {


    const urlParams = new URLSearchParams(window.location.search);
    console.log("urlParams at PaymentProcessing ~ ", urlParams);
    const paramsArray = [];
    for (const value of urlParams.values()) {
        paramsArray.push(value);
    }

    const redirect = async () => {
        try {
            console.log("PaymentProcessing.js ~ redirect ~", process.env.REACT_APP_BACKEND_BASE_URL);
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/orders/processing-payment`, {
                params: {
                    razorpay_payment_link_reference_id: urlParams.get('razorpay_payment_link_reference_id'),
                    razorpay_payment_link_id: urlParams.get('razorpay_payment_link_id'),
                    razorpay_payment_id: urlParams.get('razorpay_payment_id'),
                    razorpay_signature: urlParams.get('razorpay_signature'),
                    razorpay_payment_link_status: urlParams.get('razorpay_payment_link_status')
                }
            });
            
            window.location.href = res.data.redirectUrl;
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        console.log("PaymentProcessing.js ~ useEffect ~ redirect ~ ");
        redirect();
    }, []);
    
  return (
    <div>
        <LoadingSpinner/>
    </div>
  )
}

export default PaymentProcessing