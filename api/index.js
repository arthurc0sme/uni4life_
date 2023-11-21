import  express  from "express";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
import relationshipRoutes from "./routes/relationships.js"
import cors from "cors"
import multer from "multer";
import cookieParser from "cookie-parser"


const app = express();
app.use(express.json());

//middlewares
app.use((req,res,next) => {
        res.header('Access-Control-Allow-Origin', '*'); 
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
})

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(cookieParser())
app.use('/upload', express.static('../client/public/upload'));
app.use('/upload', express.static('./upload'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req,res) => {
    
    const file = req.file;
    res.status(200).json(file.filename)

})

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/relationships", relationshipRoutes)

app.listen(8800, ()=>{
    console.log("API Funcionando")
})