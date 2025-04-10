import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Installment } from '../types';
import { useNavigation } from '@react-navigation/native';

export default function InstallmentScreen() {
  const [product, setProduct] = useState<string>('');
  const [monthlyPayment, setMonthlyPayment] = useState<string>('');
  const [totalPayments, setTotalPayments] = useState<string>('');
  const navigation = useNavigation();

  const handleAddInstallment = async () => {
    if (!product.trim() || !monthlyPayment.trim() || !totalPayments.trim()) {
      Alert.alert('خطا', 'لطفاً تمام فیلدها را پر کنید.');
      return;
    }

    const newInstallment: Installment = {
      id: Date.now().toString(), 
      product: product.trim(),
      monthlyPayment: parseFloat(monthlyPayment), 
      totalPayments: parseInt(totalPayments, 10), 
      remaining: parseInt(totalPayments, 10), 
    };

    try {
      const savedInstallments = await AsyncStorage.getItem('installments');
      const installments: Installment[] = savedInstallments ? JSON.parse(savedInstallments) : [];
      const updatedInstallments = [...installments, newInstallment];
      await AsyncStorage.setItem('installments', JSON.stringify(updatedInstallments));

      Alert.alert('موفقیت', 'قسط با موفقیت اضافه شد!');
      setProduct('');
      setMonthlyPayment('');
      setTotalPayments('');
      navigation.goBack(); 
    } catch (error) {
      Alert.alert('خطا', 'مشکلی در ذخیره قسط رخ داد.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>خرید اقساطی</Text>

      <TextInput
        style={styles.input}
        placeholder="نام محصول (مثلاً تلویزیون)"
        value={product}
        onChangeText={setProduct}
      />

      <TextInput
        style={styles.input}
        placeholder="مبلغ قسط ماهانه (تومان)"
        value={monthlyPayment}
        onChangeText={setMonthlyPayment}
        keyboardType="numeric" 
      />

      <TextInput
        style={styles.input}
        placeholder="تعداد کل اقساط"
        value={totalPayments}
        onChangeText={setTotalPayments}
        keyboardType="numeric" 
      />

      <Button title="ذخیره قسط" onPress={handleAddInstallment} color="#007AFF" />

      <Button
        title="بازگشت به داشبورد"
        onPress={() => navigation.goBack()}
        color="#666"
        // style={styles.backButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  backButton: {
    marginTop: 20,
  },
});