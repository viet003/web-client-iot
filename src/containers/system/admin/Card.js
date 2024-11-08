import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiSearch, FiChevronLeft, FiChevronRight, FiPlusCircle } from "react-icons/fi";
import { FaSort } from "react-icons/fa";
import * as apiService from "../../../services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getStatusColor } from "../../../ultils/color";
import { Spinner } from "../../../components";

const Card = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [filteredCards, setFilteredCards] = useState([]);
  const [paginatedCards, setPaginatedCards] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true)
  const itemsPerPage = 5;
  const [editingCard, setEditingCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newCard, setNewCard] = useState({
    id: "",
    type: 0,
    createdAt: "",
    updatedAt: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const cardResponse = await apiService.apiGetAllCards();
      if (cardResponse?.status === 200 && cardResponse?.data?.err === 0) {
        setCards(cardResponse.data.data);
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
    const filtered = Array.isArray(cards)
      ? cards
        .filter(card => card.id.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
          if (!sortConfig.key) return 0;
          const aValue = a[sortConfig.key] || "";
          const bValue = b[sortConfig.key] || "";
          return sortConfig.direction === "ascending"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        })
      : [];

    setFilteredCards(filtered);

    const paginated = filtered.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    setPaginatedCards(paginated);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  }, [cards, searchTerm, sortConfig, currentPage]);


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
      const response = await apiService.apiCreateCard(newCard);
      if (response?.status === 200 && response?.data?.err === 0) {
        await fetchData();
        setShowAddModal(false);
        setNewCard({
          id: "",
          type: 0,
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

  const handleEdit = (card) => {
    setEditingCard(card);
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await apiService.apiUpdateCardById(editingCard);
      if (response?.status === 200 && response?.data?.err === 0) {
        await fetchData();
        setShowModal(false);
        toast.success(response?.data?.msg);
      } else {
        toast.warn(response?.data?.msg);
      }
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Lỗi khi cập nhật thông tin.");
    }
    setIsLoading(false)
  };

  const handleDelete = async (id) => {
    setIsLoading(true)
    try {
      const response = await apiService.apiDeleteCardById({ id: id });
      if (response?.status === 200 && response?.data?.err === 0) {
        await fetchData();
        setShowModal(false);
        toast.success(response?.data?.msg);
      } else {
        toast.warn(response?.data?.msg);
      }
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Lỗi khi xóa thông tin.");
    }
    setIsLoading(false)
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
            placeholder="Tìm kiếm theo ID..."
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
              {[{ label: "MÃ thẻ", key: "id" }, { label: "Loại Thẻ", key: "type" }, { label: "Ngày tạo", key: "createdAt" }, { label: "Ngày cập nhật", key: "updatedAt" }]
                .map(({ label, key }) => (
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
            {paginatedCards.map((card) => (
              <tr key={card.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{card.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(card.type)}`}>
                    {card.type === 0 ? "Thẻ tháng" : "Thẻ lượt"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{new Date(card.createdAt).toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{new Date(card.updatedAt).toLocaleString()}</td>
                <td className="px-6 py-4 space-x-4 text-sm font-medium whitespace-nowrap">
                  <button onClick={() => handleEdit(card)} className="text-blue-600 hover:text-blue-900" aria-label="Edit card">
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(card.id)} className="text-red-600 hover:text-red-900" aria-label="Delete card">
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
          Hiển thị trang {((currentPage - 1) * itemsPerPage) + 1} với {Math.min(currentPage * itemsPerPage, filteredCards.length)} / {filteredCards.length} kết quả
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
            <h2 className="mb-4 text-xl font-bold">Sửa thông tin thẻ</h2>
            <form onSubmit={handleSave}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mã thẻ</label>
                  <input
                    type="text"
                    className="block w-full p-2 mt-1 bg-gray-200 border border-gray-300 rounded-md shadow-sm"
                    value={editingCard.id}
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Loại</label>
                  <select
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={editingCard.type}
                    onChange={(e) => setEditingCard({ ...editingCard, type: parseInt(e.target.value) })}
                  >
                    <option value={0}>Thẻ tháng</option>
                    <option value={1}>Thẻ lượt</option>
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

      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg w-96">
            <h2 className="mb-4 text-xl font-bold">Thêm thẻ mới</h2>
            <form onSubmit={handleAdd}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mã thẻ</label>
                  <input
                    type="text"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={newCard.id}
                    onChange={(e) => setNewCard({ ...newCard, id: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Loại thẻ</label>
                  <select
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                    value={newCard.type}
                    onChange={(e) => setNewCard({ ...newCard, type: parseInt(e.target.value) })}
                    required
                  >
                    <option value={0}>Thẻ tháng</option>
                    <option value={1}>Thẻ lượt</option>
                  </select>
                </div>
                {/* createdAt and updatedAt are set automatically */}
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
        </div>
      )}

    </div>
  );
};

export default Card;
