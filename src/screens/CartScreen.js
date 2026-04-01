// src/screens/CartScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import CartItem from '../components/CartItem';

export default function CartScreen() {
  const dispatch = useDispatch();

  // useSelector: ambil items dan total dari Redux store
  const items = useSelector(state => state.cart.items);
  const total = useSelector(state => state.cart.total);

  const itemCount = items.reduce((acc, i) => acc + i.quantity, 0);
  const tax = Math.round(total * 0.11);
  const grandTotal = total + tax;

  const handleClearCart = () => {
    Alert.alert(
      'Kosongkan Cart',
      'Yakin ingin menghapus semua item?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', style: 'destructive', onPress: () => dispatch(clearCart()) },
      ]
    );
  };

  const handleCheckout = () => {
    Alert.alert(
      '✅ Pesanan Berhasil!',
      `Total pembayaran: Rp ${grandTotal.toLocaleString('id-ID')}`,
      [{ text: 'OK', onPress: () => dispatch(clearCart()) }]
    );
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cart</Text>
          <Text style={styles.headerSub}>Keranjang belanja</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>Cart kosong</Text>
          <Text style={styles.emptySub}>Tambahkan produk dari tab Produk</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Cart</Text>
          <Text style={styles.headerSub}>{itemCount} item dipilih</Text>
        </View>
        <TouchableOpacity style={styles.clearBtn} onPress={handleClearCart}>
          <Text style={styles.clearBtnText}>Kosongkan</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <CartItem item={item} />}
        contentContainerStyle={styles.list}
        ListFooterComponent={
          <View style={styles.summary}>
            {/* Summary Card */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>RINGKASAN BELANJA</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal ({itemCount} item)</Text>
                <Text style={styles.summaryValue}>Rp {total.toLocaleString('id-ID')}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>PPN 11%</Text>
                <Text style={styles.summaryValue}>Rp {tax.toLocaleString('id-ID')}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Ongkir</Text>
                <Text style={[styles.summaryValue, { color: '#2D9B5A' }]}>Gratis</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  Rp {grandTotal.toLocaleString('id-ID')}
                </Text>
              </View>
            </View>

            {/* Checkout Button */}
            <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Checkout Sekarang</Text>
              <Text style={styles.checkoutSub}>Rp {grandTotal.toLocaleString('id-ID')}</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F6F3',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEBE5',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A1916',
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 13,
    color: '#8C8880',
    marginTop: 2,
  },
  clearBtn: {
    marginTop: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EDEBE5',
  },
  clearBtnText: {
    fontSize: 12,
    color: '#8C8880',
    fontWeight: '500',
  },
  list: {
    padding: 16,
    paddingBottom: 32,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  emptyEmoji: { fontSize: 56, marginBottom: 16, opacity: 0.4 },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: '#1A1916', marginBottom: 6 },
  emptySub: { fontSize: 13, color: '#8C8880' },
  summary: { marginTop: 8 },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EDEBE5',
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#B0AA9E',
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: { fontSize: 13, color: '#8C8880' },
  summaryValue: { fontSize: 13, color: '#1A1916', fontWeight: '500' },
  divider: {
    height: 1,
    backgroundColor: '#EDEBE5',
    marginVertical: 12,
  },
  totalLabel: { fontSize: 16, fontWeight: '700', color: '#1A1916' },
  totalValue: { fontSize: 20, fontWeight: '700', color: '#1A1916' },
  checkoutBtn: {
    backgroundColor: '#1A1916',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkoutText: {
    color: '#F7F6F3',
    fontSize: 15,
    fontWeight: '600',
  },
  checkoutSub: {
    color: '#C17F3E',
    fontSize: 14,
    fontWeight: '700',
  },
});
