import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState, useEffect } from 'react'

const Editor = () => {

const [title, setTitle] = useState("Untitled")
const [email, setEmail] = useState("")
const [documents, setDocuments] = useState([])
const [currentId, setCurrentId] = useState(null)

const editor = useEditor({
extensions: [StarterKit],
content: "<p>Start writing...</p>"
})

useEffect(()=>{
fetchDocuments()
},[])

const fetchDocuments = async () => {
const res = await fetch("http://localhost:5000/documents")
const data = await res.json()
setDocuments(data)
}

const saveDocument = async () => {
    const content = editor.getHTML()
    
    if(currentId){
    
    await fetch(`http://localhost:5000/documents/${currentId}`, {
    method: "PUT",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify({
    title,
    content
    })
    })
    
    alert("Document Updated")
    
    }else{
    
    await fetch("http://localhost:5000/documents", {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify({
    title,
    content
    })
    })
    
    alert("Document Saved")
    
    }
    
    fetchDocuments()
    }

const openDocument = (doc) => {
setTitle(doc.title)
editor.commands.setContent(doc.content)
setCurrentId(doc.id)
}
const uploadFile = async (e) => {

    const file = e.target.files[0]
    
    const formData = new FormData()
    formData.append("file", file)
    
    await fetch("http://localhost:5000/upload", {
    method: "POST",
    body: formData
    })
    
    alert("File Uploaded")
    
    fetchDocuments()
    }
    const shareDocument = async () => {

        await fetch("http://localhost:5000/share", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        documentId: currentId,
        email
        })
        })
        
        alert("Document Shared")
        }
        return (
            <div className="editor-card">
            
            <input
            placeholder="Share with email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            
            <button onClick={shareDocument}>
            Share
            </button>
            
            <br/><br/>
            
            <input type="file" onChange={uploadFile} />
            <br/><br/>
            
            <h3>Documents</h3>
            
            {documents.map(doc => (
            <div key={doc.id}>
            <button onClick={()=>openDocument(doc)}>
            {doc.title}
            </button>
            </div>
            ))}
            
            <br/>
            
            <input
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder="Document Title"
            />
            
            <br/><br/>
            
            <button onClick={saveDocument}>
            Save Document
            </button>
            
            <br/><br/>
            
            <EditorContent editor={editor} />
            
            </div>
            )
        }
        export default Editor