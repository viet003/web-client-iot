import React, { useState, useEffect } from "react";
import { FaUser, FaCamera, FaExclamationCircle, FaUserCircle, FaPen } from "react-icons/fa";
import User from "../../assets/user.png";
import * as apiService from "../../services/userService";
import { useSelector } from "react-redux";
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const { token } = useSelector(state => state.auth);
  const id = token ? jwtDecode(token).id : "";
  // console.log(jwtDecode(token))

  const [formData, setFormData] = useState({
    id: "",
    user_name: "",
    email: "",
    vehicle_type: "",
    card_id: "",
  });

  const fetchData = async () => {
    try {
      const response = await apiService.apiGetUserById({ id: id });
      if (response?.status === 200 && response?.data?.err === 0) {
        const data = response.data.data;
        setFormData({
          id: id,
          user_name: data.user_name || "",
          email: data.email || "",
          vehicle_type: data.vehicle_type || "",
          card_id: data.card_id || ""
        });
      } else {
        toast.warn(response?.data?.msg);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi khi tải dữ liệu.");
    }
  };

  const updateData = async (data) => {
    try {
      const response = await apiService.apiUpdateUserById(data);
      if (response?.status === 200 && response?.data?.err === 0) {
        toast.success("Cập nhật thông tin thành công");
        setIsEditing(!isEditing)
      } else {
        fetchData();
        toast.warn(response?.data?.msg);
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Lỗi khi update dữ liệu.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        error = !emailRegex.test(value) ? "Không đúng định dạng email" : "";
        break;
      case "vehicle_type":
        break;
      default:
        error = value.trim() === "" ? "Không được bỏ trống thông tin" : "";
        break
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log(formData)
      updateData(formData);
      setIsEditing(false);
    } else {
      Object.values(newErrors).forEach((error) => {
        toast.error(error);
      });
    }
  };

  return (
    <div className="flex min-h-screen px-4 bg-gradient-to-br from-blue-50 to-indigo-50 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="mx-auto overflow-hidden bg-white shadow-xl rounded-2xl min-w-[500px] mb-10 mt-4">
        <div className="flex flex-col justify-between gap-10 px-6 py-10 xl:flex-row">
          <div className="xl:pt-4">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">Thông tin cá nhân</h1>
              <p className="mt-2 text-gray-600 text-md">Quản lý và sửa đổi thông tin của bạn</p>
            </div>

            <div className="flex flex-col items-center mt-12">
              <div className="relative group">
                <img
                  src={User}
                  alt="Profile"
                  className="object-cover w-40 h-40 transition-transform duration-300 transform border-4 border-white rounded-full shadow-2xl hover:scale-105"
                />
                <label
                  htmlFor="profile-image"
                  className="absolute p-3 transition-all duration-200 bg-blue-600 rounded-full shadow-lg cursor-pointer bottom-2 right-2 hover:bg-blue-700 group-hover:scale-110"
                >
                  <FaCamera className="text-xl text-white" />
                  <input
                    type="file"
                    id="profile-image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                    aria-label="Upload profile picture"
                  />
                </label>
              </div>
            </div>

            <div className="justify-end hidden w-full gap-5 mt-10 xl:flex pace-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-3 text-white transition-colors duration-200 bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                {isEditing ? "Đóng" : "Sửa"}
              </button>
              {isEditing && (
                <button
                  className="px-6 py-3 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={handleSubmit}
                >
                  Lưu
                </button>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 min-w-[500px]">
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-xl">
                <h2 className="flex items-center mb-4 text-xl font-semibold text-gray-900">
                  <FaUserCircle className="mr-2" /> Thông tin cá nhân
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="user_name" className="block mb-2 text-sm font-medium text-gray-700">
                      Tên người dùng
                    </label>
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleInputChange}
                      className={`block w-full px-4 py-3 rounded-lg border ${errors.user_name ? "border-red-500" : "border-gray-300"} focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`block w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                      disabled={true}
                    />
                  </div>

                  <div>
                    <label htmlFor="vehicle_type" className="block mb-2 text-sm font-medium text-gray-700">
                      Phương tiện
                    </label>
                    <select
                      id="vehicle_type"
                      name="vehicle_type"
                      value={formData.vehicle_type}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-3 mt-1 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      disabled={!isEditing}
                    >
                      <option value="">Chọn loại phương tiện</option>
                      <option value="0">Xe máy</option>
                      <option value="1">Ô tô</option>
                    </select>
                  </div>


                  <div>
                    <label htmlFor="card_id" className="block mb-2 text-sm font-medium text-gray-700">
                      Mã thẻ
                    </label>
                    <input
                      type="text"
                      id="card_id"
                      name="card_id"
                      value={formData.card_id}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-3 mt-1 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 xl:hidden">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-3 text-white transition-colors duration-200 bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                {isEditing ? "Đóng" : "Sửa"}
              </button>
              {isEditing && (
                <button
                  type="submit"
                  className="px-6 py-3 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Lưu
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
