import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

const CATEGORIES = ['Semua', 'Smartphone', 'Camera', 'Display', 'Accessories', 'Storage', 'Audio'];

export default function ProductList() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const { width } = useWindowDimensions();

  const layout = useMemo(() => {
    const isSmall = width < 360;
    const isTablet = width >= 600;

    return {
      numColumns: isSmall ? 1 : isTablet ? 3 : 2,
      padding: isSmall ? 8 : isTablet ? 24 : 16,
      gap: isSmall ? 0 : 12,
      titleSize: isSmall ? 22 : isTablet ? 30 : 26,
    };
  }, [width]);

  const cartCount = useSelector(state =>
    state.cart.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  const filtered = useMemo(() => {
    if (activeCategory === 'Semua') return products;
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <SafeAreaView style={styles.safe}>
      
      <View style={[styles.header, { paddingHorizontal: layout.padding }]}>
        <View>
          <Text style={[styles.headerTitle, { fontSize: layout.titleSize }]}>
            Tech Store
          </Text>
          <Text style={styles.headerSub}>
            {filtered.length} produk tersedia
          </Text>
        </View>

        {cartCount > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>
              {cartCount} item
            </Text>
          </View>
        )}
      </View>

      <View style={styles.filterWrap}>
        <ScrollView
        key={CATEGORIES.join('-')}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.filterRow,
            { paddingHorizontal: layout.padding },
          ]}
        >
          {CATEGORIES.map(cat => {
            const active = activeCategory === cat;

            return (
              <TouchableOpacity
                key={cat}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setActiveCategory(cat)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        numColumns={layout.numColumns}
        key={layout.numColumns} 
        columnWrapperStyle={
          layout.numColumns > 1
            ? { gap: layout.gap, marginBottom: layout.gap }
            : null
        }
        contentContainerStyle={{
          paddingHorizontal: layout.padding,
          paddingVertical: 12,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
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
    paddingTop: 10,
  },

  header: {
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
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

  cartBadge: {
    backgroundColor: '#C17F3E20',
    borderWidth: 1,
    borderColor: '#C17F3E40',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
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
    flexDirection: 'row',
    gap: 8,
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

  col: {
    flex: 1,
  },
});