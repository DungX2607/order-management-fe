# Water Order Management - React Frontend

React frontend cho hệ thống quản lý đặt nước.

## Setup

### 1. Cài đặt dependencies

```bash
cd frontend-react
npm install
```

### 2. Cấu hình

File `.env` đã được tạo với cấu hình mặc định:
```env
VITE_API_URL=http://localhost:8080/api
```

### 3. Chạy Development Server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: http://localhost:3000

## Cấu trúc Project

```
frontend-react/
├── src/
│   ├── api/
│   │   └── axios.js              # Axios config với JWT interceptor
│   ├── components/
│   │   ├── Header.jsx            # Header component
│   │   └── ProtectedRoute.jsx   # Route protection
│   ├── context/
│   │   └── AuthContext.jsx       # Auth state management
│   ├── pages/
│   │   ├── Login.jsx             # Login page
│   │   └── OrderPage.jsx         # Member order page
│   ├── services/
│   │   ├── authService.js        # Auth API calls
│   │   ├── orderService.js       # Order API calls
│   │   ├── menuService.js        # Menu API calls
│   │   └── cycleService.js       # Cycle API calls
│   ├── App.jsx                   # Main app with routing
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── .env                          # Environment variables
├── vite.config.js                # Vite configuration
└── package.json
```

## Tính năng đã implement

✅ Login với JWT authentication  
✅ Protected routes  
✅ Member order page:
  - Xem trạng thái chu kỳ
  - Xem menu theo danh mục
  - Đặt/sửa đơn với ghi chú
  - Disable form khi chu kỳ đóng

## TODO - Admin Pages

Cần tạo thêm các trang admin:
- [ ] Dashboard (quản lý đơn, tích nhận nước)
- [ ] Menu Management (CRUD categories & items)
- [ ] User Management (tạo thành viên mới)

## Build Production

```bash
npm run build
```

Build output sẽ ở folder `dist/`

## Deploy

### Option 1: Netlify / Vercel

```bash
# Build
npm run build

# Deploy dist/ folder
```

### Option 2: Serve từ Spring Boot

Copy nội dung `dist/` vào `src/main/resources/static/` của Spring Boot project.

## API Integration

Frontend gọi API thông qua axios instance đã được cấu hình:
- Base URL: `http://localhost:8080/api`
- JWT token tự động được thêm vào header
- Auto redirect về login khi 401

## Troubleshooting

### CORS Error
Đảm bảo Spring Boot đã cấu hình CORS cho `http://localhost:3000`

### API Connection Failed
Kiểm tra Spring Boot backend đang chạy tại port 8080

### JWT Decode Error
```bash
npm install jwt-decode
```
