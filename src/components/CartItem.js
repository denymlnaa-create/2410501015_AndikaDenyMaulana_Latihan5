import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { incrementQty, decrementQty, removeItem } from '../store/cartSlice';

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{item.emoji}</Text>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.subtotal}>
          Rp {(item.price * item.quantity).toLocaleString('id-ID')}
        </Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() => dispatch(decrementQty(item.id))}
        >
          <Text style={styles.qtyBtnText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.qtyNum}>{item.quantity}</Text>
        <TouchableOpacity
          style={[styles.qtyBtn, styles.qtyBtnFill]}
          onPress={() => dispatch(incrementQty(item.id))}
        >
          <Text style={[styles.qtyBtnText, { color: '#fff' }]}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => dispatch(removeItem(item.id))}
        >
          <Text style={styles.removeBtnText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EDEBE5',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emoji: {
    fontSize: 28,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1916',
  },
  category: {
    fontSize: 11,
    color: '#B0AA9E',
  },
  subtotal: {
    fontSize: 12,
    color: '#8C8880',
    marginTop: 2,
    fontWeight: '500',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EDEBE5',
    backgroundColor: '#FAFAF8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnFill: {
    backgroundColor: '#C17F3E',
    borderColor: '#C17F3E',
  },
  qtyBtnText: {
    fontSize: 15,
    color: '#1A1916',
    lineHeight: 18,
    fontWeight: '500',
  },
  qtyNum: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1916',
    minWidth: 18,
    textAlign: 'center',
  },
  removeBtn: {
    marginLeft: 4,
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeBtnText: {
    fontSize: 11,
    color: '#E24B4A',
    fontWeight: '600',
  },
});
