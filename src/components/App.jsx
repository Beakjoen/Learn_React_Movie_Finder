import React, { useState } from "react";



/* 
Phác thảo các state cần quản lý
- State lưu danh sách phim thu thập được.
- State lưu từ khóa tìm kiếm người dùng nhập.
- State theo dõi trạng thái tải dữ liệu (True/False).
- State lưu thông báo lỗi (nếu có).
- State lưu thông tin phim đang được chọn xem chi tiết.
*/

function MovieApp() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
}

