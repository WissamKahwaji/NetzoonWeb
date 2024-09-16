import { useTranslation } from "react-i18next";
import { useRateUserMutation } from "../../../apis/user/queries";
import { useState } from "react";
import { RateUserInputModel } from "../../../apis/user/type";
import { Modal, Rate, Button } from "antd";

interface RatingDialogProps {
  id: string;
  userId: string;
  visible: boolean;
  onClose: () => void;
}

const RatingDialog: React.FC<RatingDialogProps> = ({
  id,
  userId,
  visible,
  onClose,
  //   onRatingSubmit,
}) => {
  const { t } = useTranslation();
  const { mutate: rateUser } = useRateUserMutation();
  const [rating, setRating] = useState<number>(0);
  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    try {
      const data: RateUserInputModel = {
        id: id,
        rating: rating,
        userId: userId,
      };

      rateUser(data);
      //   onRatingSubmit(rating);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      title={t("rate_this_user")}
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

export default RatingDialog;
