import React, { useState, useEffect } from "react"
import "./App.css"
import Editor from "./Editor"

function App() {
  return (
    <div className="app-container">

      <div className="sidebar">
        <h2>Documents</h2>
      </div>

      <div className="editor-container">
  <div className="editor-card">
    <h1>Document Editor</h1>
    <Editor />
  </div>
</div>

    </div>
  )
}

export default App