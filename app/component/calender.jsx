import React from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';


const MyCalendar = () => {
    return (
        <View>
         
            <Calendar
                current={"2025-02-01"}
                minDate={"2025-01-01"}
                maxDate={"2025-12-31"}
                markedDates={{
                    '2023-06-25': { selected: true, marked: true },
                    '2023-06-24': { marked: true },
                    '2023-06-26': {
                        marked: true, dotColor: 'red',
                        activeOpacity: 0
                    },
                }}
                theme={{
                    backgroundColor:"rgba(0,0,0,0.2)",
                    calendarBackground: 'transparent',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: '#00adf5',
                    monthTextColor: '#00adf5',
                    indicatorColor: 'blue',
                    textDayFontFamily: 'monospace',
                    textMonthFontFamily: 'monospace',
                    textDayHeaderFontFamily: 'monospace',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16
                }}
            />
        </View>
    );
};
export default MyCalendar