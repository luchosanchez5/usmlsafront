import React, { useState } from 'react'
const OrderSummeryCard = ({ selectedPayment, DivisionDetailsBySearch, totalAmount }) => {
console.log("🚀 : ~ file: OrderSummeryCard.jsx:7 ~ OrderSummeryCard ~ totalAmount", totalAmount);


    const [showCouponInput, setShowCouponInput] = useState(false);
    const DivisionDetails = DivisionDetailsBySearch[0]

    const handleCouponClick = () => {
        setShowCouponInput(!showCouponInput);
    }

    return (
        <>
            <div className="order-summary-card d-flex flex-column">
                <button className="gradient-btn-orange ">Order Summary</button>
                <div className="order-item d-flex">
                    {/* <img src="https://www.bettingpros.com/img/Tristen_Newton_Uconn_1470x650-1.jpg/1470x650.webp" alt="Product Image" class="product-img" /> */}
                    <div className="item-details d-flex flex-column">

                        <h5>{DivisionDetails?.divisionName}</h5>
                        <div class="price d-flex">

                            <h6 class="discounted-price">${
                                totalAmount
                            }</h6>
                        </div>
                        <p className="description ">

                            Status: <span className='fw-bold' style={{
                                color: DivisionDetails?.divisionStatus === 'OPEN' ? 'green' : 'red',
                            }}>{DivisionDetails?.divisionStatus}</span>
                        </p>

                    </div>
                </div>

                <div className="summary d-flex flex-column">
                    <div className="subtotal d-flex">
                        <span>Subtotal</span>
                        <span class="price">${totalAmount}</span>
                    </div>
                    <div className="total d-flex">
                        <strong>Total</strong>
                        <strong class="price">${totalAmount}</strong>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderSummeryCard