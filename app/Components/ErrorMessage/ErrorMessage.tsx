import React from "react";
import { FcHighPriority } from "react-icons/fc";
import Backdrop from "../Backdrop/Backdrop";
import Card from "../Card/Card";
import { useWordleStore } from "@/app/Stores/useWordleStore";
import Button from "../Button/Button";

function ErrorMessage() {
  const errorMessage = useWordleStore((state) => state.errorMessage.message);
  const changeErrorMessage = useWordleStore(
    (state) => state.changeErrorMessage
  );

  const closeErrorMessage = () => {
    changeErrorMessage(false, "");
  };

  return (
    <Backdrop>
      <Card size="large">
        <FcHighPriority size={40} />
        <span>{errorMessage}</span>
        <Button onClick={closeErrorMessage} onKeyDown={closeErrorMessage}>
          OK
        </Button>
      </Card>
    </Backdrop>
  );
}

export default ErrorMessage;
