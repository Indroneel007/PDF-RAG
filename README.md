# PDF-RAG: Document-based Question Answering System

## 📖 Project Overview
PDF-RAG is a powerful document-based question answering system that allows users to upload PDF documents and ask questions about their content. The system leverages Retrieval-Augmented Generation (RAG) to provide accurate and context-aware responses by combining the power of language models with document retrieval capabilities.

## 🏗️ Architecture

![Architecture](/architecture-diagram.png)


### Key Components:

1. **Frontend (Next.js)**
   - Modern React-based UI with TypeScript
   - File upload interface
   - Interactive chat interface
   - Responsive design

2. **Backend (Express.js)**
   - RESTful API endpoints
   - File upload handling with Multer
   - Authentication middleware
   - Request validation

3. **Worker (BullMQ)**
   - Background job processing
   - PDF text extraction
   - Document chunking and embedding
   - Vector store updates

4. **Vector Store (Qdrant)**
   - Stores document embeddings
   - Enables semantic search
   - Fast similarity search

5. **Cache & Message Queue (Redis)**
   - Job queuing with BullMQ
   - Caching frequent queries
   - Rate limiting

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Redis server
- Qdrant server

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/PDF-RAG.git
   cd PDF-RAG
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   cp .env.example .env  # Update with your configuration
   ```

3. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   cp .env.example .env  # Update with your configuration
   ```

4. **Start the services**
   ```bash
   # Start Redis server (in a separate terminal)
   redis-server
   
   # Start the backend (in server directory)
   npm run dev
   
   # Start the worker (in a separate terminal)
   npm run dev:worker
   
   # Start the frontend (in client directory)
   npm run dev
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## 🛠️ Features

- 📄 PDF document upload and processing
- 💬 Interactive chat interface
- 🔍 Semantic search across documents
- ⚡ Real-time processing with WebSockets
- 🔒 Secure authentication
- 📱 Responsive design for all devices

## 🚀 Future Enhancements

### Planned Features
- [ ] Support for additional document formats (DOCX, TXT, etc.)
- [ ] Document organization into collections
- [ ] User authentication and document access control
- [ ] API rate limiting and usage analytics
- [ ] Export chat history and search results
- [ ] Integration with cloud storage providers

### Performance Improvements
- [ ] Implement document caching
- [ ] Optimize embedding generation
- [ ] Add support for batch processing
- [ ] Implement incremental updates

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [LangChain](https://langchain.com/) for the RAG framework
- [Qdrant](https://qdrant.tech/) for vector search
- [Next.js](https://nextjs.org/) for the frontend framework
- [Express.js](https://expressjs.com/) for the backend API
