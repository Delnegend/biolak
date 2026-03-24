# Hướng dẫn triển khai (Deployment Guide)

### Điều kiện tiên quyết

- Một máy chủ Linux (khuyên dùng Debian 13+ hoặc Ubuntu 24.04+).
- [Docker Engine](https://docs.docker.com/engine/install) (có kèm `compose` plugin) hoặc [Podman](https://podman.io/docs/installation).
- `just` (trình chạy tác vụ) và `zstd` (công cụ nén hiệu suất cao).

Cài đặt các gói cần thiết trên Debian/Ubuntu:

```bash
sudo apt update && sudo apt install -y curl ca-certificates zstd podman
# Đối với 'just', có thể cần cài đặt qua kịch bản chính thức nếu không có trong kho lưu trữ mặc định:
curl --proto '=https' --tlsv1.2 -sSf https://just.systems/install.sh | sudo bash -s -- --to /usr/local/bin
```

### Cấu trúc thư mục dịch vụ

Chúng tôi khuyên dùng thư mục `/opt/biolak` để lưu trữ mọi thứ liên quan đến ứng dụng:

```text
/opt/biolak/
├── docker-compose.yml      # Quản lý container (chứa biến môi trường cho các dịch vụ)
└── data/                   # Dữ liệu lưu trữ lâu dài
    ├── media/              # Ảnh/video được tải lên
    └── data.sqlite3        # Cơ sở dữ liệu SQLite
```

#### Thiết lập ban đầu

```bash
sudo mkdir -p /opt/biolak/data/media
sudo chown -R 1000:1000 /opt/biolak
cd /opt/biolak
```

### Cấu hình

1. Tải về các tệp mẫu cấu hình và tự động hóa trực tiếp vào `/opt/biolak`:

    ```bash
    sudo curl -fsSL -o /opt/biolak/docker-compose.yml https://github.com/Delnegend/biolak/raw/refs/heads/main/docker-compose.example.yml
    sudo curl -fsSL -o /opt/biolak/.justfile https://github.com/Delnegend/biolak/raw/refs/heads/main/.prod.justfile
    ```

2. Phân quyền tệp:
   Đảm bảo người dùng hiện tại sở hữu các tệp cấu hình:

    ```bash
    sudo chown 1000:1000 /opt/biolak/docker-compose.yml /opt/biolak/.justfile
    sudo chmod 600 /opt/biolak/docker-compose.yml
    ```

3. Tạo các chuỗi bí mật (secrets) bằng lệnh `openssl rand -base64 32` và dán chúng vào `docker-compose.yml` cho các biến: `PAYLOAD_SECRET`, `CRON_SECRET`, `PREVIEW_SECRET`.

4. Cập nhật `docker-compose.yml`:
    - Đảm bảo `DATABASE_URI` là `file:/home/node/app/data/data.sqlite3`.
    - Đảm bảo `MEDIA_STORAGE_PATH` là `/home/node/app/data/media`.
    - Cập nhật `NEXT_PUBLIC_SERVER_URL` thành domain của bạn (ví dụ `https://biolak.vn`).
    - Nếu sử dụng Cloudflare Tunnel, đặt giá trị `TUNNEL_TOKEN` trong phần `environment` của dịch vụ `cloudflared`.

### Reverse Proxy & SSL/TLS

Ứng dụng không tự xử lý SSL/TLS. Bạn nên sử dụng **Cloudflare Tunnel** (khuyên dùng) hoặc các proxy khác như Nginx/Caddy.

Nếu sử dụng Cloudflare Tunnel:

1. Tham khảo hướng dẫn [Add a published application route](https://developers.cloudflare.com/cloudflare-one/networks/routes/#add-a-published-application-route).
2. Trỏ service đến `http://biolak:3000`.

### Lựa chọn khác: Reverse Proxy (Nginx, Caddy, v.v.)

Nếu bạn chọn sử dụng reverse proxy riêng:

1. Xóa hoặc ghi chú (comment out) phần `cloudflared` trong `docker-compose.yml`.
2. Cấu hình proxy của bạn để xử lý SSL/TLS (ví dụ: qua Let's Encrypt) và chuyển hướng yêu cầu tới dịch vụ.

**Lưu ý về địa chỉ dịch vụ:**

- Nếu reverse proxy của bạn chạy trong **Docker** và nằm trong cùng một mạng (`biolak-network`), hãy cấu hình chuyển hướng tới `http://biolak:3000`.
- Nếu reverse proxy chạy trực tiếp trên **máy chủ (host machine)**, hãy cấu hình chuyển hướng tới `http://localhost:3000`. Trong trường hợp này, bạn **phải bỏ ghi chú (un-comment)** phần `ports` trong `docker-compose.yml` để mở công dịch vụ ra bên ngoài.

### Triển khai

Khởi động stack ứng dụng:

```bash
cd /opt/biolak
docker compose up -d
```

Kiểm tra dịch vụ đã chạy:

```bash
docker compose ps
curl -f http://localhost:3000/api/status
```

Theo dõi nhật ký (logs) theo thời gian thực:

```bash
docker compose logs -f
```

Chúng tôi cung cấp bộ công cụ `just` để đơn giản hóa các tác vụ bảo trì. **Tất cả các lệnh dưới đây phải được thực hiện từ bên trong thư mục dịch vụ (`/opt/biolak`).**

### Sao lưu (Backup)

Sao lưu toàn bộ môi trường (cấu hình, cơ sở dữ liệu, hình ảnh và cả docker image hiện tại):

```bash
cd /opt/biolak
just backup
```

Bản sao lưu sẽ được lưu tại `/opt/biolak-YYYY-MM-DD_HH-MM-SS.tzst`.

### Khôi phục (Restore)

Khôi phục môi trường từ bản sao lưu mới nhất:

```bash
cd /opt/biolak
just restore
```

### Cập nhật (Update)

Cập nhật ứng dụng lên phiên bản mới nhất một cách an toàn (tự động sao lưu trước khi cập nhật):

```bash
cd /opt/biolak
just update
```

## Chuyển sang máy chủ mới (Migration)

Để di dời toàn bộ ứng dụng BioLAK sang một máy chủ hoàn toàn mới:

1.  Hoàn tất các bước **Điều kiện tiên quyết** và **Thiết lập ban đầu** (tạo thư mục `/opt/biolak` và cấp quyền) trên máy chủ mới.
2.  Chuyển tệp sao lưu mới nhất của bạn (ví dụ: `biolak-2026-02-22_12-00-00.tzst`) vào thư mục `/tmp` của máy chủ mới.
3.  Giải nén tệp sao lưu vào thư mục gốc (lệnh này sẽ tự động điền dữ liệu vào `/opt/biolak`):
    ```bash
    sudo tar -xf /tmp/biolak-*.tzst -C /
    ```
4.  Đảm bảo quyền sở hữu chính xác cho các tệp đã giải nén:
    ```bash
    sudo chown -R 1000:1000 /opt/biolak
    ```
5.  Di chuyển vào thư mục và khởi chạy ứng dụng:
    ```bash
    cd /opt/biolak
    docker compose up -d
    ```

## Bản sao lưu máy chủ mới nhất (Latest Server Backup)

Bạn có thể tải bản sao lưu sản xuất mới nhất tại đây: [Link bản sao lưu mới nhất](https://drive.google.com/file/d/186M2WAzDKtDGF27rO2ozAtVxkL8bnqL2/view?usp=sharing).
