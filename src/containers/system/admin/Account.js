import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiSearch, FiChevronLeft, FiChevronRight, FiPlusCircle } from "react-icons/fi";
import { FaSort } from "react-icons/fa";
import { CgArrowsExchange } from "react-icons/cg";
import * as apiService from "../../../services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getStatusColor } from './../../../ultils/color';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { Spinner } from "../../../components";

const Account = () => {
  const { token } = useSelector(state => state.auth)
  const type = token ? jwtDecode(token).type : 0;
  const [accounts, setAccounts] = useState([]);
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [paginatedAccounts, setPaginatedAccounts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 5;
  const [editingAccount, setEditingAccount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showChangeModal, setShowChangeModal] = useState(false);

  const [newAccount, setNewAccount] = useState({
    email: "",
    user_name: "",
    card_id: "",
    vehicle_type: 0,
    type: 0,
  });

  const [passWord, setPassWord] = useState({
    type: type,
    email: "",
    pass_word: ""
  })

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [accountResponse, cardResponse] = await Promise.all([
        apiService.apiGetAllUsers(),
        apiService.apiGetCardWhithoutAccount()
      ]);

      if (accountResponse?.status === 200 && accountResponse?.data?.err === 0 && cardResponse?.status === 200 && cardResponse?.data?.err === 0) {
        setAccounts(accountResponse?.data?.data);
        setCards(cardResponse?.data?.data)
      } else {
        toast.warn("Không thể tải dữ liệu.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi khi tải dữ liệu.");
    }
    setIsLoading(false)
  };


  useEffect(() => {
    const filtered = accounts
      .filter(account =>
        account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.employee?.full_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = a[sortConfig.key] || "";
        const bValue = b[sortConfig.key] || "";
        if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });

    setFilteredAccounts(filtered);

    const paginated = filtered.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    setPaginatedAccounts(paginated);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  }, [accounts, searchTerm, sortConfig, currentPage]);

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await apiService.apiRegisterService(newAccount);
      if (response?.status === 200 && response?.data?.err === 0) {
        await fetchData();
        setShowAddModal(false);
        setNewAccount({
          email: "",
          user_name: "",
          card_id: "",
          vehicle_type: 0,
          type: 0,
          pass_word: "",
        });
        toast.success(response?.data?.msg);
      } else {
        toast.warn(response?.data?.msg);
      }
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Lỗi khi thêm tài khoản.");
    }
    setIsLoading(false)
  };

  const handleEdit = (account) => {
    setEditingAccount(account);
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await apiService.apiUpdateUserById(editingAccount);
      if (response?.status === 200 && response?.data?.err === 0) {
        await fetchData();
        setShowModal(false);
        setEditingAccount(null);
        toast.success(response?.data?.msg);
      } else {
        toast.warn(response?.data?.msg);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Lỗi khi cập nhật dữ liệu.");
    }
    setIsLoading(false)
  };

  const handleDelete = async (id) => {
    setIsLoading(true)
    try {
      const response = await apiService.apiDeleteUserById({ id });
      if (response?.status === 200 && response?.data?.err === 0) {
        await fetchData();
        toast.success(response?.data?.msg);
      } else {
        toast.warn(response?.data?.msg);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("Lỗi khi xóa dữ liệu.");
    }
    setIsLoading(false)
  };

  const handleChangePass = async () => {
    setIsLoading(true)
    try {
      const response = await apiService.apiChangePassWordService(passWord);
      if (response?.status === 200 && response?.data?.err === 0) {
        toast.success(response?.data?.msg);
        setPassWord({
          type: type,
          email: "",
          pass_word: ""
        })
      } else {
        toast.warn(response?.data?.msg);
      }
    } catch (error) {
      console.error("Error data:", error);
      toast.error("Lỗi khi đổi mật khẩu.");
    }
    setIsLoading(false)
    setShowChangeModal(false)
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <ToastContainer />
      <Spinner
        isOpen={isLoading}
        onClose={() => setIsLoading(false)}
        message="Loading....."
      />
      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <FiSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm theo email..."
            className="py-2 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 space-x-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <FiPlusCircle />
          <span>Thêm mới</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {[
                { label: "Email", key: "email" },
                { label: "Tên người dùng", key: "user_name" },
                { label: "Mã thẻ", key: "card_id" },
                { label: "Loại phương tiện", key: "vehicle_type" },
                { label: "Loại tài khoản", key: "type" },
              ].map(({ label, key }) => (
                <th
                  key={key}
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
                  onClick={() => handleSort(key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{label}</span>
                    <FaSort className="text-gray-400" />
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedAccounts.map((account) => (
              <tr key={account.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.email}</td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.user_name}</td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{account.card_id}</td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(account.vehicle_type)}`}>
                    {account.vehicle_type === 0 ? "Xe máy" : "Ô tô"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(account.vehicle_type)}`}>
                    {account.type === 0 ? "Người dùng" : account.type === 1 ? "Quản lý" : "Quản trị viên"}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-4 text-sm font-medium whitespace-nowrap">
                  <button onClick={() => handleEdit(account)} className="text-blue-600 hover:text-blue-900" aria-label="Edit account">
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => { setShowChangeModal(!showChangeModal); setPassWord({ ...passWord, email: account.email }) }} className="text-green-600 hover:text-green-900" aria-label="Change password">
                    <CgArrowsExchange className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(account.id)} className="text-red-600 hover:text-red-900" aria-label="Delete account">
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-700">
          Hiển thị trang {((currentPage - 1) * itemsPerPage) + 1} với {Math.min(currentPage * itemsPerPage, filteredAccounts.length)} / {filteredAccounts.length} kết quả
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50"
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg w-96">
            <h2 className="mb-4 text-xl font-bold">Sửa thông tin tài khoản</h2>
            <form onSubmit={handleSave}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="block w-full p-2 mt-1 bg-gray-200 border border-gray-300 rounded-md shadow-sm"
                    value={editingAccount.email}
                    onChange={(e) => setEditingAccount({ ...editingAccount, email: e.target.value })}
                    disabled={true}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tên người dùng</label>
                  <input
                    type="text"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={editingAccount.user_name}
                    onChange={(e) => setEditingAccount({ ...editingAccount, user_name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Loại phương tiện</label>
                  <select
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={editingAccount.vehicle_type}
                    onChange={(e) => setEditingAccount({ ...editingAccount, vehicle_type: parseInt(e.target.value) })}
                    required
                  >
                    <option value={0}>Xe máy</option>
                    <option value={1}>Ô tô</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Loại tài khoản</label>
                  <select
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={editingAccount.type}
                    onChange={(e) => setEditingAccount({ ...editingAccount, type: parseInt(e.target.value) })}
                    required
                  >
                    <option value={0}>Người dùng</option>
                    <option value={1}>Quản lý</option>
                    <option value={2}>Quản trị viên</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showChangeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg w-96">
            <h2 className="mb-4 text-xl font-bold">Đổi mật khẩu tài khoản</h2>
            <form >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
                  <input
                    type="password"
                    className="block w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
                    value={passWord.pass_word}
                    onChange={(e) => setPassWord({ ...passWord, pass_word: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  onClick={() => setShowChangeModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={() => { handleChangePass() }}
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg w-96">
            <h2 className="mb-4 text-xl font-bold">Thêm tài khoản mới</h2>
            <form onSubmit={handleAdd}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={newAccount.email}
                    onChange={(e) => setNewAccount({ ...newAccount, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tên người dùng</label>
                  <input
                    type="text"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={newAccount.user_name}
                    onChange={(e) => setNewAccount({ ...newAccount, user_name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mã thẻ</label>
                  <select
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={newAccount.card_id}
                    onChange={(e) => setNewAccount({ ...newAccount, card_id: e.target.value })}
                    required
                  >
                    <option value="">Chọn thẻ</option>
                    {cards.map((card) => (
                      <option key={card.id} value={card.id}>
                        {card.id}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Loại phương tiện</label>
                  <select
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={newAccount.vehicle_type}
                    onChange={(e) => setNewAccount({ ...newAccount, vehicle_type: parseInt(e.target.value) })}
                    required
                  >
                    <option value={0}>Xe máy</option>
                    <option value={1}>Ô tô</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Loại tài khoản</label>
                  <select
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={newAccount.type}
                    onChange={(e) => setNewAccount({ ...newAccount, type: parseInt(e.target.value) })}
                    required
                  >
                    <option value={0}>Người dùng</option>
                    <option value={1}>Quản lý</option>
                    <option value={2}>Quản trị viên</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Thêm mới
                </button>
              </div>
            </form>
          </div>
        </div >
      )}
    </div >
  );
};

export default Account;
