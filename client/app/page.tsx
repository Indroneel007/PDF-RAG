import ChatComponent from "./components/chat";
import FileUploadComponent from "./components/file-upload";
export default function Home() {
  return (
    <div>
      <div className="min-h-screen w-screen flex flex-nowrap">
        <div className="w-[40vw] min-h-screen p-4 items-center flex justify-center">
          <FileUploadComponent />
        </div>
        <div className="w-[60vw] min-h-screen">
          <ChatComponent />
        </div>
      </div>
    </div>
    
  );
}
