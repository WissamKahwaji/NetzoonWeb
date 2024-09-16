/* eslint-disable @typescript-eslint/no-explicit-any */
import { t } from "i18next";
import { AdsModel } from "../../../apis/ads/type";
import { getCurrencyFromCountry } from "../../../utils";
import { useCountry } from "../../../context/CountryContext";
import { IoShareSocialSharp } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useDeleteAdsMutation } from "../../../apis/ads/queries";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "react-modal";
import { useGetPaymentConfigQuery } from "../../../apis/product/queries";
import { loadStripe, Stripe, StripeElementsOptions } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { createIntent } from "../../../apis/product";
import { toast } from "react-toastify";

interface AdsInfoPageProps {
  adsInfo: AdsModel;
}

const AdsInfoPage = ({ adsInfo }: AdsInfoPageProps) => {
  const { country } = useCountry();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const { mutate: deleteAdvInfo } = useDeleteAdsMutation();
  const { data: paymentConfig } = useGetPaymentConfigQuery();

  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);

  const openModalTwo = () => {
    // setSelectedProduct(product);
    setIsModalOpenTwo(true);
  };
  const closeModalTwo = () => {
    setIsModalOpenTwo(false);
  };

  const handleDeleteAdv = () => {
    deleteAdvInfo(adsInfo?._id ?? "");
  };

  useEffect(() => {
    (async () => {
      if (paymentConfig) {
        const stripePromise = await loadStripe(paymentConfig.publicKey);
        setStripePromise(stripePromise);
      }
    })();
  }, [paymentConfig]);

  const options: StripeElementsOptions = {
    mode: "payment",
    amount: 200,
    currency: "aed",
    appearance: {},
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow:
      adsInfo?.advertisingImageList &&
      adsInfo?.advertisingImageList.length < 2.5
        ? adsInfo?.advertisingImageList.length
        : 2.5,

    slidesToScroll: 2.5,
    rtl: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:
            adsInfo?.advertisingImageList &&
            adsInfo?.advertisingImageList.length < 2.5
              ? adsInfo?.advertisingImageList.length
              : 2.5,

          slidesToScroll: 2.5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow:
            adsInfo?.advertisingImageList &&
            adsInfo?.advertisingImageList.length < 2.5
              ? adsInfo?.advertisingImageList.length
              : 2.5,

          slidesToScroll: 2.5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow:
            adsInfo?.advertisingImageList &&
            adsInfo?.advertisingImageList.length < 2.5
              ? adsInfo?.advertisingImageList.length
              : 2.5,

          slidesToScroll: 2.5,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow:
            adsInfo?.advertisingImageList &&
            adsInfo?.advertisingImageList.length < 2.5
              ? adsInfo?.advertisingImageList.length
              : 2.5,

          slidesToScroll: 2.5,
        },
      },
    ],
  };
  return (
    <div className=" grid grid-cols-1 md:grid-cols-1 gap-x-4 w-full px-2 py-4  font-header space-y-4 md:justify-center md:items-center md:mx-auto md:w-1/2">
      <div className="w-full h-[350px]">
        <img
          crossOrigin="anonymous"
          src={adsInfo.advertisingImage}
          alt=""
          className="w-full h-full shadow-sm object-contain"
        />
      </div>
      <div className="flex flex-col space-y-3 w-full capitalize mt-12">
        <div className="w-full flex flex-row justify-between items-center   mt-3">
          <p>{adsInfo.advertisingLocation}</p>
          <p>
            {t("num_of_viewers")} {adsInfo.adsViews}
          </p>
        </div>
        <div className="w-full flex flex-row justify-between items-center">
          {adsInfo?.advertisingPrice && (
            <p className="text-lg text-primary font-semibold">
              <span className="text-red-950 ">{t("price")} : </span>{" "}
              {adsInfo?.advertisingPrice.toFixed(2)}
              {getCurrencyFromCountry(country)}
            </p>
          )}
          <div className="flex flex-row justify-start items-center gap-x-4">
            <IoShareSocialSharp className="w-7 h-7 text-primary" />
            {userId === adsInfo.owner?._id && (
              <div className="flex flex-row justify-center items-center gap-x-4 w-full">
                <MdEdit
                  className="text-primary w-6 h-6 cursor-pointer"
                  onClick={() => {
                    navigate("edit");
                  }}
                />

                <MdDelete
                  className="text-red-500 w-6 h-6 cursor-pointer"
                  onClick={openModal}
                />
              </div>
            )}
          </div>
        </div>
        <p className="text-lg font-header font-semibold">
          {adsInfo?.advertisingTitle}
        </p>
        <p className="text-base font-body">{adsInfo?.advertisingDescription}</p>
        {userId &&
          adsInfo.purchasable === true &&
          adsInfo.owner?._id !== userId && (
            <div className="w-full flex items-center justify-center">
              <button
                className="w-1/2 flex justify-center items-center rounded-md shadow-md bg-primary py-3 mt-3 capitalize text-white font-semibold "
                onClick={openModalTwo}
              >
                {t("buy_now")}
              </button>
            </div>
          )}
        <hr className=" bg-slate-400 h-0.5 w-full" />
        <div className="flex flex-col space-y-3">
          <p className="font-semibold">{t("images")} : </p>
          {adsInfo?.advertisingImageList &&
          adsInfo?.advertisingImageList.length > 0 ? (
            <Slider {...settings}>
              {adsInfo?.advertisingImageList.map((item, index) => (
                <div key={index} className="px-2">
                  <div className="relative w-full h-[140px] md:w-[200px] md:h-[180px] lg:w-[220px] lg:h-[200px] xl:w-[240px] xl:h-[220px]  2xl:w-[260px] 2xl:h-[240px] rounded-lg shadow-lg border border-gray-200 flex flex-col justify-start items-center bg-white hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={item}
                      crossOrigin="anonymous"
                      alt={`card image`}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p>no images</p>
          )}
        </div>
        <hr className=" bg-slate-400 h-0.5 w-full" />
        {adsInfo?.advertisingVedio && (
          <div className="flex flex-col space-y-3 w-full">
            <p className="font-semibold">{t("video")}</p>
            <video
              playsInline
              muted
              controls
              autoPlay
              className="object-cover bg-transparent w-full max-h-[250px] "
            >
              <source src={adsInfo?.advertisingVedio} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-lg font-bold mb-4">{t("delete_adv")}</h2>
          <p className="mb-4">{t("delete_adv_warning")}</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              {t("no")}
            </button>
            <button
              onClick={() => {
                handleDeleteAdv();
                closeModal();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md"
            >
              {t("yes")}
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isModalOpenTwo}
        onRequestClose={closeModalTwo}
        contentLabel="Confirm Payment"
        className="fixed inset-0 flex items-center justify-center z-50 md:mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-2 rounded-lg shadow-lg max-w-sm w-full max-h-[450px] md:max-h-[500px] overflow-y-auto">
          {stripePromise && adsInfo?.advertisingPrice ? (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm amount={adsInfo?.advertisingPrice ?? 0} />
            </Elements>
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

interface CheckoutFormProps {
  amount: number;
}
const CheckoutForm = ({ amount }: CheckoutFormProps) => {
  // const userId = localStorage.getItem("userId");
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const stripe = useStripe();
  const elements = useElements();
  // const { mutate: savePurchDeal } = useSavePurchDealMutation();
  const handlePaymentSubmit = async (event: any) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    try {
      const { clientSecret } = await createIntent({
        amount: amount,
      });

      toast.success("Successfully processed payment for the deal");

      const stripeRes = await stripe?.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}`,
        },
      });

      if (stripeRes?.error) {
        setErrorMessage(stripeRes?.error.message);
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <div>
      <div className=" m-auto max-w-sm px-4 py-20">
        <form onSubmit={handlePaymentSubmit}>
          <PaymentElement />
          <button
            className="mt-3 bg-primary px-3 py-1 rounded text-white w-full"
            type="submit"
            disabled={!stripe || !elements}
          >
            Pay
          </button>
          {/* Show error message to your customers */}
          {errorMessage && (
            <div className="text-destructive">{errorMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdsInfoPage;
