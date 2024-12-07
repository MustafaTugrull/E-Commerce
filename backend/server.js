const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mainRoute = require("./controller/index.js");  // Ana route dosyasını içe aktar

const port = 5000;
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB bağlantı hatası:", error);
        throw error;
    }
}

// Middleware'lar
app.use(express.json());  // JSON verisini işlemek için middleware
app.use(cors());          // CORS desteği

// "/api" yolunu kullanarak ana route'ı dahil edin
app.use("/api", mainRoute);  // Ana route dosyasındaki yönlendirmeleri kullan

// Sunucu başlatma
app.listen(port, () => {
    connect();
    console.log(`Sunucu ${port} üzerinden çalışıyor...`);
});
