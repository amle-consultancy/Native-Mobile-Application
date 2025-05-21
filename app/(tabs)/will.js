import { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import WillForm from '../../components/WillForm';

// Get screen dimensions
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IS_SMALL_SCREEN = SCREEN_WIDTH < 375; // iPhone SE or similar small screens

export default function WillScreen() {
  const { colors } = useTheme();
  const [hasActivePlan, setHasActivePlan] = useState(false);
  const [willProgress, setWillProgress] = useState(0);

  // Simulating checking if user has an active plan
  useEffect(() => {
    // In a real app, you would check if user has purchased a package
    // For demo purposes, let's assume they have
    setHasActivePlan(true);
    
    // Simulate will completion progress - in a real app this would come from saved data
    setWillProgress(30); // 30% complete
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    safeArea: {
      flex: 1,
    },
    header: {
      backgroundColor: colors.primary,
      padding: IS_SMALL_SCREEN ? 16 : 24,
    },
    headerTitle: {
      fontSize: IS_SMALL_SCREEN ? 20 : 24,
      fontWeight: 'bold',
      color: colors.white,
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: IS_SMALL_SCREEN ? 14 : 16,
      color: colors.white,
      opacity: 0.9,
    },
    progressContainer: {
      backgroundColor: colors.cardBackground,
      padding: IS_SMALL_SCREEN ? 16 : 20,
      marginHorizontal: IS_SMALL_SCREEN ? 16 : 24,
      borderRadius: 12,
      marginTop: -24, // Overlap with header
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    progressText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    progressBarContainer: {
      height: 8,
      backgroundColor: colors.border,
      borderRadius: 4,
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      backgroundColor: colors.primary,
    },
    progressPercentage: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
      textAlign: 'right',
    },
    content: {
      padding: IS_SMALL_SCREEN ? 16 : 24,
    },
    noPlanContainer: {
      padding: IS_SMALL_SCREEN ? 16 : 24,
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 24,
      marginHorizontal: IS_SMALL_SCREEN ? 16 : 24,
    },
    noPlanText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    noPlanDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 16,
      textAlign: 'center',
    },
    noPlanButton: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    noPlanButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.white,
    },
    saveContainer: {
      backgroundColor: colors.cardBackground,
      padding: 16,
      borderRadius: 8,
      marginTop: 24,
      marginBottom: 16,
      flexDirection: IS_SMALL_SCREEN ? 'column' : 'row',
      alignItems: IS_SMALL_SCREEN ? 'flex-start' : 'center',
      justifyContent: 'space-between',
    },
    saveText: {
      fontSize: 14,
      color: colors.text,
      marginBottom: IS_SMALL_SCREEN ? 12 : 0,
      flex: IS_SMALL_SCREEN ? 0 : 1,
      paddingRight: IS_SMALL_SCREEN ? 0 : 8,
    },
    saveButton: {
      backgroundColor: colors.primary,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
      alignSelf: IS_SMALL_SCREEN ? 'flex-end' : 'auto',
      width: IS_SMALL_SCREEN ? '100%' : 'auto',
    },
    saveButtonText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.white,
      textAlign: IS_SMALL_SCREEN ? 'center' : 'auto',
    },
  });

  if (!hasActivePlan) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>My Will</Text>
            <Text style={styles.headerSubtitle}>Create and manage your legal will</Text>
          </View>
          
          <View style={styles.noPlanContainer}>
            <Ionicons name="alert-circle" size={60} color={colors.primary} />
            <Text style={styles.noPlanText}>No Active Plan</Text>
            <Text style={styles.noPlanDescription}>
              You need to purchase a plan before you can create your will. Browse our packages to find the right one for you.
            </Text>
            <TouchableOpacity style={styles.noPlanButton}>
              <Text style={styles.noPlanButtonText}>View Packages</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Will</Text>
          <Text style={styles.headerSubtitle}>Create and manage your legal will</Text>
        </View>

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Your Will Progress</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${willProgress}%` }]} />
          </View>
          <Text style={styles.progressPercentage}>{willProgress}% Complete</Text>
        </View>

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <WillForm />

          <View style={styles.saveContainer}>
            <Text style={styles.saveText}>Your changes are automatically saved as you type.</Text>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Will</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}