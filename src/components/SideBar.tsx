import HomeIcon from "@mui/icons-material/Home";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useAppSelector } from "@/app/hooks";
import { useEffect, useState } from "react";
import { User } from "@/types/User";
import { getUser } from "@/features/user/userAPI";
import { signOut } from "@/features/auth/auth";

const SideBar = () => {
  const userId = useAppSelector((state) => state.user.userId);
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const userRef = await getUser(userId);
        if (userRef) {
          setUser(userRef);
        }
      }
    };
    fetchUser();
  }, [userId]);

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
          <img
            src={user?.profile_picture || "/default-user-icon.png"}
            alt=""
            onClick={() => signOut()}
          />
        </div>
        <span className="text-xs">{user?.displayName}</span>
      </div>
    </div>
  );
};

export default SideBar;
