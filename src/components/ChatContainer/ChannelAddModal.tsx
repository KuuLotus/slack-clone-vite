import { createChannel, postChannel } from "@/features/channel/channelAPI";
import React, { useState } from "react";

type Props = { handleCloseModal: () => void };

const ChannelAddModal = ({ handleCloseModal }: Props) => {
  const [channelName, setChannelName] = useState("");

  const handleModalClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  const handleAddChannel = async () => {
    if (!channelName.trim()) return;

    try {
      await postChannel(createChannel(channelName));
      setChannelName("");
      handleCloseModal();
    } catch (e) {
      console.error("Error adding document", e);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white"
      onClick={handleCloseModal}
    >
      <div
        className="bg-gray-700 rounded-lg shadow-xl w-1/2"
        onClick={handleModalClick}
      >
        <div className="border-b px-4 py-2 flex justify-between items-center">
          <h3 className="font-semibold text-lg">チャンネルを作成する</h3>
          <button className="text-black close-modal" onClick={handleCloseModal}>
            &times;
          </button>
        </div>
        <div className="p-4">
          <input
            type="text"
            className="border rounded w-full py-2 px-3 text-gray-darkest text-black"
            placeholder="名前"
            onChange={(e) => setChannelName(e.target.value)}
          />
          <p className="text-sm text-gray mt-4">
            チャンネルは、特定のトピックに関する会話が行われる場所です。見つけやすく、わかりやすい名前を使用してください。
          </p>
        </div>
        <div className="flex justify-end items-center w-100 border-t p-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddChannel}
          >
            作成
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelAddModal;
