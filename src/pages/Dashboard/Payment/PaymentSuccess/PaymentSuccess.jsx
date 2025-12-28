import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();

  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trakingId,
          });
          console.log(res.data);
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div>
      <h2 className=" text-3xl text-blue-400 ">Payment Success</h2>
      <p>Your transactionId: {paymentInfo.transactionId}</p>
      <p>Your parcelId: {paymentInfo.trackingId}</p>
    </div>
  );
};

export default PaymentSuccess;
