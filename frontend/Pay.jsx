import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {useState,useEffect} from "react";


const Key = "pk_test_51JztsBD5U5jmu583cITzHMMQIZ86FUGBsAWrfw8LZQG1PJyK6q92SxNQIV8Zh6exMgoQ65zbgutOYTnv6Eoz0rRc00XNkiAgy8"

const Pay = () =>{
    const [stripeToken,setStripeToken] = useState(null)

    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(()=>{
        const makeRequest = async function(){
            try{
                const res = await axios.post("http//localhost:3000/checkout/payment",
                    {
                        tokenId: stripeToken.id,
                        amount: 2000
                    }
                );
                console.log(res.data);
            }catch(err){
                console.log(err);
            }
        };
        stripeToken && makeRequest();
    },[stripeToken])

    return(
        <div
            style = {{
                height: "100vh",
                display:"flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <StripeCheckout
                name="HyperThread"
                //image="frontend/src/img.png"
                billingAddress
                shippingAddress
                description= "Total: $20"
                amount={2000}
                token={onToken}
                stripeKey={Key}
            >
                <button>
                    style={{
                    border: "none",
                    width:120,
                    borderRadius:5,
                    padding: "20px",
                    backgroundColor: "black",
                    color: "white",
                    fontWeight: "600",
                    cursor: "pointer",
                }} >
                    Pay Now
                </button>
            </StripeCheckout>
        </div>
    );
}
export default Pay;