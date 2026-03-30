const express = require("express")
const cors = require("cors")
const db = require("./database")
const multer = require("multer")
const upload = multer({ dest: "uploads/" })
const fs = require("fs")
const app = express()

app.use(cors())
app.use(express.json())
app.post("/documents", (req, res) => {
    const { title, content } = req.body
  
    db.run(
      "INSERT INTO documents (title, content) VALUES (?, ?)",
      [title, content],
      function(err) {
        if (err) {
          return res.send(err)
        }
        res.send({ id: this.lastID })
      }
    )
  })
  app.get("/documents", (req, res) => {
    db.all("SELECT * FROM documents", [], (err, rows) => {
      res.send(rows)
    })
  })
  app.put("/documents/:id", (req, res) => {
    const { title, content } = req.body
    const { id } = req.params
  
    db.run(
      "UPDATE documents SET title=?, content=? WHERE id=?",
      [title, content, id],
      function(err) {
        if (err) {
          return res.send(err)
        }
        res.send("Updated")
      }
    )
  })
  app.post("/upload", upload.single("file"), (req, res) => {

    const file = req.file
    
    const content = fs.readFileSync(file.path, "utf8")
    
    db.run(
    "INSERT INTO documents (title, content) VALUES (?, ?)",
    [file.originalname, content],
    function(err){
    if(err){
    return res.send(err)
    }
    
    res.send("File Uploaded")
    }
    )
    
    })
    app.post("/share", (req, res) => {

        const { documentId, email } = req.body
        
        db.run(
        "INSERT INTO shares (documentId, userEmail) VALUES (?, ?)",
        [documentId, email],
        function(err){
        if(err){
        return res.send(err)
        }
        
        res.send("Shared")
        }
        )
        
        })
        app.get("/shared/:email", (req, res) => {

            const { email } = req.params
            
            db.all(
            `SELECT documents.* 
            FROM documents 
            JOIN shares 
            ON documents.id = shares.documentId 
            WHERE shares.userEmail=?`,
            [email],
            (err, rows)=>{
            res.send(rows)
            }
            )
            
            })
app.get("/", (req,res)=>{
res.send("Server running successfully")
})

app.listen(5000,()=>{
console.log("Server started on port 5000")
})