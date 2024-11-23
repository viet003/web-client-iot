import { toast } from 'react-toastify';

export const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        error = !emailRegex.test(value) ? "Không đúng định dạng email" : "";
        break;
      case "vehicle_type":
        break;
      default:
        // error = !Number.isInteger(value) && value.trim() === "" ? "Không được bỏ trống thông tin" : "";
        break
    }
    return error;
  };

export const handleCheckError = (data) => {
    let newErrors = {};
    Object.keys(data).forEach((key) => {
      const error = validateField(key, data[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length !== 0) {
      Object.values(newErrors).forEach((error) => {
        toast.error(error);
      });
      return true;
    } 
    return false;
  }
