/**
 * Toast Notification System - Usage Examples
 * 
 * This file demonstrates how to use the toast notification system
 * in various scenarios throughout the application.
 */

import { useToastContext } from '../context/ToastContext';

// ============================================
// Example 1: Basic Success/Error Notifications
// ============================================

function BasicExample() {
  const { showToast } = useToastContext();

  const handleSuccess = () => {
    showToast('Thao tác thành công!', 'success');
  };

  const handleError = () => {
    showToast('Có lỗi xảy ra!', 'error');
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
    </div>
  );
}

// ============================================
// Example 2: Form Submission with Toast
// ============================================

function FormExample() {
  const { showToast } = useToastContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showToast('Form submitted successfully!', 'success');
    } catch (error) {
      showToast('Failed to submit form. Please try again.', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter data" />
      <button type="submit">Submit</button>
    </form>
  );
}

// ============================================
// Example 3: API Call with Toast Feedback
// ============================================

function ApiExample() {
  const { showToast } = useToastContext();

  const createOrder = async () => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [] }),
      });

      if (!response.ok) throw new Error('API Error');

      showToast('Đơn hàng đã được tạo thành công!', 'success');
    } catch (error) {
      showToast('Không thể tạo đơn hàng. Vui lòng thử lại.', 'error');
    }
  };

  return <button onClick={createOrder}>Tạo đơn hàng</button>;
}

// ============================================
// Example 4: Multiple Operations
// ============================================

function BulkOperationExample() {
  const { showToast } = useToastContext();

  const handleBulkDelete = async (items) => {
    let successCount = 0;
    let errorCount = 0;

    for (const item of items) {
      try {
        await deleteItem(item.id);
        successCount++;
      } catch (error) {
        errorCount++;
      }
    }

    if (successCount > 0) {
      showToast(`Đã xóa ${successCount} mục thành công`, 'success');
    }
    if (errorCount > 0) {
      showToast(`${errorCount} mục xóa thất bại`, 'error');
    }
  };

  return <button onClick={() => handleBulkDelete([])}>Xóa hàng loạt</button>;
}

// ============================================
// Example 5: Login/Logout with Toast
// ============================================

function AuthExample() {
  const { showToast } = useToastContext();

  const handleLogin = async (username, password) => {
    try {
      const response = await authService.login(username, password);
      showToast('Đăng nhập thành công!', 'success');
      // Redirect user
    } catch (error) {
      showToast('Đăng nhập thất bại. Vui lòng kiểm tra lại.', 'error');
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      showToast('Đã đăng xuất thành công', 'success');
    } catch (error) {
      showToast('Có lỗi khi đăng xuất', 'error');
    }
  };

  return (
    <div>
      <button onClick={() => handleLogin('user', 'pass')}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

// ============================================
// Example 6: Data Update with Toast
// ============================================

function UpdateExample() {
  const { showToast } = useToastContext();

  const handleUpdate = async (id, data) => {
    try {
      await updateService.update(id, data);
      showToast('Cập nhật thành công!', 'success');
    } catch (error) {
      if (error.response?.status === 404) {
        showToast('Không tìm thấy dữ liệu', 'error');
      } else if (error.response?.status === 403) {
        showToast('Bạn không có quyền cập nhật', 'error');
      } else {
        showToast('Cập nhật thất bại. Vui lòng thử lại.', 'error');
      }
    }
  };

  return <button onClick={() => handleUpdate(1, {})}>Update</button>;
}

// ============================================
// Example 7: File Upload with Toast
// ============================================

function FileUploadExample() {
  const { showToast } = useToastContext();

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      showToast('File uploaded successfully!', 'success');
    } catch (error) {
      showToast('Failed to upload file. Please try again.', 'error');
    }
  };

  return (
    <input
      type="file"
      onChange={(e) => handleFileUpload(e.target.files[0])}
    />
  );
}

// ============================================
// Example 8: Validation with Toast
// ============================================

function ValidationExample() {
  const { showToast } = useToastContext();

  const handleValidation = (formData) => {
    if (!formData.email) {
      showToast('Email is required', 'error');
      return false;
    }

    if (!formData.email.includes('@')) {
      showToast('Invalid email format', 'error');
      return false;
    }

    if (formData.password.length < 8) {
      showToast('Password must be at least 8 characters', 'error');
      return false;
    }

    showToast('Validation passed!', 'success');
    return true;
  };

  return (
    <button onClick={() => handleValidation({ email: '', password: '' })}>
      Validate
    </button>
  );
}

// ============================================
// Example 9: Copy to Clipboard with Toast
// ============================================

function ClipboardExample() {
  const { showToast } = useToastContext();

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast('Copied to clipboard!', 'success');
    } catch (error) {
      showToast('Failed to copy', 'error');
    }
  };

  return <button onClick={() => handleCopy('Hello World')}>Copy Text</button>;
}

// ============================================
// Example 10: Network Status with Toast
// ============================================

function NetworkExample() {
  const { showToast } = useToastContext();

  const checkConnection = () => {
    if (navigator.onLine) {
      showToast('You are online', 'success');
    } else {
      showToast('You are offline', 'error');
    }
  };

  return <button onClick={checkConnection}>Check Connection</button>;
}

// Export all examples
export {
  BasicExample,
  FormExample,
  ApiExample,
  BulkOperationExample,
  AuthExample,
  UpdateExample,
  FileUploadExample,
  ValidationExample,
  ClipboardExample,
  NetworkExample,
};
