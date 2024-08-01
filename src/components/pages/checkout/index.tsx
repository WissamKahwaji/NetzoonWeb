// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import {
//   PaymentElement,
//   CardElement,
//   Elements,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { useAppDispatch, useAppSelector } from "../../../app/hooks";
// import {
//   selectCartValues,
//   selectDeliveryFee,
// } from "../../../features/cart/slice";
// import { createIntent } from "../../../apis/product";
// import { toast } from "react-toastify";
// const CheckoutForm = () => {
//   const [errorMessage, setErrorMessage] = useState<string | undefined>("");
//   const stripe = useStripe();
//   const elements = useElements();
//   const dispatch = useAppDispatch();

//   const { cartValues } = useAppSelector(selectCartValues);
//   const deliveryFee = useAppSelector(selectDeliveryFee);

//   const handlePaymentSubmit = async (event: any) => {
//     event.preventDefault();

//     if (elements == null) {
//       return;
//     }

//     // Trigger form validation and wallet collection
//     const { error: submitError } = await elements.submit();
//     if (submitError) {
//       // Show error to your customer
//       setErrorMessage(submitError.message);
//       return;
//     }
//     try {
//       const { clientSecret } = await createIntent({
//         amount: 100,
//       });
//       //   dispatch(clearCart({}));
//       toast.success("successfully payment for order");
//       const stripeRes = await stripe?.confirmPayment({
//         //`Elements` instance that was used to create the Payment Element
//         elements,
//         clientSecret,
//         confirmParams: {
//           return_url: `${window.location.origin}`,
//         },
//       });

//       console.log(stripeRes, "stripe response");
//       if (stripeRes?.error) {
//         // This point will only be reached if there is an immediate error when
//         // confirming the payment. Show error to your customer (for example, payment
//         // details incomplete)
//         setErrorMessage(stripeRes?.error.message);
//       } else {
//         // Your customer will be redirected to your `return_url`. For some payment
//         // methods like iDEAL, your customer will be redirected to an intermediate
//         // site first to authorize the payment, then redirected to the `return_url`.
//       }
//     } catch (error) {
//       /* empty */
//     }
//   };

//   return (
//     <div>
//       <div className=" m-auto max-w-sm px-4 py-20">
//         <form onSubmit={handlePaymentSubmit}>
//           <PaymentElement />
//           <button
//             className="mt-3"
//             type="submit"
//             disabled={!stripe || !elements}
//           >
//             Pay
//           </button>
//           {/* Show error message to your customers */}
//           {errorMessage && (
//             <div className="text-destructive">{errorMessage}</div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CheckoutForm;
