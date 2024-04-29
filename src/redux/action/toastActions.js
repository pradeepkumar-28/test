import { toast } from "react-toastify";

export const showToast = (message, type) => {
  return () => {
    toast[type](message);
  };
};
