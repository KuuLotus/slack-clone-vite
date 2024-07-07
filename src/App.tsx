import ChatContainer from "./components/ChatContainer";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="flex">
      <SideBar />
      <ChatContainer />
    </div>
  );
}

export default App;
