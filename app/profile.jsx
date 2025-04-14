import { View, Text, Image, Button, StyleSheet } from "react-native";
// import { StyleSheet } from "nativewind";

export default function Profile() {
  return (<>
  <View className={styles.grid}>

    
    <Text className={styles.element + " row-span-2 col-span-2"}> Profile Image</Text>
    {/* <Image style = {style.image} defaultSource={require("@/assets/images/profile.jpg")}/> */}
    <Text className={styles.element + " row-span-1 col-span-3"}> User Name</Text>
    <Text className={styles.element + " row-span-1 col-span-1"}>10 Topics</Text>
    <Text className={styles.element + " row-span-1 col-span-1"}>200 Friends</Text>
    <Text className={styles.element + " row-span-1 col-span-1"}>2 Study Groups</Text>
    <Text className={styles.element + " row-span-1 col-span-5"}>@username</Text>

  </View>

  <View className={"grid auto-cols-auto grid-col-3 text-center"}>
   <Button className={styles.element + " col-span-1 border-4 border-purple-500"}><Text>Profile</Text></Button>
   <Button className={styles.element + " col-span-2"}>Settings</Button>
   <Button className={styles.element + " col-span-3"}>Log out</Button>
    </View>
  </>);
}

const styles = {
  grid: "grid auto-cols-auto grid-cols-5 text-center",
  element:"bg-red-100 text-center"
}

const style = StyleSheet.create({image: {width: "100%", height:"100%"}})