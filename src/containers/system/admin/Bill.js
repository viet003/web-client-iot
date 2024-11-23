import React, { useState, useEffect } from "react";
import {
    FiEdit2,
    FiTrash2,
    FiSearch,
    FiChevronLeft,
    FiChevronRight,
    FiPlusCircle,
} from "react-icons/fi";
import { FaSort } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "../../../components";
import * as apiService from "../../../services";

const Bill = () => {
    const [bills, setBills] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
    const [filteredBills, setFilteredBills] = useState([]);
    const [paginatedBills, setPaginatedBills] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const itemsPerPage = 5;
    const [editingBill, setEditingBill] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const [newBill, setNewBill] = useState({
        id: "",
        card_id: "",
        total: 0,
        createdAt: "",
        updatedAt: "",
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const billResponse = await apiService.apiGetAllBills(); // Fetch bills from API
            if (billResponse?.status === 200 && billResponse?.data?.err === 0) {
                setBills(billResponse.data.data);
            } else {
                toast.warn("Không thể tải dữ liệu hóa đơn.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Lỗi khi tải dữ liệu hóa đơn.");
        }
        setIsLoading(false);
    };

    useEffect(() => {
        const filtered = Array.isArray(bills)
            ? bills
                .filter((bill) =>
                    bill.id.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .sort((a, b) => {
                    if (!sortConfig.key) return 0;
                    const aValue = a[sortConfig.key] || "";
                    const bValue = b[sortConfig.key] || "";
                    return sortConfig.direction === "ascending"
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
                })
            : [];

        setFilteredBills(filtered);

        const paginated = filtered.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );

        setPaginatedBills(paginated);
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    }, [bills, searchTerm, sortConfig, currentPage]);

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
        setIsLoading(true);
        // try {
        //     const response = await apiService.apiCreateBill(newBill);
        //     if (response?.status === 200 && response?.data?.err === 0) {
        //         await fetchData();
        //         setShowAddModal(false);
        //         setNewBill({
        //             id: "",
        //             card_id: "",
        //             total: 0,
        //             createdAt: "",
        //             updatedAt: "",
        //         });
        //         toast.success(response?.data?.msg);
        //     } else {
        //         toast.warn(response?.data?.msg);
        //     }
        // } catch (error) {
        //     console.error("Error creating bill:", error);
        //     toast.error("Lỗi khi thêm hóa đơn.");
        // }
        setIsLoading(false);
    };

    const handleEdit = (bill) => {
        setEditingBill(bill);
        setShowModal(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await apiService.apiUpdateBillById(editingBill);
            if (response?.status === 200 && response?.data?.err === 0) {
                await fetchData();
                setShowModal(false);
                toast.success(response?.data?.msg);
            } else {
                toast.warn(response?.data?.msg);
            }
        } catch (error) {
            console.error("Error updating bill:", error);
            toast.error("Lỗi khi cập nhật hóa đơn.");
        }
        setIsLoading(false);
    };

    const handleDelete = async (id) => {
        setIsLoading(true);
        // try {
        //     const response = await apiService.apiDeleteBillById({ id: id });
        //     if (response?.status === 200 && response?.data?.err === 0) {
        //         await fetchData();
        //         toast.success(response?.data?.msg);
        //     } else {
        //         toast.warn(response?.data?.msg);
        //     }
        // } catch (error) {
        //     console.error("Error deleting bill:", error);
        //     toast.error("Lỗi khi xóa hóa đơn.");
        // }
        setIsLoading(false);
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
                            {[
                                { label: "ID Số Dư", key: "id" },
                                { label: "Mã Thẻ", key: "card_id" },
                                { label: "Tổng Tiền", key: "total" },
                                { label: "Ngày Tạo", key: "createdAt" },
                                { label: "Ngày Cập Nhật", key: "updatedAt" },
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
                        {paginatedBills.map((bill) => (
                            <tr key={bill.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{bill.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{bill.card_id.toUpperCase()}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                    {bill.total.toLocaleString()} VND
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                    {new Date(bill.createdAt).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                    {new Date(bill.updatedAt).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 space-x-4 text-sm font-medium whitespace-nowrap">
                                    <button
                                        onClick={() => handleEdit(bill)}
                                        className="text-blue-600 hover:text-blue-900"
                                        aria-label="Edit bill"
                                    >
                                        <FiEdit2 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(bill.id)}
                                        className="text-red-600 hover:text-red-900"
                                        aria-label="Delete bill"
                                    >
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
                    Hiển thị trang {((currentPage - 1) * itemsPerPage) + 1} với {Math.min(currentPage * itemsPerPage, filteredBills.length)} / {filteredBills.length} kết quả
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
                        <h2 className="mb-4 text-xl font-bold">Sửa thông tin hóa đơn</h2>
                        <form onSubmit={handleSave}>
                            <div className="space-y-4">
                                {/* ID */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">ID Hóa Đơn</label>
                                    <input
                                        type="text"
                                        className="block w-full p-2 mt-1 bg-gray-200 border border-gray-300 rounded-md shadow-sm"
                                        value={editingBill.id}
                                        disabled
                                    />
                                </div>
                                {/* Card ID */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mã Thẻ</label>
                                    <input
                                        type="text"
                                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                                        value={editingBill.card_id.toUpperCase()}
                                        onChange={(e) =>
                                            setEditingBill({ ...editingBill, card_id: e.target.value })
                                        }
                                        required
                                        disabled={true}
                                    />
                                </div>
                                {/* Total */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tổng Tiền</label>
                                    <input
                                        type="number"
                                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                                        value={editingBill.total}
                                        onChange={(e) =>
                                            setEditingBill({ ...editingBill, total: parseInt(e.target.value, 10) })
                                        }
                                        required
                                    />
                                </div>
                                {/* CreatedAt */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Ngày Tạo</label>
                                    <input
                                        type="datetime-local"
                                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                                        value={new Date(editingBill.createdAt).toISOString().slice(0, 16)}
                                        onChange={(e) =>
                                            setEditingBill({
                                                ...editingBill,
                                                createdAt: new Date(e.target.value).toISOString(),
                                            })
                                        }
                                        required
                                        disabled={true}
                                    />
                                </div>
                                {/* UpdatedAt */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Ngày Cập Nhật</label>
                                    <input
                                        type="datetime-local"
                                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                                        value={new Date(editingBill.updatedAt).toISOString().slice(0, 16)}
                                        onChange={(e) =>
                                            setEditingBill({
                                                ...editingBill,
                                                updatedAt: new Date(e.target.value).toISOString(),
                                            })
                                        }
                                        required
                                        disabled={true}
                                    />
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

            {/* 
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
            )} */}
        </div>
    );
};

export default Bill;
