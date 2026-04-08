import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, incrementQty, decrementQty } from '../store/cartSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const layout = useMemo(() => {
    const isSmall = width < 360;

    return {
      padding: isSmall ? 12 : 16,
      emoji: isSmall ? 28 : 32,
      name: isSmall ? 14 : 15,
      price: isSmall ? 12 : 13,
      radius: isSmall ? 12 : 16,
    };
  }, [width]);

  const cartItem = useSelector(state =>
    state.cart.items.find(i => i.id === product.id)
  );

  const inCart = !!cartItem;

  return (
    <View
      style={[
        styles.card,
        {
          padding: layout.padding,
          borderRadius: layout.radius,
        },
        inCart && styles.cardActive,
      ]}
    >
      {inCart && <View style={styles.activeBar} />}

      {/* EMOJI */}
      <Text style={[styles.emoji, { fontSize: layout.emoji }]}>
        {product.emoji}
      </Text>

      {/* INFO */}
      <Text style={styles.category}>
        {product.category.toUpperCase()}
      </Text>

      <Text style={[styles.name, { fontSize: layout.name }]}>
        {product.name}
      </Text>

      {/* FOOTER */}
      <View style={styles.footer}>
        
        <View style={styles.priceWrap}>
          <Text style={[styles.price, { fontSize: layout.price }]}>
            Rp {product.price.toLocaleString('id-ID')}
          </Text>

          {inCart && (
            <Text style={styles.inCartLabel}>
              × {cartItem.quantity}
            </Text>
          )}
        </View>

        {/* ACTION */}
        {inCart ? (
          <View style={styles.qtyRow}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => dispatch(decrementQty(product.id))}
            >
              <Text style={styles.qtyBtnText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.qtyNum}>
              {cartItem.quantity}
            </Text>

            <TouchableOpacity
              style={[styles.qtyBtn, styles.qtyBtnFill]}
              onPress={() => dispatch(incrementQty(product.id))}
            >
              <Text style={[styles.qtyBtnText, styles.qtyBtnTextLight]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.8}
            onPress={() =>
              dispatch(
                addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  emoji: product.emoji,
                  category: product.category,
                })
              )
            }
          >
            <Text style={styles.addBtnText}>Tambah</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EDEBE5',
    overflow: 'hidden',

    elevation: 2,
  },

  cardActive: {
    borderColor: '#C17F3E30',
    backgroundColor: '#FEFAF5',
  },

  activeBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#C17F3E',
  },

  emoji: {
    marginBottom: 10,
  },

  category: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    color: '#B0AA9E',
    marginBottom: 4,
  },

  name: {
    fontWeight: '600',
    color: '#1A1916',
    marginBottom: 12,
    lineHeight: 20,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  priceWrap: {
    flex: 1,
  },

  price: {
    fontWeight: '700',
    color: '#1A1916',
    fontVariant: ['tabular-nums'],
  },

  inCartLabel: {
    fontSize: 11,
    color: '#C17F3E',
    marginTop: 2,
    fontWeight: '500',
  },

  addBtn: {
    backgroundColor: '#1A1916',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  addBtnText: {
    color: '#F7F6F3',
    fontSize: 12,
    fontWeight: '600',
  },

  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  qtyBtn: {
    width: 30,
    height: 30,
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
    fontSize: 16,
    color: '#1A1916',
    fontWeight: '500',
  },

  qtyBtnTextLight: {
    color: '#fff',
  },

  qtyNum: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1916',
    minWidth: 20,
    textAlign: 'center',
  },
});
