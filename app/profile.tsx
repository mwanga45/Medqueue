import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context'

const { height, width } = Dimensions.get("window")
export default function Profile() {
  const router = useRouter()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={styles.upperView}>
        <View style={styles.viewbar} >
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.profileTitle}>Your Profile</Text>
          <TouchableOpacity >
            <Icon name="bell" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.ImageProfile}>
          <View style={styles.avatarCircle}>
            <Icon name="user" size={60} color="#888" />
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>johndoe@email.com</Text>
        </View>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Phone</Text>
        <Text style={styles.infoValue}>+123 456 7890</Text>
        <Text style={styles.infoLabel}>Address</Text>
        <Text style={styles.infoValue}>123 Main St, City</Text>
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.barButton}>
          <Icon name="home" size={28} color="#222" />
          <Text style={styles.barButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.barButton}>
          <Icon name="edit" size={28} color="#222" />
          <Text style={styles.barButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.barButton}>
          <Icon name="cog" size={28} color="#222" />
          <Text style={styles.barButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  upperView: {
    backgroundColor: "black",
    height: height * 0.45,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backButton: {
    padding: 8,
    justifyContent: "center"
  },
  viewbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: "#333"
  },
  profileTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "white",
  },
  ImageProfile: {
    alignItems: "center",
    marginTop: 20,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#eee',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  userEmail: {
    fontSize: 15,
    color: '#ddd',
    marginBottom: 10,
  },
  infoSection: {
    marginTop: 30,
    marginHorizontal: 30,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoLabel: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
  infoValue: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
  },
  barButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  barButtonText: {
    fontSize: 12,
    color: '#222',
    marginTop: 2,
  },
})


