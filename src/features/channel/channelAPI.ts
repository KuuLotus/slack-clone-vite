import { firebaseApp } from "@/firebase/firebaseConfig";
import { Channel, ChannelRef } from "@/types/Channel";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

export const subscribeChannels = (
  onChannelsUpdated: (channels: ChannelRef[]) => void
) => {
  const q = query(collection(db, "channels"));

  return onSnapshot(
    q,
    (querySnapshot) => {
      const channelRefs: ChannelRef[] = [];
      querySnapshot.forEach((doc) => {
        channelRefs.push({
          id: doc.id,
          channel: doc.data() as Channel,
        });
      });
      onChannelsUpdated(channelRefs);
    },
    (error) => {
      console.error("Failed to subscribe channels: ", error);
    }
  );
};
