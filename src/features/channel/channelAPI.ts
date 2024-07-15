import { firebaseApp } from "@/firebase/firebaseConfig";
import { Channel, ChannelRef } from "@/types/Channel";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  query,
  Timestamp,
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

export const createChannel = (name: string): Channel => {
  const timestamp = Timestamp.fromDate(new Date());
  return {
    name,
    create_at: timestamp,
  };
};

export const postChannel = async (channel: Channel) => {
  await addDoc(collection(db, "channels"), channel);
};
