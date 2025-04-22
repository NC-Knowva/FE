import { Stack, useLocalSearchParams, router, Link } from "expo-router";
import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";

const dummyUser = {
  username: "your_fav_ai",
  name: "Conner",
  avatar_img_url:
    "https://www.gamebyte.com/wp-content/uploads/2019/07/Detroit_Become_Human_Connor_3.jpg",
  education: "A-level",
  settings: {},
  calendar: {},
  created_at: "2023-10-01T00:00:00.000Z",
};

const dummyUser2 = {
    username: "your_other_fav_ai",
    name: "Conner2",
    avatar_img_url:
      "https://www.gamebyte.com/wp-content/uploads/2019/07/Detroit_Become_Human_Connor_3.jpg",
    education: "A-level",
    settings: {},
    calendar: {},
    created_at: "2024-10-01T00:00:00.000Z",
  };

function FriendBox({ user, selected, onToggle }) {
  return (
    <Pressable onPress={onToggle}>
      <View style={styles.chatCard}>
        <Image
          style={styles.chatCardImage}
          source={{ uri: user.avatar_img_url }}
        />
        <View style={styles.messageInfo}>
          <Text style={styles.friendName}>{user.name}</Text>
          <Text style={styles.friendUsername}>@{user.username}</Text>
        </View>
        <View style={styles.circleWrapper}>
          <View
            style={[
              styles.circle,
              { backgroundColor: selected ? "blue" : "white" },
            ]}
          />
        </View>
      </View>
    </Pressable>
  );
}



export default function newStudyGroup() {
  const { search } = useLocalSearchParams();
  const [searchText, onChangeText] = useState(search);
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  function toggleUser(user) {
    setSelectedUsers((previousUsers) => {
      const isSelected = previousUsers.find(
        (u) => u.username === user.username
      );
      if (isSelected) {
        return previousUsers.filter((u) => u.username !== user.username);
      } else {
        return [...previousUsers, user];
      }
    });
  }

  function handleChangeText(event) {
    onChangeText(event);
    router.setParams({ search: event });
  }

  function handleSubmit() {
    if(!groupName || selectedUsers.length === 0) {
        alert("Please enter a group name and select at least one friend")
    }
    console.log(groupName, "groupName")
    console.log(selectedUsers, "selected users")

    router.push({
        pathname: `/${groupName}`, //currently directs to [username].jsx
    })
}

  return (
    <>
      <Stack.Screen options={{ title: "New Study Group" }} />

      <View style={styles.container}>
        <Text style={styles.label}>Study Group Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type in group name"
          value={groupName}
          onChangeText={setGroupName}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Add:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleChangeText}
          value={searchText}
          placeholder="Search"
        />
      </View>
      <View>
        <Text style={styles.suggested}>Suggested</Text>
        <View style={styles.friendMessages}>
          {[dummyUser, dummyUser2, dummyUser].map((user, index) => (
            <FriendBox
              key={index}
              user={user}
              selected={Boolean(
                selectedUsers.find((u) => u.username === user.username)
              )}
              onToggle={() => toggleUser(user)}
            />
          ))}
        </View>
      </View>
      <View>
        <Pressable onPress={handleSubmit} style={styles.submitButton}>
          <Text>Create Group Chat</Text>
        </Pressable>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  label: {
    fontSize: 15,
  },
  friendMessages: {
    paddingBottom: 50,
  },
  suggested: {
    fontWeight: "bold",
    margin: 10,
    fontSize: 17,
  },
  chatCard: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    backgroundColor: "lightgrey",
  },
  chatCardImage: {
    flex: 1,
    margin: 5,
    width: 60,
    height: 60,
  },
  messageInfo: {
    paddingLeft: 2,
    flex: 5,
    flexDirection: "column",
  },
  friendName: {
    paddingTop: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  friendUsername: {
    paddingLeft: 2,
    fontSize: 13,
  },
  submitButton: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "grey",
    alignItems: "center",
    marginHorizontal: 40,
    padding: 5,
    backgroundColor: "white",
  },
  circleWrapper: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "grey",
  },
});
