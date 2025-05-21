import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from 'expo-router';

export default function PackagesScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 24,
      backgroundColor: colors.primary,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.white,
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: 16,
      color: colors.white,
      opacity: 0.9,
    },
    content: {
      padding: 24,
    },
    packageCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      marginBottom: 24,
      padding: 4,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 2,
    },
    popularBadge: {
      position: 'absolute',
      top: 0,
      right: 20,
      backgroundColor: colors.accent,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      zIndex: 1,
    },
    popularBadgeText: {
      color: colors.white,
      fontWeight: 'bold',
      fontSize: 12,
    },
    packageCardInner: {
      borderRadius: 8,
      padding: 20,
    },
    packageHeader: {
      marginBottom: 16,
    },
    packageName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    packagePrice: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 8,
    },
    packageDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 16,
    },
    featureList: {
      marginBottom: 20,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    featureIcon: {
      marginRight: 12,
    },
    featureText: {
      fontSize: 14,
      color: colors.text,
    },
    selectButton: {
      backgroundColor: colors.primaryLight,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    selectedButton: {
      backgroundColor: colors.primary,
    },
    selectButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.primary,
    },
    selectedButtonText: {
      color: colors.white,
    },
    compareContainer: {
      marginTop: 16,
      marginBottom: 32,
    },
    compareTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
    },
    compareTable: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      overflow: 'hidden',
    },
    compareRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    compareRowLast: {
      borderBottomWidth: 0,
    },
    compareHeaderCell: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.primaryLight,
    },
    compareCell: {
      flex: 1,
      padding: 16,
    },
    compareFeature: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.text,
    },
    comparePlan: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.primary,
      textAlign: 'center',
    },
    checkIcon: {
      alignSelf: 'center',
    },
    crossIcon: {
      alignSelf: 'center',
    },
    ctaContainer: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 24,
      marginBottom: 24,
    },
    ctaTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.white,
      marginBottom: 8,
      textAlign: 'center',
    },
    ctaDescription: {
      fontSize: 14,
      color: colors.white,
      opacity: 0.9,
      textAlign: 'center',
      marginBottom: 16,
    },
    ctaButton: {
      backgroundColor: colors.white,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    ctaButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.primary,
    },
  });

  const packages = [
    {
      id: 'basic',
      name: 'Basic Will',
      price: '$99',
      description: 'Ideal for individuals with simple estates and straightforward inheritance wishes.',
      features: [
        'Legally valid will document',
        'Name beneficiaries for your assets',
        'Appoint executors',
        'Digital copy of your will',
        'Email support',
      ],
      isPopular: false,
    },
    {
      id: 'standard',
      name: 'Standard Will',
      price: '$199',
      description: 'Perfect for individuals or couples with children and more complex asset distribution needs.',
      features: [
        'Everything in Basic Will',
        'Assign guardians for minor children',
        'Create specific bequests',
        'Will storage for 10 years',
        'Priority email support',
        'One free update per year',
      ],
      isPopular: true,
    },
    {
      id: 'premium',
      name: 'Premium Estate Plan',
      price: '$299',
      description: 'Comprehensive estate planning for those with complex assets or business interests.',
      features: [
        'Everything in Standard Will',
        'Living trust creation',
        'Power of attorney documents',
        'Healthcare directives',
        'Lifetime will storage',
        'Unlimited updates',
        'Priority phone support',
      ],
      isPopular: false,
    }
  ];

  const compareFeatures = [
    'Legally valid will document',
    'Digital copy of your will',
    'Assign guardians for minor children',
    'Will storage',
    'Free updates',
    'Living trust creation',
    'Phone support',
  ];

  const handleSelectPackage = (packageId) => {
    setSelectedPackage(packageId);
    // In a real app, you might store this selection or proceed to payment
  };

  const handlePurchase = () => {
    if (selectedPackage) {
      // In a real app, you would handle the purchase process
      // For now, we'll just navigate to the will form
      router.push('/(tabs)/will');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Choose Your Package</Text>
        <Text style={styles.headerSubtitle}>Select the package that best fits your needs and budget</Text>
      </View>

      <View style={styles.content}>
        {packages.map((pkg) => (
          <View key={pkg.id} style={styles.packageCard}>
            {pkg.isPopular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
              </View>
            )}
            <View style={[
              styles.packageCardInner,
              selectedPackage === pkg.id && { borderColor: colors.primary, borderWidth: 2 }
            ]}>
              <View style={styles.packageHeader}>
                <Text style={styles.packageName}>{pkg.name}</Text>
                <Text style={styles.packagePrice}>{pkg.price}</Text>
                <Text style={styles.packageDescription}>{pkg.description}</Text>
              </View>

              <View style={styles.featureList}>
                {pkg.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Ionicons 
                      name="checkmark-circle" 
                      size={20} 
                      color={colors.success} 
                      style={styles.featureIcon}
                    />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity 
                style={[
                  styles.selectButton,
                  selectedPackage === pkg.id && styles.selectedButton
                ]}
                onPress={() => handleSelectPackage(pkg.id)}
              >
                <Text 
                  style={[
                    styles.selectButtonText,
                    selectedPackage === pkg.id && styles.selectedButtonText
                  ]}
                >
                  {selectedPackage === pkg.id ? 'Selected' : 'Select Package'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {selectedPackage && (
          <View style={styles.ctaContainer}>
            <Text style={styles.ctaTitle}>Ready to Secure Your Legacy?</Text>
            <Text style={styles.ctaDescription}>Click below to purchase your selected package and start creating your will.</Text>
            <TouchableOpacity style={styles.ctaButton} onPress={handlePurchase}>
              <Text style={styles.ctaButtonText}>Purchase Now</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.compareContainer}>
          <Text style={styles.compareTitle}>Compare Packages</Text>
          
          <View style={styles.compareTable}>
            <View style={styles.compareRow}>
              <View style={styles.compareHeaderCell}>
                <Text style={styles.compareFeature}>Features</Text>
              </View>
              <View style={styles.compareHeaderCell}>
                <Text style={styles.comparePlan}>Basic</Text>
              </View>
              <View style={styles.compareHeaderCell}>
                <Text style={styles.comparePlan}>Standard</Text>
              </View>
              <View style={styles.compareHeaderCell}>
                <Text style={styles.comparePlan}>Premium</Text>
              </View>
            </View>

            {compareFeatures.map((feature, index) => (
              <View 
                key={index} 
                style={[
                  styles.compareRow,
                  index === compareFeatures.length - 1 && styles.compareRowLast
                ]}
              >
                <View style={styles.compareCell}>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
                <View style={styles.compareCell}>
                  {index < 2 ? (
                    <Ionicons 
                      name="checkmark-circle" 
                      size={20} 
                      color={colors.success} 
                      style={styles.checkIcon}
                    />
                  ) : (
                    <Ionicons 
                      name="close-circle" 
                      size={20} 
                      color={colors.textSecondary} 
                      style={styles.crossIcon}
                    />
                  )}
                </View>
                <View style={styles.compareCell}>
                  {index < 5 ? (
                    <Ionicons 
                      name="checkmark-circle" 
                      size={20} 
                      color={colors.success} 
                      style={styles.checkIcon}
                    />
                  ) : (
                    <Ionicons 
                      name="close-circle" 
                      size={20} 
                      color={colors.textSecondary} 
                      style={styles.crossIcon}
                    />
                  )}
                </View>
                <View style={styles.compareCell}>
                  <Ionicons 
                    name="checkmark-circle" 
                    size={20} 
                    color={colors.success} 
                    style={styles.checkIcon}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}