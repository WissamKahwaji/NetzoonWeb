import { useSendbirdStateContext } from "@sendbird/uikit-react";

import "@sendbird/uikit-react/dist/index.css";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";

type ChatButtonProps = {
  userId: string;
  otherPersonId: string;
  coverUrl: string;
  onCreateChannel: (url: string) => void;
};

const ChatButton = ({
  userId,
  otherPersonId: otherPersonId,
  coverUrl,
  onCreateChannel,
}: ChatButtonProps) => {
  const useCreateChannel = (
    userId: string,
    otherPersonId: string,
    coverUrl: string,
    onCreateChannel: (url: string) => void
  ) => {
    // To use the context, the component should be wrapped in the SendbirdProvider.
    const { stores } = useSendbirdStateContext(); // Access the Sendbird state context
    const sdk = stores.sdkStore.sdk; // Get the Sendbird SDK instance
    const { isAuthenticated } = useAuth();
    return async () => {
      if (isAuthenticated) {
        // Ensure that SDK is initialized
        if (!sdk || !sdk.groupChannel) {
          console.log("SDK not initialized");
          return;
        }

        // Use the SDK to create a new group channel
        const params = {
          invitedUserIds: [userId, otherPersonId],
          isDistinct: true,
          name: otherPersonId,
          coverUrl: coverUrl,
        };

        // In production, you should handle the error using try-catch
        const channel = await sdk.groupChannel.createChannel(params);
        onCreateChannel(channel.url);
      } else {
        toast.error("you must be authenticated, login first");
      }
    };
  };
  const onStartChat = useCreateChannel(
    userId,
    otherPersonId,
    coverUrl,
    onCreateChannel
  );
  return (
    <button
      onClick={onStartChat}
      className="py-2 w-32 h-fit bg-primary text-white rounded-full justify-center items-center"
    >
      {"Chat"}
    </button>
  );
};

export default ChatButton;
