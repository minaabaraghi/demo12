import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bill } from '../types';
import { useNavigation } from '@react-navigation/native';

export default function BillPaymentScreen() {
  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [trackingCode, setTrackingCode] = useState<string>('');
  const navigation = useNavigation();

  const handlePayBill = async () => {
    if (!title.trim() || !amount.trim() || !trackingCode.trim()) {
      Alert.alert('خطا', 'لطفاً تمام فیلدها را پر کنید.');
      return;
    }

    const newBill: Bill = {
      id: Date.now().toString(), 
      title: title.trim(),
      amount: parseFloat(amount), 
      paid: false, 
    };

    try {
      const savedBills = await AsyncStorage.getItem('bills');
      const bills: Bill[] = savedBills ? JSON.parse(savedBills) : [];
      const updatedBills = [...bills, newBill];
      await AsyncStorage.setItem('bills', JSON.stringify(updatedBills));

      Alert.alert('موفقیت', 'قبض با موفقیت اضافه شد!');
      setTitle('');
      setAmount('');
      setTrackingCode('');
      navigation.goBack(); 
    } catch (error) {
      Alert.alert('خطا', 'مشکلی در ذخیره قبض رخ داد.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>پرداخت قبض</Text>

      <TextInput
        style={styles.input}
        placeholder="عنوان قبض (مثلاً برق)"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="مبلغ (تومان)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric" 
      />

      <TextInput
        style={styles.input}
        placeholder="کد پیگیری"
        value={trackingCode}
        onChangeText={setTrackingCode}
      />

      <TouchableOpacity  onPress={handlePayBill}style={styles.backButton}  >
      <Text style={{ color: '#666' }}>  پرداخت و ذخیره</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: '#666' }}>بازگشت به داشبورد</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#e6f3ff',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#007AFF',
    },
    input: {
      borderWidth: 1,
      borderColor: '#007AFF',
      padding: 12,
      marginBottom: 15,
      borderRadius: 12,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    backButton: {
      marginTop: 20,
    },
  });