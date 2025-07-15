import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { apiurl } from './request_response';
import BookingHistoryModal from './component/BookingHistoryModal';

const { height, width } = Dimensions.get("window")

interface BookingHistoryItem {
  booking_id?: number;
  id?: number;
  user_id?: number;
  service_id?: number;
  spec_id?: number;
  dayofweek?: number;
  day_of_week?: number;
  starttime?: string;
  start_time?: string;
  endtime?: string;
  end_time?: string;
  bookingdate?: string;
  booking_date?: string;
  status?: string;
}
interface PendingBooking {
  booking_id: number;
  user_id: number;
  service_id: number;
  spec_id: number;
  dayofweek: number;
  start_time: string;
  end_time: string;
  booking_date: string;
  status: string;
}

export default function Profile() {
  const [username, setUsername] = React.useState<string>("");
  const [userEmail, setUserEmail] = React.useState<string>("");
  const [bookingHistory, setBookingHistory] = useState<BookingHistoryItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [Pendingbooking, setPendingbooking] = useState<PendingBooking[]>([])
  const [loading, setLoading] = useState(false);
  const [recommendationModalVisible, setRecommendationModalVisible] = useState(false);
  const [recommendationMessage, setRecommendationMessage] = useState('');
  const [sendingRecommendation, setSendingRecommendation] = useState(false);

  const handlegetbookinghistory = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const res = await axios.get(apiurl+"user/bookinghistory", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (res.data.success === false) {
        Alert.alert(res.data.message);
        return;
      }
      console.log("Booking history response:", res.data);
      console.log("Booking history data:", res.data.data);
      console.log("Booking history length:", res.data.data?.length || 0);
      setBookingHistory(res.data.data || []);
    } catch (err) {
      console.error("Error fetching booking history:", err);
      Alert.alert("Failed to fetch booking history. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  const openBookingHistory = async () => {
    console.log("Opening booking history modal...");
    setModalVisible(true);
    await handlegetbookinghistory();
  };
  const handlegetPendingbooking = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const res = await axios.get(apiurl+"user/pendingbookings", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }

      })
      if (!res.data.success) {
        Alert.alert(res.data.message)
        return
      }
      setPendingbooking(res.data.data)
      console.log(Pendingbooking)

    } catch (err) {
      console.log("Internal server Error", err)
      Alert.alert("Internal severError")
    }
  }

  useEffect(() => {
    const initilizer = async () => {
      const token = await AsyncStorage.getItem('userToken')
      if (!token) {
        router.push('/login')
        return;
      }
      const decoded: any = jwtDecode(token);
      setUsername(decoded.fullname || decoded.Username || "");
      const email = await AsyncStorage.getItem('userEmail');
      setUserEmail(email || "");

    }
    initilizer();
    handlegetPendingbooking()
  }, [])
  const router = useRouter()

  
  const getStatusColor = (status: string): string => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return '#4CAF50';
      case 'cancelled':
        return '#F44336';
      case 'pending':
        return '#FF9800';
      case 'confirmed':
        return '#2196F3';
      default:
        return '#757575';
    }
  };

  const getDayName = (dayNumber: number): string => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if (typeof dayNumber !== 'number' || dayNumber < 0 || dayNumber > 6) return 'Unknown';
    return days[dayNumber] || 'Unknown';
  };

  const formatTime = (timeString: string | undefined): string => {
    if (!timeString || typeof timeString !== 'string') return 'N/A';
    return timeString.substring(0, 5);
  };

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString || typeof dateString !== 'string') return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'N/A';
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      return 'N/A';
    }
  };

  const handleCancelBooking = async (bookingId: number) => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this booking?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('userToken');
              const res = await axios.post(apiurl+"booking/cancelbooking",
                { booking_id: bookingId },
                {
                  headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                  }
                }
              );
              if (res.data.success) {
                Alert.alert("Success", "Booking cancelled successfully");
                handlegetPendingbooking();
              } else {
                Alert.alert("Error", res.data.message);
              }
            } catch (err) {
              console.error("Error cancelling booking:", err);
              Alert.alert("Error", "Failed to cancel booking");
            }
          }
        }
      ]
    );
  };

  const handleSendRecommendation = async () => {
    if (!recommendationMessage.trim()) {
      Alert.alert("Error", "Please enter a recommendation message");
      return;
    }

    setSendingRecommendation(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const res = await axios.post(apiurl + "user/recommendation", 
        { 
          message: recommendationMessage
        },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      
      if (res.data.success) {
        Alert.alert("Success", "Recommendation sent successfully!");
        setRecommendationMessage('');
        setRecommendationModalVisible(false);
      } else {
        Alert.alert("Error", res.data.message || "Failed to send recommendation");
      }
    } catch (err) {
      console.error("Error sending recommendation:", err);
      Alert.alert("Error", "Failed to send recommendation. Please try again.");
    } finally {
      setSendingRecommendation(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5', paddingHorizontal:5 }}>
      <SafeAreaView style={{ flex: 1 }}>
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
            <Text style={styles.userName}>{username}</Text>
            <Text style={styles.userEmail}>{userEmail}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Pending Bookings</Text>
          {Pendingbooking.length === 0 ? (
            <Text style={styles.noBookingsText}>No pending bookings</Text>
          ) : (
            Pendingbooking.map((booking, index) => (
              <View key={booking.booking_id} style={styles.bookingCard}>
                <View style={styles.bookingHeader}>
                  <Text style={styles.bookingId}>#{booking.booking_id}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
                    <Text style={styles.statusText}>{booking.status.toUpperCase()}</Text>
                  </View>
                </View>
                <View style={styles.bookingDetails}>
                  <View style={styles.detailRow}>
                    <Icon name="calendar" size={14} color="#007AFF" />
                    <Text style={styles.detailText}>
                      {formatDate(booking.booking_date)} ({getDayName(booking.dayofweek)})
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Icon name="clock" size={14} color="#007AFF" />
                    <Text style={styles.detailText}>
                      {formatTime(booking.start_time.split("T")[1].replace("Z",""))} - {formatTime(booking.end_time.split("T")[1].replace("Z",""))}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Icon name="stethoscope" size={14} color="#007AFF" />
                    <Text style={styles.detailText}>Service ID: {booking.service_id}</Text>
                  </View>
                  {booking.spec_id > 0 && (
                    <View style={styles.detailRow}>
                      <Icon name="user-friends" size={14} color="#007AFF" />
                      <Text style={styles.detailText}>For someone else (Spec ID: {booking.spec_id})</Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancelBooking(booking.booking_id)}>
                  <Icon name="times" size={14} color="white" />
                  <Text style={styles.cancelButtonText}>Cancel Booking</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.barButton}>
            <Icon name="id-card" size={25} color="white" />
            <Text style={styles.barButtonText}>Special register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.barButton} onPress={openBookingHistory}>
            <Icon name="history" size={25} color="white" />
            <Text style={styles.barButtonText}>Booking history</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.barButton}>
            <Icon name="" size={25} color="white" />
            <Text style={styles.barButtonText}>Clinic </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.barButton} onPress={() => setRecommendationModalVisible(true)}>
            <Icon name="user-edit" size={25} color="white" />
            <Text style={styles.barButtonText}>Recomendation</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <Modal
        visible={recommendationModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setRecommendationModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Send Recommendation</Text>
              <TouchableOpacity 
                onPress={() => setRecommendationModalVisible(false)}
                style={styles.closeButton}
              >
                <Icon name="times" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalBody}>
              <Text style={styles.modalLabel}>Your Recommendation:</Text>
              <TextInput
                style={styles.recommendationInput}
                placeholder="Write your recommendation, feedback, or suggestion here..."
                placeholderTextColor="#999"
                multiline={true}
                numberOfLines={6}
                textAlignVertical="top"
                value={recommendationMessage}
                onChangeText={setRecommendationMessage}
              />
            </View>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.cancelModalButton}
                onPress={() => {
                  setRecommendationMessage('');
                  setRecommendationModalVisible(false);
                }}
              >
                <Text style={styles.cancelModalButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.sendButton, 
                  (!recommendationMessage.trim() || sendingRecommendation) && styles.sendButtonDisabled
                ]}
                onPress={handleSendRecommendation}
                disabled={!recommendationMessage.trim() || sendingRecommendation}
              >
                {sendingRecommendation ? (
                  <Text style={styles.sendButtonText}>Sending...</Text>
                ) : (
                  <Text style={styles.sendButtonText}>Send</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <BookingHistoryModal
        visible={modalVisible}
        onClose={() => {
      
          setModalVisible(false);
        }}
        bookingHistory={bookingHistory}
        loading={loading}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  upperView: {
    backgroundColor: "black",
    height: height * 0.45,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
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
    backgroundColor: 'black',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    zIndex: 1,
    borderRadius:40,
    paddingHorizontal:10,
    margin:2
  },
  barButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  barButtonText: {
    fontSize: 12,
    color: 'whitesmoke',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  noBookingsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  bookingCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bookingId: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 70,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: 'white',
    textTransform: 'uppercase',
  },
  bookingDetails: {
    gap: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  detailText: {
    fontSize: 14,
    color: '#444',
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F44336',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 12,
    gap: 8,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: width * 0.9,
    maxHeight: height * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  modalBody: {
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  recommendationInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  cancelModalButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelModalButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  sendButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
})


