import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import { ms } from 'react-native-size-matters';
import { supabase } from '../../../utils/supabase';

const FAQItem = ({ item }) => (
  <View style={styles.faqItem}>
    <Text style={styles.question}>{item.question}</Text>
    <Text style={styles.answer}>{item.answer}</Text>
  </View>
);

const FAQScreen = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('faq')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        throw error;
      }

      setFaqs(data);
    } catch (error) {
      console.error('Error fetching FAQs:', error.message);
      // You might want to show an error message to the user here
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centeredContainer]}>
        <ActivityIndicator size="large" color="#EA1D25" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader title='FAQs' route='info' />
      <FlatList
        data={faqs}
        renderItem={({ item }) => <FAQItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No FAQs available at the moment.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 15,
  },
  faqItem: {
    marginBottom: 20,
  },
  question: {
    fontFamily: 'Outfit-Bold',
    fontSize: ms(18),
    color: '#EA1D25',
    marginBottom: 5,
  },
  answer: {
    fontFamily: 'Outfit-Regular',
    fontSize: ms(16),
    color: '#333',
    lineHeight: ms(22),
  },
  emptyText: {
    fontFamily: 'Outfit-Regular',
    fontSize: ms(16),
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FAQScreen;