import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bill, Installment } from '../types';

export default function DashboardScreen({ navigation }: any) {
  const [bills, setBills] = useState<Bill[]>([]);
  const [installments, setInstallments] = useState<Installment[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const savedBills = await AsyncStorage.getItem('bills');
    const savedInstallments = await AsyncStorage.getItem('installments');
    if (savedBills) setBills(JSON.parse(savedBills));
    if (savedInstallments) setInstallments(JSON.parse(savedInstallments));
  };

  const saveData = async (newBills: Bill[], newInstallments: Installment[]) => {
    await AsyncStorage.setItem('bills', JSON.stringify(newBills));
    await AsyncStorage.setItem('installments', JSON.stringify(newInstallments));
    setBills(newBills);
    setInstallments(newInstallments);
  };

  const addSampleData = () => {
    const sampleBills: Bill[] = [
      { id: '1', title: 'قبض برق', amount: 500000, paid: false },
      { id: '2', title: 'قبض آب', amount: 300000, paid: true },
    ];
    const sampleInstallments: Installment[] = [
      { id: '1', product: 'تلویزیون', monthlyPayment: 200000, totalPayments: 12, remaining: 8 },
      { id: '2', product: 'موبایل', monthlyPayment: 150000, totalPayments: 6, remaining: 3 },
    ];
    saveData(sampleBills, sampleInstallments);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>داشبورد مالی</Text>
      <Button title="اضافه کردن داده نمونه" onPress={addSampleData} />
      
      <Text style={styles.sectionTitle}>قبوض:</Text>
      <FlatList
        data={bills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title} - {item.amount} تومان</Text>
            <Text>{item.paid ? 'پرداخت شده' : 'پرداخت نشده'}</Text>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>اقساط:</Text>
      <FlatList
        data={installments}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.product} - قسط ماهانه: {item.monthlyPayment} تومان</Text>
            <Text>مانده: {item.remaining} از {item.totalPayments}</Text>
          </View>
        )}
      />

      <Button
        title="پرداخت قبض"
        onPress={() => navigation.navigate('BillPayment')}
      />
      <Button
        title="خرید اقساطی"
        onPress={() => navigation.navigate('Installment')}
        // style={styles.button}
      />
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
      fontFamily: 'Arial', 
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      marginTop: 20,
      marginBottom: 10,
      color: '#444',
      textDecorationLine: 'underline',
    },
    item: {
      padding: 15,
      backgroundColor: '#fff',
      borderRadius: 12,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
      transform: [{ scale: 1 }],
    },
    button: {
      marginTop: 20,
      borderRadius: 8, 
    },
  });