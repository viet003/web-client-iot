import { useState } from "react";
import { FaSort, FaSortUp, FaSortDown, FaSearch } from "react-icons/fa";

const Sectiontable = ({ isOpen, setIsOpen }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchTerm, setSearchTerm] = useState("");

  const transactions = [
    {
      id: 1,
      date: "2024-01-15",
      category: "Groceries",
      amount: 150.75,
      remarks: "Monthly grocery shopping"
    },
    {
      id: 2,
      date: "2024-01-14",
      category: "Utilities",
      amount: 85.99,
      remarks: "Electricity bill"
    },
    {
      id: 3,
      date: "2024-01-13",
      category: "Entertainment",
      amount: 45.50,
      remarks: "Movie tickets"
    },
    {
      id: 4,
      date: "2024-01-12",
      category: "Transportation",
      amount: 30.00,
      remarks: "Bus fare"
    },
    {
      id: 5,
      date: "2024-01-11",
      category: "Food",
      amount: 25.99,
      remarks: "Lunch"
    },
    {
      id: 6,
      date: "2024-01-10",
      category: "Shopping",
      amount: 199.99,
      remarks: "New clothes"
    },
    {
      id: 7,
      date: "2024-01-09",
      category: "Healthcare",
      amount: 75.00,
      remarks: "Medicine"
    },
    {
      id: 8,
      date: "2024-01-08",
      category: "Education",
      amount: 299.99,
      remarks: "Online course"
    },
    {
      id: 9,
      date: "2024-01-07",
      category: "Utilities",
      amount: 65.50,
      remarks: "Internet bill"
    },
    {
      id: 10,
      date: "2024-01-06",
      category: "Groceries",
      amount: 120.25,
      remarks: "Weekly groceries"
    }
  ];

  const itemsPerPage = 6;

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig.key) return transactions;

    return [...transactions].sort((a, b) => {
      if (sortConfig.key === "amount") {
        return sortConfig.direction === "ascending"
          ? a[sortConfig.key] - b[sortConfig.key]
          : b[sortConfig.key] - a[sortConfig.key];
      }
      return sortConfig.direction === "ascending"
        ? a[sortConfig.key].localeCompare(b[sortConfig.key])
        : b[sortConfig.key].localeCompare(a[sortConfig.key]);
    });
  };

  const filteredData = getSortedData().filter((transaction) => {
    return (
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.remarks.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm) ||
      transaction.date.includes(searchTerm)
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) {
      return <FaSort className="inline ml-1" />;
    }
    return sortConfig.direction === "ascending" ? (
      <FaSortUp className="inline ml-1" />
    ) : (
      <FaSortDown className="inline ml-1" />
    );
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
                Lịch sử quẹt thẻ
              </h1>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Tìm kiếm theo mã ..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <label class="inline-flex items-center cursor-pointer">
                <span class="ms-3 text-sm font-medium text-gray-700 pr-3">Trạng thái</span>
                <input
                  type="checkbox"
                  checked={isOpen}
                  onChange={() => setIsOpen(prev => !prev)}
                  className="sr-only peer"
                />
                <div class="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("date")}
                    >
                      Date {getSortIcon("date")}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("category")}
                    >
                      Category {getSortIcon("category")}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("amount")}
                    >
                      Amount {getSortIcon("amount")}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("remarks")}
                    >
                      Remarks {getSortIcon("remarks")}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getCurrentPageData().map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                          {transaction.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        ${transaction.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {transaction.remarks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Hiển thị {Math.min(filteredData.length, itemsPerPage)} / {filteredData.length} trường dữ liệu
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Trước
                </button>
                <span className="text-sm text-gray-600">
                  Trang {currentPage} / {totalPages}
                </span>
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Tiếp theo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sectiontable;
