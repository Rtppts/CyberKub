// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // เปิดให้เข้าถึงผ่าน LAN (ใช้ IP ของเครื่องคุณ)
    port: 3000, // เลือกพอร์ตที่ต้องการ
    strictPort: true, // ถ้าพอร์ตถูกใช้งานแล้วจะไม่เปลี่ยนพอร์ต
  },
});
