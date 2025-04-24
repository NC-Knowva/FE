import { useEffect, useState, useRef,  } from "react";
import supabase from "./supabaseClient";
import { useColorScheme, ScrollView, Platform, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

function ChatApp() {
  const [session, setSession] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [usersOnline, setUsersOnline] = useState([]);

  const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView
  //const router = useRouter()
  

  const chatContainerRef = useRef(null);
  const scroll = useRef();

  useEffect(() => {
    signIn()
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  //console.log(session);

  // sign in
  const signIn = async () => {
    const { data, error } = await supabase.auth.signInAnonymously()
  };

  // sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  useEffect(() => {
    if (!session?.user) {
      setUsersOnline([]);
      return;
    }
    const roomOne = supabase.channel("room_one", {
      config: {
        presence: {
          key: session?.user?.id,
        },
      },
    });

    roomOne.on("broadcast", { event: "message" }, (payload) => {
      setMessages((prevMessages) => [...prevMessages, payload.payload]);
      // console.log(messages);
    });

    // track user presence subscribe!
    roomOne.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await roomOne.track({
          id: session?.user?.id,
        });
      }
    });

    // handle user presence
    roomOne.on("presence", { event: "sync" }, () => {
      const state = roomOne.presenceState();
      setUsersOnline(Object.keys(state));
    });

    return () => {
      roomOne.unsubscribe();
    };
  }, [session]);

  // send message
  const sendMessage = async (e) => {
    e.preventDefault();

    supabase.channel("room_one").send({
      type: "broadcast",
      event: "message",
      payload: {
        message: newMessage,
        user_name: session?.user?.user_metadata?.email,
        avatar: session?.user?.user_metadata?.avatar_url,
        timestamp: new Date().toISOString(),
      },
    });
    setNewMessage("");
  };

  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString("en-us", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }, [100]);
  }, [messages]);

  return (
    <Container>
      <div className="w-full flex h-screen justify-center items-center p-4">
        <div className="border-[1px] border-gray-700 max-w-6xl w-full min-h-[600px] rounded-lg">
          {/* Header */}
          <div className="flex justify-between h-20 border-b-[1px] border-gray-700">
            <div className="p-4">
              <p className="text-gray-300">
                Signed in as {session?.user?.user_metadata?.email}
              </p>
              <p className="text-gray-300 italic text-sm">
                {usersOnline.length} users online
              </p>
            </div>
          </div>

          {/* main chat */}
          <div
            ref={chatContainerRef}
            className="p-4 flex flex-col overflow-y-auto h-[500px]"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`my-2 flex w-full items-start ${
                  msg?.user_name === session?.user?.email
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                {/* received message - avatar on left */}
                {msg?.user_name !== session?.user?.email && (
                  <Icon name="happy-outline" size={25}/>
                )}

                <div className="flex flex-col w-full">
                  <div
                    className={`p-1 max-w-[70%] rounded-xl ${
                      msg?.user_name === session?.user?.email
                        ? "bg-gray-700 text-white ml-auto"
                        : "bg-gray-500 text-white mr-auto"
                    }`}
                  >
                    <p>{msg.message}</p>
                  </div>

                  {/* timestamp */}
                  <div
                    className={`text-xs opactiy-75 pt-1 ${
                      msg?.user_name === session?.user?.email
                        ? "text-right mr-2"
                        : "text-left ml-2"
                    }`}
                  >
                    {formatTime(msg?.timestamp)}
                  </div>
                </div>

                {msg?.user_name === session?.user?.email && (
                  <img
                    src={msg?.avatar}
                    alt="/"
                    className="w-10 h-10 rounded-full ml-2"
                  />
                )}
              </div>
            ))}
          </div>

          {/* message input */}
          <form
            onSubmit={sendMessage}
            className="flex flex-col sm:flex-row p-4 border-t-[1px] border-gray-700"
          >
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              type="text"
              placeholder="Type a message..."
              className="p-2 w-full bg-[#00000040] rounded-lg"
            />
            <button className="mt-4 sm:mt-0 sm:ml-8 text-grey max-h-12">
              Send
            </button>
            <span ref={scroll}></span>
          </form>
        </div>
      </div>
    </Container>
   );
}


const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});


export default ChatApp;