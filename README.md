# Kelompok 7 Cloud Computing 2022 Genap

## Anggota

- Miko (Developer)
- Fajar (Database server: PostgreSQL)
- Joseph (Backend server: NodeJS)
- Rafdi (Frontend server: ReactJS)
- Mas Farhan (User)

## Prosedur

### Persiapan (Database, Backend, dan Frontend)

1. Install WSL dan Docker terlebih dahulu (https://docs.docker.com/desktop/install/windows-install/)
2. Install Git for Windows (https://git-scm.com/download/win)
3. Install ngrok (https://ngrok.com/download), buat akun, dan konfigurasi auth token
4. Clone repository ini pada suatu folder (selanjutnya akan disebut sebagai root folder)

### Eksekusi 1 (Database)

1. Buka PowerShell dan arahkan pada root folder
2. Pastikan port **5432** tidak terpakai oleh service yang lain
3. Jalankan perintah untuk menghidupkan service: `docker compose up -d if-cloud-db`
4. Jalankan perintah untuk forwarding ngrok: `ngrok tcp 5432`
5. Catat alamat host dan port hasil forwarding untuk selanjutnya digunakan oleh **backend**
6. Apabila sudah selesai, jalankan perintah untuk mematikan service: `docker compose down`

### Eksekusi 2 (Backend)

1. Buka PowerShell dan arahkan pada root folder
2. Pastikan port **8080** tidak terpakai oleh service yang lain
3. Copy file **.env.example** menjadi **.env**, kemudian edit environment variable pada file **.env** untuk menyesuaikan host (tanpa prefiks **tcp://**) dan port **database** dari ngrok
4. Jalankan perintah untuk menghidupkan service: `docker compose up -d if-cloud-api`
5. Jalankan perintah untuk forwarding ngrok: `ngrok http 8080`
6. Catat alamat URL hasil forwarding untuk selanjutnya digunakan oleh **frontend**
7. Apabila sudah selesai, jalankan perintah untuk mematikan service: `docker compose down`

### Eksekusi 3 (Frontend)

1. Buka PowerShell dan arahkan pada root folder
2. Pastikan port **3000** tidak terpakai oleh service yang lain
3. Copy file **.env.example** menjadi **.env**, kemudian edit environment variable pada file **.env** untuk menyesuaikan URL **backend** dari ngrok
4. Jalankan perintah untuk menghidupkan service: `docker compose up -d if-cloud-app`
5. Jalankan perintha untuk forwarding ngrok: `ngrok http 3000`
6. Catat alamat URL hasil forwarding untuk selanjutnya digunakan oleh **user**
7. Apabila sudah selesai, jalankan perintah untuk mematikan service: `docker compose down`

### Eksekusi 4 (User)

1. Buka web browser
2. Kunjungi alamat URL hasil forwarding dari ngrok untuk **frontend**
