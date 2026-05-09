# Tài liệu Yêu cầu — Đăng ký Người dùng

## Giới thiệu

Tính năng đăng ký người dùng cho phép người dùng mới tự tạo tài khoản trên hệ thống Đặt Nước mà không cần admin tạo thủ công. Người dùng sẽ có thể đăng ký từ trang Login hiện tại thông qua một nút/link chuyển đến trang đăng ký, điền thông tin cần thiết và tạo tài khoản với vai trò mặc định là MEMBER.

## Thuật ngữ (Glossary)

- **Registration_Form**: Form đăng ký chứa các trường thông tin người dùng cần điền để tạo tài khoản mới
- **Auth_Service**: Service xử lý xác thực và đăng ký người dùng, giao tiếp với backend API
- **Registration_Page**: Trang giao diện cho phép người dùng nhập thông tin đăng ký
- **Validator**: Module kiểm tra tính hợp lệ của dữ liệu đầu vào trước khi gửi lên server
- **Toast_Notification**: Hệ thống thông báo hiển thị kết quả thao tác cho người dùng
- **Login_Page**: Trang đăng nhập hiện tại của hệ thống

## Yêu cầu

### Yêu cầu 1: Điều hướng đến trang đăng ký

**User Story:** Là một người dùng mới, tôi muốn có link/nút đăng ký trên trang đăng nhập, để tôi có thể dễ dàng tìm thấy và truy cập trang đăng ký.

#### Tiêu chí chấp nhận (Acceptance Criteria)

1. THE Login_Page SHALL hiển thị một link "Đăng ký" bên dưới nút đăng nhập
2. WHEN người dùng nhấn vào link "Đăng ký", THE Login_Page SHALL điều hướng đến Registration_Page tại đường dẫn `/register`
3. THE Registration_Page SHALL hiển thị một link "Đăng nhập" để quay lại Login_Page

### Yêu cầu 2: Form đăng ký

**User Story:** Là một người dùng mới, tôi muốn điền thông tin cá nhân để tạo tài khoản, để tôi có thể sử dụng hệ thống đặt nước.

#### Tiêu chí chấp nhận (Acceptance Criteria)

1. THE Registration_Form SHALL bao gồm các trường: tên đăng nhập (username), họ tên đầy đủ (fullName), mật khẩu (password), và xác nhận mật khẩu (confirmPassword)
2. THE Registration_Form SHALL đánh dấu tất cả các trường là bắt buộc
3. THE Registration_Page SHALL có giao diện nhất quán với Login_Page về style và layout

### Yêu cầu 3: Validation dữ liệu đầu vào

**User Story:** Là một người dùng mới, tôi muốn được thông báo ngay khi nhập sai thông tin, để tôi có thể sửa lỗi trước khi gửi form.

#### Tiêu chí chấp nhận (Acceptance Criteria)

1. WHEN người dùng gửi form với trường username trống, THE Validator SHALL hiển thị thông báo lỗi "Tên đăng nhập là bắt buộc"
2. WHEN người dùng gửi form với trường fullName trống, THE Validator SHALL hiển thị thông báo lỗi "Họ tên là bắt buộc"
3. WHEN người dùng gửi form với trường password trống, THE Validator SHALL hiển thị thông báo lỗi "Mật khẩu là bắt buộc"
4. WHEN người dùng nhập mật khẩu có độ dài dưới 6 ký tự, THE Validator SHALL hiển thị thông báo lỗi "Mật khẩu phải có ít nhất 6 ký tự"
5. WHEN giá trị trường confirmPassword không khớp với trường password, THE Validator SHALL hiển thị thông báo lỗi "Mật khẩu xác nhận không khớp"
6. WHEN người dùng nhập username có chứa ký tự đặc biệt hoặc khoảng trắng, THE Validator SHALL hiển thị thông báo lỗi "Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới"

### Yêu cầu 4: Gửi yêu cầu đăng ký

**User Story:** Là một người dùng mới, tôi muốn gửi thông tin đăng ký lên server, để tài khoản của tôi được tạo trong hệ thống.

#### Tiêu chí chấp nhận (Acceptance Criteria)

1. WHEN người dùng nhấn nút "Đăng ký" với dữ liệu hợp lệ, THE Auth_Service SHALL gửi request POST đến endpoint `/auth/register` với payload chứa username, fullName, và password
2. WHILE Auth_Service đang xử lý request đăng ký, THE Registration_Form SHALL vô hiệu hóa nút "Đăng ký" và hiển thị trạng thái loading
3. WHEN Auth_Service nhận phản hồi thành công từ server, THE Registration_Page SHALL hiển thị Toast_Notification thông báo "Đăng ký thành công" và điều hướng người dùng đến Login_Page
4. THE Auth_Service SHALL không gửi trường confirmPassword lên server

### Yêu cầu 5: Xử lý lỗi từ server

**User Story:** Là một người dùng mới, tôi muốn được thông báo rõ ràng khi đăng ký thất bại, để tôi biết nguyên nhân và cách khắc phục.

#### Tiêu chí chấp nhận (Acceptance Criteria)

1. IF server trả về lỗi username đã tồn tại, THEN THE Registration_Page SHALL hiển thị thông báo lỗi "Tên đăng nhập đã được sử dụng"
2. IF server trả về lỗi không xác định, THEN THE Registration_Page SHALL hiển thị thông báo lỗi "Đăng ký thất bại. Vui lòng thử lại sau"
3. IF kết nối mạng bị gián đoạn khi gửi request, THEN THE Registration_Page SHALL hiển thị thông báo lỗi "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng"
4. WHEN xảy ra lỗi đăng ký, THE Registration_Form SHALL giữ nguyên dữ liệu người dùng đã nhập (trừ trường password và confirmPassword)

### Yêu cầu 6: Bảo mật

**User Story:** Là quản trị viên hệ thống, tôi muốn đảm bảo quá trình đăng ký an toàn, để hệ thống không bị lạm dụng.

#### Tiêu chí chấp nhận (Acceptance Criteria)

1. THE Registration_Form SHALL không hiển thị mật khẩu dưới dạng plain text (sử dụng input type password)
2. THE Auth_Service SHALL gửi mật khẩu qua HTTPS và không lưu mật khẩu ở client-side ngoài state của form
3. THE Registration_Page SHALL trim khoảng trắng đầu cuối của username và fullName trước khi gửi lên server

### Yêu cầu 7: Routing và bảo vệ trang

**User Story:** Là một người dùng đã đăng nhập, tôi không cần truy cập trang đăng ký, để tránh nhầm lẫn.

#### Tiêu chí chấp nhận (Acceptance Criteria)

1. WHILE người dùng đã đăng nhập, THE Registration_Page SHALL điều hướng người dùng về trang chính tương ứng với vai trò của người dùng
2. THE App SHALL đăng ký route `/register` trong hệ thống routing với component Registration_Page
