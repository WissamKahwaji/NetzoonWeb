import { useTranslation } from "react-i18next";
import { useRateServiceMutation } from "../../../apis/services/queries";
import { useState } from "react";
import { RateServiceInputModel } from "../../../apis/services/type";
import { Modal, Rate, Button } from "antd";

interface RatingServiceDialogProps {
  id: string;
  userId: string;
  visible: boolean;
  onClose: () => void;
}
const RatingServiceDialog = ({
  id,
  userId,
  visible,
  onClose,
}: RatingServiceDialogProps) => {
  const { t } = useTranslation();
  const { mutate: rateService } = useRateServiceMutation();
  const [rating, setRating] = useState<number>(0);
  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    try {
      const data: RateServiceInputModel = {
        id: id,
        rating: rating,
        userId: userId,
      };

      rateService(data);
      //   onRatingSubmit(rating);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal
      title={t("rate_this_service")}
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

export default RatingServiceDialog;
