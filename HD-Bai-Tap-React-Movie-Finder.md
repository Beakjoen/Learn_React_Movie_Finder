# 📋 BÀI TẬP THỰC HÀNH: XÂY DỰNG ỨNG DỤNG TÌM KIẾM PHIM (REACT MOVIE FINDER)

> **Mục tiêu:** Áp dụng các kiến thức React cơ bản và nâng cao (Component, Props, State, `useEffect`, Fetching API, Event Handling, Conditional Rendering) để hoàn thiện một ứng dụng tìm kiếm phim tương tác thực tế.

---

## 🎯 1. YÊU CẦU TÍNH NĂNG (REQUIREMENTS)

### Tính năng cốt lõi (Core Features)
1. **Trang chủ / Danh sách mặc định:** Hiển thị danh sách các bộ phim đang hot hoặc mới nhất khi người dùng mới truy cập trang web.
2. **Thanh tìm kiếm (Search Bar):** Cho phép người dùng gõ từ khóa tên phim và bấm "Tìm kiếm" hoặc nhấn "Enter".
3. **Hiển thị thẻ phim (Movie Card):** Mỗi bộ phim hiển thị tối thiểu các thông tin:
   - Ảnh Poster
   - Tên phim (Title)
   - Năm phát hành (Release Year)
   - Điểm đánh giá (Rating)
4. **Trạng thái giao diện (UX States):**
   - **Loading State:** Hiển thị hiệu ứng tải (Spinner/Skeleton) khi đang chờ dữ liệu từ API.
   - **Error State:** Hiển thị thông báo lỗi thân thiện nếu không tìm thấy phim hoặc API bị lỗi mạng.
   - **Empty State:** Hiển thị thông báo phù hợp khi danh sách phim trống.
5. **Xem chi tiết phim (Movie Detail):** Khi nhấp vào một thẻ phim, hiển thị thông tin chi tiết (Modal hoặc phần xem chi tiết) gồm: Tóm tắt nội dung (Overview), Thể loại (Genres), Thời lượng, Diễn viên chính,...

---

## 🗺️ 2. LỘ TRÌNH THỰC HIỆN CÁC BƯỚC (STEP-BY-STEP)

### Bước 1: Khởi tạo & Cấu trúc thư mục dự án
1. Khởi tạo dự án React mới bằng Vite với tên thư mục chuẩn: `react-movie-finder`.
2. Làm sạch dự án: Xóa các file ví dụ không cần thiết (`App.css` mặc định, logo thừa).
3. Tổ chức cấu trúc cây thư mục gợi ý:
   ```text
   src/
   ├── assets/          # Chứa hình ảnh, icon tĩnh
   ├── components/      # Chứa các React Components tái sử dụng
   │   ├── Header.jsx
   │   ├── SearchBar.jsx
   │   ├── MovieList.jsx
   │   ├── MovieCard.jsx
   │   ├── MovieModal.jsx
   │   ├── Loading.jsx
   │   └── ErrorMessage.jsx
   ├── services/        # Chứa logic gọi API
   │   └── api.js
   ├── App.jsx
   └── main.jsx
   ```

### Bước 2: Đăng ký API Key & Cấu hình môi trường
1. Đăng ký tài khoản miễn phí tại **TMDB (The Movie Database)** hoặc **OMDb API**.
2. Lấy **API Key** cá nhân.
3. Tạo file `.env.local` ở thư mục gốc của dự án để bảo mật API Key (không commit file này lên GitHub).
   > *💡 Gợi ý cú pháp lưu biến môi trường trong Vite:* `VITE_TMDB_API_KEY=your_api_key_here`

### Bước 3: Thiết kế Luồng Dữ Liệu & Xác Định Các State Cần Thiết
Trước khi viết mã, hãy phác thảo các State cần quản lý ở component cha (`App.jsx`):
- State lưu danh sách phim thu thập được.
- State lưu từ khóa tìm kiếm người dùng nhập.
- State theo dõi trạng thái tải dữ liệu (True/False).
- State lưu thông báo lỗi (nếu có).
- State lưu thông tin phim đang được chọn xem chi tiết.

### Bước 4: Xây dựng Module Gọi API (`services/api.js`)
Viết các hàm riêng biệt phụ trách việc tương tác với server:
- Hàm 1: Lấy danh sách phim xu hướng (Trending/Popular).
- Hàm 2: Tìm kiếm phim theo từ khóa.
- Hàm 3: Lấy chi tiết của một bộ phim theo ID.

### Bước 5: Lắp ráp Giao diện & Xử lý Sự kiện
1. Xây dựng component `SearchBar`: Bắt sự kiện khi người dùng gõ phím và khi nhấn gửi form.
2. Sử dụng `useEffect` trong `App.jsx` để tự động gọi API lấy danh sách phim phổ biến khi trang web tải lần đầu.
3. Truyền dữ liệu từ `App` xuống `MovieList` và `MovieCard` thông qua `props`.
4. Render danh sách phim bằng phương thức lặp mảng thích hợp.
5. Bắt sự kiện Click trên `MovieCard` để mở Modal chi tiết.

### Bước 6: Tối Ưu Giao Diện (Styling)
- Sử dụng CSS thuần, CSS Modules, Styled Components hoặc Tailwind CSS.
- Đảm bảo giao diện phản hồi tốt trên màn hình thiết bị di động (Responsive Layout - Grid/Flexbox).

---

## 💡 3. GỢI Ý KĨ THUẬT (TECHNICAL HINTS)

### 📌 Khung logic chung cho việc gọi API (Pseudocode Concept)
```text
Khi gọi API:
  1. Đặt trạng thái Loading = true
  2. Đặt trạng thái Error = null
  3. Thử (try) thực hiện gọi API:
     - Nếu thành công -> Cập nhật State danh sách phim = Dữ liệu nhận được
     - Nếu thất bại -> Cập nhật State Error = Thông báo lỗi
  4. Cuối cùng (finally):
     - Đặt trạng thái Loading = false
```

### 📌 Đề xuất các React Hooks nên dùng:
- **`useState`**: Quản lý các trạng thái tĩnh/động của giao diện (`movies`, `searchTerm`, `isLoading`, `error`, `selectedMovie`).
- **`useEffect`**: Lắng nghe sự thay đổi của trang hoặc từ khóa để kích hoạt hàm fetch API.

### 📌 Mẹo tránh gọi API quá nhiều lần (Debounce - Nâng cao):
- Nếu bạn muốn ứng dụng tự tìm kiếm ngay khi đang gõ mà không cần nhấn nút Enter, hãy tìm hiểu khái niệm **Debounce** hoặc hook `useDebounce`.

---

## 🚀 4. THỬ THÁCH NÂNG CAO (BONUS CHALLENGES)

Sau khi hoàn thiện các tính năng cơ bản, bạn có thể tiếp tục mở rộng dự án:

1. **Yêu thích (Favorites List):** Cho phép người dùng thả tim lưu phim vào danh sách yêu thích. Sử dụng `localStorage` để dữ liệu không bị mất khi F5 lại trang.
2. **Phân trang (Pagination):** Thêm nút "Trang tiếp / Trang trước" hoặc tính năng "Tải thêm" (Load More) để xem nhiều danh sách phim hơn từ API.
3. **Lọc theo Thể loại (Genre Filter):** Thêm các thẻ / Dropdown chọn thể loại (Hành động, Hài, Kinh dị,...) để lọc phim.
4. **Chế độ Tối/Sáng (Dark/Light Mode):** Cho phép chuyển đổi giao diện nền tối/sáng.

---
