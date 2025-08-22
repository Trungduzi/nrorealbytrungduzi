# NROReal - Backend

Dự án backend được xây dựng bằng --Node.js-- để quản lý API cho ứng dụng.  
Hỗ trợ các tính năng như: quản lý người dùng, mua thẻ, nạp thẻ và lưu trữ dữ liệu với MySQL.

---

## Công nghệ sử dụng
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) – Server & API
- [MySQL](https://www.mysql.com/) – Cơ sở dữ liệu
- [Sequelize](https://sequelize.org/) – ORM quản lý DB
- [Railway](https://railway.app/) – Deploy backend & database
- [Vercel](https://vercel.com/) – Deploy frontend (link GitHub được gửi riêng trong CV)

---

## ⚙️ Cài đặt

### 1. Clone repo
```bash
--1. Tạo git clone bằng dòng lệnh: git clone https://github.com/trungduzi/nrorealbytrungduzi
     Chuyển sang nrorealbytrungduzi: cd nrorealbytrungduzi

--2. Cài dependencies lệnh: npm install

--3. Cấu hình môi trường .env trong file .env của repo(tham khảo từ file .env.example)
--4. Chạy chương tình dúng lệnh: npm run start (server mặc định chạy tại: http://localhost:8080

Cấu trúc thư mục:
├── src
│   ├── models/        # Sequelize models (bảng DB)
│   ├── controllers/   # Xử lý logic API
│   ├── routes/        # Định nghĩa API endpoints
│   ├── config/        # Cấu hình DB, env
│   └── server.js      # File chạy chính
├── .env.example       # File mẫu biến môi trường
├── package.json       # Config npm
├── .gitignore         # Ẩn file khi up lên gitignore
└── README.md
## 👨‍💻 Tác giả
- Tên: Vũ Đăng Trung
- Email: vudangtrung2k5@gmail.com
- GitHub: [trungduzi](https://github.com/trungduzi)
