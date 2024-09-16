import { useTranslation } from "react-i18next";
import { useRateProductMutation } from "../../../apis/product/queries";
import { useState } from "react";
import { RateProductInputModel } from "../../../apis/product/type";
import { Modal, Rate, Button } from "antd";

interface RatingProductDialogProps {
  id: string;
  userId: string;
  visible: boolean;
  onClose: () => void;
}
const RatingProductDialog = ({
  id,
  userId,
  visible,
  onClose,
}: RatingProductDialogProps) => {
  const { t } = useTranslation();
  const { mutate: rateProduct } = useRateProductMutation();
  const [rating, setRating] = useState<number>(0);
  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    try {
      const data: RateProductInputModel = {
        id: id,
        rating: rating,
        userId: userId,
      };

      rateProduct(data);
      //   onRatingSubmit(rating);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      title={t("rate_this_product")}
      style={{ top: 200 }}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose} className="font-header">
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          className="bg-primary text-white font font-header"
          onClick={handleSubmit}
        >
          Submit
        </Button>,
      ]}
    >
      <Rate
        allowHalf
        value={rating}
        onChange={handleRatingChange}
        className="text-primary"
      />
    </Modal>
  );
};

export default RatingProductDialog;
