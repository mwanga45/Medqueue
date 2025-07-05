import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

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

interface BookingHistoryModalProps {
  visible: boolean;
  onClose: () => void;
  bookingHistory: BookingHistoryItem[];
  loading: boolean;
}

const getDayName = (dayNumber: number): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  if (typeof dayNumber !== 'number' || dayNumber < 0 || dayNumber > 6) return 'Unknown';
  return days[dayNumber] || 'Unknown';
};

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

const formatTime = (timeString: string | undefined): string => {
  if (!timeString || typeof timeString !== 'string') return 'N/A';
  
  // Extract HH:MM from HH:MM:SS format
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

export default function BookingHistoryModal({
  visible,
  onClose,
  bookingHistory,
  loading,
}: BookingHistoryModalProps) {
  console.log("Modal props:", { visible, loading, bookingHistoryLength: bookingHistory.length });
  console.log("Booking history data:", bookingHistory);

  return (
      <Modal
        visible={visible}
        animationType="slide"
        transparent={false}
        statusBarTranslucent={true}
        onRequestClose={onClose}
      >
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Booking History</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="times" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Loading booking history...</Text>
              </View>
            ) : bookingHistory.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Icon name="calendar-times" size={60} color="#ccc" />
                <Text style={styles.emptyTitle}>No Bookings Found</Text>
                <Text style={styles.emptySubtitle}>
                  You haven't made any bookings yet.
                </Text>
              </View>
            ) : (
              <>


                {/* Booking List */}
                <ScrollView 
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 20 }}
                >
                  {bookingHistory.map((booking, index) => {
                    const bookingId = booking.booking_id || booking.id || 0;
                    const bookingDate = booking.booking_date || booking.bookingdate || '';
                    const startTime = booking.start_time || booking.starttime || '';
                    const endTime = booking.end_time || booking.endtime || '';
                    const dayOfWeek = booking.dayofweek || booking.day_of_week || 0;
                    const status = booking.status || 'unknown';
                    const serviceId = booking.service_id || 0;
                    const specId = booking.spec_id || 0;
                    
                    console.log(`Booking ${index} - Start: "${startTime}", End: "${endTime}"`);
                    


                    return (
                      <View key={`booking-${index}`} style={styles.bookingCard}>
                        <View style={styles.bookingHeader}>
                          <View style={styles.bookingIdContainer}>
                            <Icon name="hashtag" size={12} color="#666" />
                            <Text style={styles.bookingId}>
                              #{bookingId || 'N/A'}
                            </Text>
                          </View>
                          <View
                            style={[
                              styles.statusBadge,
                              { backgroundColor: getStatusColor(status) },
                            ]}
                          >
                            <Text style={styles.statusText}>
                              {status.toUpperCase()}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.bookingDetails}>
                          <View style={styles.detailRow}>
                            <Icon name="calendar" size={14} color="#007AFF" />
                            <Text style={styles.detailText}>
                              {formatDate(bookingDate)} ({getDayName(dayOfWeek)})
                            </Text>
                          </View>

                          <View style={styles.detailRow}>
                            <Icon name="clock" size={14} color="#007AFF" />
                            <Text style={styles.detailText}>
                              {formatTime(startTime)} - {formatTime(endTime)}
                            </Text>
                          </View>

                          <View style={styles.detailRow}>
                            <Icon name="stethoscope" size={14} color="#007AFF" />
                            <Text style={styles.detailText}>
                              Service ID: {serviceId}
                            </Text>
                          </View>

                          {specId > 0 && (
                            <View style={styles.detailRow}>
                              <Icon name="user-friends" size={14} color="#007AFF" />
                              <Text style={styles.detailText}>
                                For someone else (Spec ID: {specId})
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              </>
            )}
          </View>
        </View>
        </SafeAreaView>
      </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    backgroundColor: '#f8f9fa',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  debugContainer: {
    backgroundColor: '#f0f8ff',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  debugText: {
    fontSize: 11,
    color: '#555',
    marginBottom: 4,
    fontFamily: 'monospace',
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
  bookingIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  bookingId: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
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
}); 