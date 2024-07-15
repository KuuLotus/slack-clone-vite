import { subscribeChannels } from "@/features/channel/channelAPI";
import { ChannelRef } from "@/types/Channel";
import { useEffect, useState } from "react";
import ChannelCell from "./ChannelCell";
import ChannelAddModal from "./ChannelAddModal";

const ChatList = () => {
  const [channelRefs, setChannelRefs] = useState<ChannelRef[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = subscribeChannels((channelRefs) => {
      setChannelRefs(channelRefs);
    });
    return () => unsubscribe();
  });

  return (
    <div className="w-64 bg-gray-800">
      <div className="px-4 py-3 mb-4 border-b border-gray-700">
        <span className="text-gray-300 font-bold">チャンネル</span>
      </div>
      <div className="overflow-y-auto">
        {channelRefs.map(({ channel, id }) => (
          <ChannelCell channel={channel} id={id} key={id} />
        ))}
      </div>
      <div className="px-4 py-2">
        <button
          className="text-gray-300 hover:text-white"
          onClick={() => setShowModal(true)}
        >
          + チャンネルを追加する
        </button>
        {showModal && (
          <ChannelAddModal handleCloseModal={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
};

export default ChatList;
