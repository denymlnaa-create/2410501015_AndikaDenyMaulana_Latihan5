import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import CartItem from '../components/CartItem';

export default function CartScreen() {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const layout = useMemo(() => {
    const isSmall = width < 360;
    const isTablet = width >= 600;

    return {
      padding: isSmall ? 12 : isTablet ? 24 : 16,
      titleSize: isSmall ? 22 : isTablet ? 30 : 26,
      cardRadius: isSmall ? 12 : 16,
    };
  }, [width]);

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
        <View style={[styles.header, { paddingHorizontal: layout.padding }]}>
          <Text style={[styles.headerTitle, { fontSize: layout.titleSize }]}>
            Cart
          </Text>
          <Text style={styles.headerSub}>Keranjang belanja</Text>
        </View>

        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>Cart kosong</Text>
          <Text style={styles.emptySub}>
            Tambahkan produk dari halaman produk
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      
      {/* HEADER */}
      <View style={[styles.header, { paddingHorizontal: layout.padding }]}>
        <View>
          <Text style={[styles.headerTitle, { fontSize: layout.titleSize }]}>
            Cart
          </Text>
          <Text style={styles.headerSub}>
            {itemCount} item dipilih
          </Text>
        </View>

        <TouchableOpacity style={styles.clearBtn} onPress={handleClearCart}>
          <Text style={styles.clearBtnText}>Kosongkan</Text>
        </TouchableOpacity>
      </View>

      {/* LIST */}
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <CartItem item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: layout.padding,
          paddingBottom: 32,
        }}
        ListFooterComponent={
          <View style={styles.summary}>
            
            {/* SUMMARY CARD */}
            <View style={[styles.summaryCard, { borderRadius: layout.cardRadius }]}>
              <Text style={styles.summaryTitle}>RINGKASAN BELANJA</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>
                  Subtotal ({itemCount} item)
                </Text>
                <Text style={styles.summaryValue}>
                  Rp {total.toLocaleString('id-ID')}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>PPN 11%</Text>
                <Text style={styles.summaryValue}>
                  Rp {tax.toLocaleString('id-ID')}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Ongkir</Text>
                <Text style={[styles.summaryValue, styles.freeText]}>
                  Gratis
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  Rp {grandTotal.toLocaleString('id-ID')}
                </Text>
              </View>
            </View>

            {/* CHECKOUT BUTTON */}
            <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Checkout</Text>
              <Text style={styles.checkoutSub}>
                Rp {grandTotal.toLocaleString('id-ID')}
              </Text>
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
    paddingTop: 16,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    borderBottomWidth: 1,
    borderBottomColor: '#EDEBE5',
  },

  headerTitle: {
    fontWeight: '700',
    color: '#1A1916',
  },

  headerSub: {
    fontSize: 13,
    color: '#8C8880',
    marginTop: 2,
  },

  clearBtn: {
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

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyEmoji: {
    fontSize: 56,
    marginBottom: 16,
    opacity: 0.4,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1916',
    marginBottom: 6,
  },

  emptySub: {
    fontSize: 13,
    color: '#8C8880',
  },

  summary: {
    marginTop: 8,
  },

  summaryCard: {
    backgroundColor: '#fff',
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

  summaryLabel: {
    fontSize: 13,
    color: '#8C8880',
  },

  summaryValue: {
    fontSize: 13,
    color: '#1A1916',
    fontWeight: '500',
  },

  freeText: {
    color: '#2D9B5A',
  },

  divider: {
    height: 1,
    backgroundColor: '#EDEBE5',
    marginVertical: 12,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1916',
  },

  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1916',
  },

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
