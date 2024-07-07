import HomeIcon from "@mui/icons-material/Home";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const SideBar = () => {
  return (
    <div className="w-16 py-3 h-screen bg-gray-900 flex flex-col text-white">
      <div className="py-5 flex flex-col items-center">
        <div className="bg-gray-700 p-2 rounded-lg">
          <HomeIcon />
        </div>
        <span className="text-sm">Home</span>
      </div>
      <div className="py-5 flex flex-col items-center">
        <div className="bg-gray-700 p-2 rounded-lg">
          <ChatBubbleIcon />
        </div>
        <span className="text-sm">DM</span>
      </div>
      <div className="py-5 mt-auto mx-2 flex flex-col items-center">
        <div className="bg-gray-700 p-2 rounded-lg">
          <img src={"/default-user-icon.png"} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
