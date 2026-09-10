// scripts/raw-smtp.js
import tls from "node:tls";

const HOST = "smtp.mail.ru";
const PORT = 465;
const USER = "ruslan-80@inbox.ru";
// const PASS = "AHNpdGVAZWxlY3Ryb3NoaXQtcHJvLnJ1AGY3WDB2anNHV3IwWXBvZm5wMjhV"; // ⚠️ 16-значный пароль приложения
const PASS = "gYtaBvNquYtlrlgahsFQ"; // ⚠️ 16-значный пароль приложения

const authString = Buffer.concat([
  Buffer.from([0]),
  Buffer.from(USER, "utf8"),
  Buffer.from([0]),
  Buffer.from(PASS, "utf8"),
]).toString("base64");

const socket = tls.connect({ host: HOST, port: PORT, servername: HOST }, () => {
  console.log("🔒 TLS connected. Cipher:", socket.getCipher().name);
  console.log("--- Диалог с сервером ---");
});

socket.setEncoding("utf8");

let step = 0;

socket.on("data", (data) => {
  process.stdout.write("S: " + data);

  if (step === 0 && data.startsWith("220")) {
    step = 1;
    socket.write("EHLO test\r\n");
    return;
  }

  if (step === 1 && /^250[ -]/m.test(data)) {
    // ждём последнюю строку блока EHLO (начинается с "250 ")
    if (data.split("\r\n").some((line) => line.startsWith("250 "))) {
      step = 2;
      socket.write("AUTH PLAIN " + authString + "\r\n");
    }
    return;
  }

  if (step === 2 && data.startsWith("235")) {
    console.log("✅ AUTHENTICATION SUCCESSFUL");
    socket.write("QUIT\r\n");
    step = 3;
    return;
  }
  if (step === 2 && data.startsWith("535")) {
    console.log("❌ AUTHENTICATION FAILED (535)");
    socket.write("QUIT\r\n");
    step = 3;
    return;
  }
});

socket.on("error", (err) => {
  console.error("❌ Socket error:", err.message);
});

socket.on("close", () => {
  console.log("--- Соединение закрыто ---");
  process.exit(0);
});
