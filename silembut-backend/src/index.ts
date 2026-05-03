import "reflect-metadata";
import "dotenv/config";
import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import "./passport/passport";
import authRoutes from "./routes/AuthAdmin";
import { AppDataSource } from "./config/data-source";
import userRoutes from "./routes/UserRoutes";
import MySQLStore from "express-mysql-session";
 const MySQLStoreSession = MySQLStore(session);
const app = express();

// CORS — harus paling atas
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
const sessionStore = new MySQLStoreSession({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  clearExpired: true,
  checkExpirationInterval: 900000, // cek tiap 15 menit
   expiration: 1000 * 60 * 60 * 8, // expired 8jam
  createDatabaseTable: false, // tabel sessions sudah ada
  schema: {
    tableName: "sessions",
    columnNames: {
      session_id: "id",
      expires: "last_activity",
      data: "payload",
    },
  },
});

app.use(session({
  secret: process.env.JWT_SECRET || "e32b639b7eeaa9319b55cbaeee5ce6b315033031b18765467b67cbac05dbabc5",
  resave: false,
  saveUninitialized: false,
  store: sessionStore, // ← simpan ke MySQL
  cookie: { maxAge: 1000 * 60 * 60 * 8 }, // ← 8 jam
}));


// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);

// Koneksi DB
AppDataSource.initialize()
  .then(() => {
    console.log("Database terhubung");
    app.listen(Number(process.env.PORT) || 3000, () => {
      console.log(`Server jalan di port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error("Gagal koneksi database:", err);
  });

  // edit profile
app.use("/api/user", userRoutes);