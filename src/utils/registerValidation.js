/**
 * Validate form đăng ký người dùng.
 * Pure function — nhận form data, trả về object errors.
 *
 * @param {{ username: string, fullName: string, password: string, confirmPassword: string }} formData
 * @returns {Object} errors — object chứa thông báo lỗi cho từng trường không hợp lệ, hoặc {} nếu tất cả hợp lệ
 */
export function validateForm({ username, fullName, password, confirmPassword }) {
  const errors = {};

  // Username: bắt buộc, chỉ chứa chữ cái, số, dấu gạch dưới
  if (!username.trim()) {
    errors.username = 'Tên đăng nhập là bắt buộc';
  } else if (!/^[a-zA-Z0-9_]+$/.test(username.trim())) {
    errors.username = 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới';
  }

  // FullName: bắt buộc
  if (!fullName.trim()) {
    errors.fullName = 'Họ tên là bắt buộc';
  }

  // Password: bắt buộc, tối thiểu 6 ký tự
  if (!password) {
    errors.password = 'Mật khẩu là bắt buộc';
  } else if (password.length < 6) {
    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
  }

  // ConfirmPassword: phải khớp với password (chỉ kiểm tra khi password hợp lệ)
  if (password && password.length >= 6 && confirmPassword !== password) {
    errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
  }

  return errors;
}

/**
 * Phân loại lỗi server thành thông báo tiếng Việt.
 * Pure function — nhận error object từ axios, trả về chuỗi thông báo lỗi.
 *
 * @param {Object} error — error object từ axios (có thể có hoặc không có .response)
 * @returns {string} thông báo lỗi tiếng Việt
 */
export function getServerErrorMessage(error) {
  if (!error.response) {
    return 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng';
  }
  if (error.response.status === 409) {
    return 'Tên đăng nhập đã được sử dụng';
  }
  return 'Đăng ký thất bại. Vui lòng thử lại sau';
}
