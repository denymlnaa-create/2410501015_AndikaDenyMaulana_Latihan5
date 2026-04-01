// src/screens/ProductList.js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

const CATEGORIES = ['Semua', 'Peripherals', 'Display', 'Accessories', 'Storage', 'Audio'];

export default function ProductList() {
  const [activeCategory, setActiveCategory] = useState('Semua');

  // useSelector: ambil jumlah item dari Redux store
  const cartCount = useSelector(state =>
    state.cart.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  const filtered = activeCategory === 'Semua'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Tech Store</Text>
          <Text style={styles.headerSub}>{products.length} produk tersedia</Text>
        </View>
        {cartCount > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartCount} item di cart</Text>
          </View>
        )}
      </View>

      {/* Filter Chips */}
      <View style={styles.filterWrap}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, activeCategory === cat && styles.chipActive]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.chipText, activeCategory === cat && styles.chipTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Product Grid */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.col}>
            <ProductCard product={item} />
          </View>
        )}
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
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  cartBadge: {
    backgroundColor: '#C17F3E15',
    borderWidth: 1,
    borderColor: '#C17F3E40',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 4,
  },
  cartBadgeText: {
    fontSize: 12,
    color: '#C17F3E',
    fontWeight: '600',
  },
  filterWrap: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEBE5',
  },
  filterRow: {
    paddingHorizontal: 20,
    gap: 8,
    flexDirection: 'row',
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EDEBE5',
    backgroundColor: '#fff',
  },
  chipActive: {
    backgroundColor: '#1A1916',
    borderColor: '#1A1916',
  },
  chipText: {
    fontSize: 12,
    color: '#8C8880',
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#F7F6F3',
  },
  list: {
    padding: 12,
    paddingBottom: 24,
  },
  row: {
    gap: 10,
  },
  col: {
    flex: 1,
  },
});
