# Hướng dẫn phát triển (Development)

## Điều kiện tiên quyết

Cài đặt các công cụ sau:

- [Docker Engine](https://docs.docker.com/engine/) hoặc [Podman](https://podman.io/docs/installation).
- [VS Code](https://code.visualstudio.com/)
- [VS Code Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- [just](https://github.com/casey/just) (task runner)

## Thiết lập

1. Sao chép tệp mẫu môi trường:

    ```bash
    cp .biolak.example.env .env
    ```

2. Cập nhật tệp `.env`:
    - Tạo các chuỗi bí mật (secrets) bằng `openssl rand -base64 32` cho `PAYLOAD_SECRET`, `CRON_SECRET`, và `PREVIEW_SECRET`.
    - Đặt `DATABASE_URI=file:/workspaces/biolak/data.sqlite3`.

3. Mở Command Palette (F1 hoặc Ctrl+Shift+P) và chọn: "Dev Containers: Reopen in Container".

4. (Tùy chọn) Để sử dụng dữ liệu từ production:
    - Đầu tiên, hoàn thành bước 3 để vào dev container.
    - Để lấy tệp cơ sở dữ liệu sạch:
        - Cách A: Dừng máy chủ production để đảm bảo mọi thay đổi được ghi đầy đủ vào tệp cơ sở dữ liệu, sau đó sao chép tệp `data.sqlite3`.
        - Cách B (Khuyên dùng): Sao chép từ bản sao lưu (backup) mới nhất trên máy chủ production (xem [Hướng dẫn triển khai](./deployment.vi.md) để biết cách tạo bản sao lưu).
    - Đặt tệp `data.sqlite3` vào `/workspaces/biolak/data.sqlite3` (bạn có thể thực hiện việc này từ máy host hoặc bên trong container vì workspace đã được mount).

## Các lệnh hữu ích

Các lệnh này được thực hiện thông qua `just` (hoặc bí danh `j` bên trong dev container):

- `j dev`: Khởi động máy chủ phát triển (development server) với chế độ Turbo.
- `j build`: Chạy thử bản build của ứng dụng.
- `j lint`: Chạy ESLint và Prettier để kiểm tra và định dạng mã nguồn.
- `j gen-types`: Tạo các kiểu dữ liệu (types) của Payload dựa trên schema.
- `j db-create-migrate`: Tạo bản migration cơ sở dữ liệu mới và tối ưu hóa nó.
- `just docker-image-build`: Xây dựng Docker image tại máy cục bộ (chạy lệnh này bên ngoài dev container).

## Xử lý xung đột Drizzle

Nếu bạn không thể tương tác với trình giải quyết xung đột DB (conflicts resolver) trong terminal:

1. Nhấn `Ctrl+C`, sau đó chạy `j dev` để khởi động lại.
2. Truy cập `http://localhost:3000` (kích hoạt lần nạp schema đầu tiên).
3. Truy cập `http://localhost:3000/admin` (kích hoạt lần nạp schema thứ hai). Bây giờ bạn đã có thể tương tác với trình giải quyết xung đột.

## Đa ngôn ngữ

- Admin/tài liệu: Tài liệu đa ngôn ngữ của Payload — https://payloadcms.com/docs/configuration/localization
- Frontend:
    - Sử dụng `utilities/lang.ts` cho enum `Lang`.
    - Sử dụng `setLocale()` để thay đổi ngôn ngữ phía client.
    - Sử dụng `getClientLang()` để nhận diện ngôn ngữ phía server.

## Mẹo nhỏ

- Sau khi tạo tài khoản admin đầu tiên, hãy đặt `DEV_EMAIL` và `DEV_PASSWORD` trong `.env` để tự động đăng nhập.
- Các thành phần (components) bắt đầu bằng `INTERNAL_` là các component client chỉ sử dụng một lần.
- Sử dụng `cnsole` (một công cụ hỗ trợ dự án có chủ ý) thay vì `console` — tìm kiếm `cnsole` trong toàn bộ mã nguồn để xem các ví dụ.
