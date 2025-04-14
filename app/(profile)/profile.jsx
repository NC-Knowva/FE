import { View, Text, Image, Button, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
// import { StyleSheet } from "nativewind";

export default function Profile() {
  return (
    <>
      <View className={styles.grid.details}>
        <Image
          className={"row-span-2 col-span-2"}
          style={style.image}
          defaultSource={require("@/assets/images/profile.jpg")}
        />
        <Text className={styles.element.title + " col-span-3"}>User Name</Text>

        <Link className={"container"} href="../topics" asChild>
          <Pressable>
            <Text className={styles.element.stats}>10 Topics</Text>
          </Pressable>
        </Link>
        <Link
          className={"container"}
          href="../messaging?filter=friends"
          asChild
        >
          <Pressable>
            <Text className={styles.element.stats}>200 Friends</Text>
          </Pressable>
        </Link>
        <Link className={"container"} href="../messaging?filter=groups" asChild>
          <Pressable>
            <Text className={styles.element.stats}>2 Study Groups</Text>
          </Pressable>
        </Link>

        <Text className={styles.element.username + " col-span-5"}>
          @username
        </Text>
        <View className={" col-span-5"}>
          <View className={styles.grid.buttons}>
            <Link
              className={styles.element.button}
              href="./edit_profile"
              asChild
            >
              <Pressable>
                <Text>Edit Profile</Text>
              </Pressable>
            </Link>
            <Link className={styles.element.button} href="./settings" asChild>
              <Pressable>
                <Text>Settings</Text>
              </Pressable>
            </Link>

            <Link className={styles.element.button} href="./logout" asChild>
              <Pressable>
                <Text>Log out</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>

      <View>
        <Text className={styles.section.title}>Study Groups:</Text>
        <View className={styles.section.grid}>
          <Text className={styles.section.element}>Subject</Text>
          <Text className={styles.section.element}>Subject</Text>
          <Text className={styles.section.element}>Subject</Text>
        </View>
      </View>

      <View>
        <Text className={styles.section.title}>My Cards:</Text>
        <View className={styles.section.grid}>
          <Text className={styles.section.element}>Subject</Text>
          <Text className={styles.section.element}>Subject</Text>
          <Text className={styles.section.element}>Subject</Text>
        </View>
      </View>
    </>
  );
}

const styles = {
  grid: {
    details: "grid text-center grid-cols-5 ",
    buttons: "grid text-center grid-cols-3 gap-2",
  },
  element: {
    title: " text-lg text-center h-12 p-3",
    stats: "bg-white m-1 text-center h-auto p-2 border border-solid text-xs",
    username: "text-left h-auto p-2",
    button: "bg-white m-1 text-center h-auto p-2 border border-solid text-xs",
  },
  section: {
    title: "p-1 font-bold text-lg",
    grid: " border p-1",
    element: "bg-white m-1 text-center h-auto p-2 border border-solid text-xs",
  },
};

const style = StyleSheet.create({ image: { width: "100%", height: "100%" } });
