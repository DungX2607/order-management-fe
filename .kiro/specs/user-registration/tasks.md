# Kế hoạch Triển khai: Đăng ký Người dùng

## Tổng quan

Triển khai tính năng đăng ký người dùng **frontend-only**. Backend endpoint `POST /api/auth/register` đã tồn tại. Phạm vi bao gồm: thêm hàm `register` vào `authService.js`, tạo trang `Register.jsx` với form validation, cập nhật routing và điều hướng giữa Login/Register. Cài đặt test framework (vitest, @testing-library/react, fast-check) để hỗ trợ unit test và property-based test.

## Tasks

- [x] 1. Cài đặt test framework và cấu hình
  - Cài đặt `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, và `fast-check` làm devDependencies
  - Thêm cấu hình `test` vào `vite.config.js` với `environment: 'jsdom'` và `globals: true`
  - Thêm script `"test": "vitest --run"` vào `package.json`
  - Tạo file `src/setupTests.js` import `@testing-library/jest-dom`
  - _Requirements: Chiến lược Testing trong design.md_

- [x] 2. Tạo pure functions validation và service layer
  - [x] 2.1 Tạo file `src/utils/registerValidation.js` chứa hàm `validateForm` và `getServerErrorMessage`
    - `validateForm({ username, fullName, password, confirmPassword })` — pure function trả về object errors
    - `getServerErrorMessage(error)` — pure function phân loại lỗi server thành thông báo tiếng Việt
    - Cả hai hàm được export riêng để dễ test
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 5.1, 5.2, 5.3_

  - [x] 2.2 Thêm hàm `register` vào `src/services/authService.js`
    - Thêm method `register: async (username, fullName, password) => { ... }` vào object `authService`
    - Gọi `axios.post('/auth/register', { username, fullName, password })` — KHÔNG gửi `confirmPassword`
    - Tuân theo pattern giống hàm `login` hiện tại
    - _Requirements: 4.1, 4.4_

  - [ ]* 2.3 Viết property test cho `validateForm` — Property 1: Trường bắt buộc trống phải bị reject
    - **Property 1: Trường bắt buộc trống phải bị reject**
    - Dùng `fast-check` generate chuỗi rỗng hoặc chỉ chứa khoảng trắng cho username/fullName/password
    - Kiểm tra `validateForm` trả về lỗi tương ứng cho trường đó
    - **Validates: Requirements 3.1, 3.2, 3.3**

  - [ ]* 2.4 Viết property test cho `validateForm` — Property 2: Mật khẩu ngắn hơn 6 ký tự phải bị reject
    - **Property 2: Mật khẩu ngắn hơn 6 ký tự phải bị reject**
    - Dùng `fast-check` generate chuỗi password không rỗng có độ dài 1-5
    - Kiểm tra `validateForm` trả về lỗi "Mật khẩu phải có ít nhất 6 ký tự"
    - **Validates: Requirements 3.4**

  - [ ]* 2.5 Viết property test cho `validateForm` — Property 3: Mật khẩu xác nhận không khớp phải bị reject
    - **Property 3: Mật khẩu xác nhận không khớp phải bị reject**
    - Dùng `fast-check` generate cặp (password, confirmPassword) trong đó password hợp lệ (≥ 6 ký tự) và confirmPassword ≠ password
    - Kiểm tra `validateForm` trả về lỗi "Mật khẩu xác nhận không khớp"
    - **Validates: Requirements 3.5**

  - [ ]* 2.6 Viết property test cho `validateForm` — Property 4: Username chứa ký tự không hợp lệ phải bị reject
    - **Property 4: Username chứa ký tự không hợp lệ phải bị reject**
    - Dùng `fast-check` generate chuỗi username không rỗng chứa ít nhất một ký tự ngoài `[a-zA-Z0-9_]`
    - Kiểm tra `validateForm` trả về lỗi "Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới"
    - **Validates: Requirements 3.6**

  - [ ]* 2.7 Viết property test cho `validateForm` — Property 5: Form hợp lệ phải pass validation
    - **Property 5: Form hợp lệ phải pass validation**
    - Dùng `fast-check` generate form data hợp lệ: username chỉ chứa `[a-zA-Z0-9_]`, fullName không rỗng, password ≥ 6 ký tự, confirmPassword === password
    - Kiểm tra `validateForm` trả về object errors rỗng (`Object.keys(errors).length === 0`)
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6**

  - [ ]* 2.8 Viết property test cho `getServerErrorMessage` — Property 6: Phân loại lỗi server chính xác
    - **Property 6: Phân loại lỗi server chính xác**
    - Dùng `fast-check` generate error objects với 3 trường hợp: không có `response`, status 409, status code khác
    - Kiểm tra `getServerErrorMessage` trả về đúng thông báo tương ứng
    - **Validates: Requirements 5.1, 5.2, 5.3**

- [x] 3. Checkpoint — Đảm bảo validation logic hoạt động đúng
  - Đảm bảo tất cả tests pass, hỏi người dùng nếu có thắc mắc.

- [x] 4. Tạo trang Register và tích hợp
  - [x] 4.1 Tạo component `src/pages/Register.jsx`
    - Tạo form đăng ký với 4 trường: username, fullName, password, confirmPassword
    - Sử dụng inline styles nhất quán với `Login.jsx` (container, loginBox/registerBox, title)
    - Sử dụng CSS classes từ `index.css` (`form-group`, `btn`, `btn-press`, `hover-lift`, `scale-in`, `error`)
    - State management: `username`, `fullName`, `password`, `confirmPassword`, `errors`, `serverError`, `loading`
    - Import và sử dụng `validateForm` từ `src/utils/registerValidation.js` khi submit
    - Import và sử dụng `getServerErrorMessage` để xử lý lỗi server
    - Hiển thị lỗi validation inline dưới từng trường (text đỏ)
    - Hiển thị lỗi server phía trên nút submit
    - Trim `username` và `fullName` trước khi gửi request
    - Gọi `authService.register(username.trim(), fullName.trim(), password)` khi validation pass
    - Khi thành công: hiển thị toast "Đăng ký thành công" qua `useToastContext()` và redirect đến `/login`
    - Khi lỗi server: giữ nguyên username/fullName, xóa password/confirmPassword
    - Loading state: disable nút submit và hiển thị "Đang đăng ký..." khi đang xử lý
    - Tất cả input password sử dụng `type="password"`
    - Thêm link "Đã có tài khoản? Đăng nhập" dưới nút đăng ký, dùng `<Link to="/login">`
    - _Requirements: 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.3, 5.4, 6.1, 6.2, 6.3_

  - [x] 4.2 Thêm bảo vệ trang Register cho người dùng đã đăng nhập
    - Import `useAuth` từ `AuthContext` và `useNavigate`, `useEffect` từ React/React Router
    - Kiểm tra `user` từ `useAuth()`: nếu đã đăng nhập, redirect theo role (ADMIN → `/admin/dashboard`, khác → `/member/order`)
    - Sử dụng `useEffect` với dependency `[user, navigate]`
    - _Requirements: 7.1_

  - [ ]* 4.3 Viết unit tests cho component `Register.jsx`
    - Test render đủ 4 trường input (username, fullName, password, confirmPassword)
    - Test các trường có thuộc tính required
    - Test input password và confirmPassword có `type="password"`
    - Test hiển thị link "Đăng nhập" trên trang Register
    - Test loading state: nút disabled và hiển thị "Đang đăng ký..." khi submit
    - Test success flow: toast thành công + redirect đến `/login`
    - Test payload không chứa confirmPassword
    - Test error 409 hiển thị "Tên đăng nhập đã được sử dụng"
    - Test network error hiển thị thông báo lỗi mạng
    - Test giữ form data sau lỗi: username/fullName giữ nguyên, password/confirmPassword bị xóa
    - _Requirements: 2.1, 2.2, 4.2, 4.3, 4.4, 5.1, 5.3, 5.4, 6.1_

- [x] 5. Cập nhật routing và điều hướng
  - [x] 5.1 Cập nhật `src/App.jsx` — thêm route `/register`
    - Import component `Register` từ `src/pages/Register.jsx`
    - Thêm `<Route path="/register" element={<PageTransition><Register /></PageTransition>} />` cạnh route `/login`
    - _Requirements: 7.2_

  - [x] 5.2 Cập nhật `src/pages/Login.jsx` — thêm link "Đăng ký"
    - Import `Link` từ `react-router-dom`
    - Thêm `<p>` chứa link "Chưa có tài khoản? Đăng ký" bên dưới nút đăng nhập
    - Style nhất quán với layout hiện tại
    - _Requirements: 1.1, 1.2_

  - [ ]* 5.3 Viết unit test kiểm tra link điều hướng giữa Login và Register
    - Test trang Login có link "Đăng ký" trỏ đến `/register`
    - Test trang Register có link "Đăng nhập" trỏ đến `/login`
    - _Requirements: 1.1, 1.2, 1.3_

- [ ] 6. Tích hợp Property 7 — Trim whitespace
  - [ ]* 6.1 Viết property test cho trim whitespace — Property 7
    - **Property 7: Trim khoảng trắng đầu cuối trước khi gửi**
    - Dùng `fast-check` generate chuỗi username và fullName có khoảng trắng đầu/cuối
    - Mock `authService.register` và kiểm tra payload nhận được đã được trim
    - Kiểm tra `payload.username === input.username.trim()` và `payload.fullName === input.fullName.trim()`
    - **Validates: Requirements 6.3**

- [x] 7. Checkpoint cuối — Đảm bảo tất cả tests pass
  - Đảm bảo tất cả tests pass, hỏi người dùng nếu có thắc mắc.

## Ghi chú

- Các task đánh dấu `*` là tùy chọn và có thể bỏ qua để triển khai MVP nhanh hơn
- Mỗi task tham chiếu đến requirements cụ thể để đảm bảo truy xuất nguồn gốc
- Checkpoint giúp kiểm tra tiến độ tại các mốc quan trọng
- Property tests kiểm tra tính đúng đắn phổ quát (universal correctness) với nhiều input ngẫu nhiên
- Unit tests kiểm tra các ví dụ cụ thể và edge cases
- Backend endpoint đã tồn tại — KHÔNG cần thay đổi backend
- Axios baseURL là `http://localhost:8080/api`, nên frontend gọi `/auth/register`
