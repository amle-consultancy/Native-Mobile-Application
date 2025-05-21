import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    heroSection: {
      backgroundColor: colors.primary,
      padding: 24,
      alignItems: 'center',
    },
    logo: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    heroTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.white,
      textAlign: 'center',
      marginBottom: 8,
    },
    heroSubtitle: {
      fontSize: 16,
      color: colors.white,
      textAlign: 'center',
      opacity: 0.9,
      marginBottom: 24,
    },
    heroButton: {
      backgroundColor: colors.white,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    heroButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.primary,
      marginRight: 8,
    },
    content: {
      padding: 24,
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
    },
    featureCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 2,
    },
    featureIcon: {
      width: 60,
      height: 60,
      backgroundColor: colors.primaryLight,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    featureTextContainer: {
      flex: 1,
    },
    featureTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    featureDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    callToAction: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 24,
      alignItems: 'center',
      marginTop: 16,
      marginBottom: 24,
    },
    ctaTitle: {
      fontSize: 20,
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
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    ctaButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.primary,
    },
    testimonialSection: {
      marginTop: 16,
      marginBottom: 24,
    },
    testimonialCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 2,
    },
    testimonialText: {
      fontSize: 14,
      fontStyle: 'italic',
      color: colors.text,
      lineHeight: 22,
      marginBottom: 16,
    },
    testimonialAuthor: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    testimonialAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primaryLight,
      marginRight: 12,
    },
    testimonialName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    testimonialRole: {
      fontSize: 12,
      color: colors.textSecondary,
    },
  });

  const features = [
    {
      icon: 'shield-checkmark',
      title: 'Legally Valid',
      description: 'Our will documents are legally valid and recognized in courts across the country.'
    },
    {
      icon: 'document-text',
      title: 'Easy to Complete',
      description: 'Step-by-step guidance with simple forms makes creating your will straightforward.'
    },
    {
      icon: 'lock-closed',
      title: 'Secure & Confidential',
      description: 'Your information is encrypted and kept completely confidential at all times.'
    },
    {
      icon: 'refresh',
      title: 'Free Updates',
      description: 'Update your will anytime as your life circumstances change.'
    }
  ];

  const testimonials = [
    {
      text: 'WillMaker made the process so easy that I was able to complete my will in just one sitting. The guidance provided was clear and helpful.',
      name: 'Sarah Johnson',
      role: 'Business Owner'
    },
    {
      text: 'I had been putting off creating a will for years because I thought it would be complicated. WillMaker changed that completely!',
      name: 'Michael Chen',
      role: 'Financial Analyst'
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.heroSection}>
        <View style={styles.logo}>
          <Ionicons name="document-text" size={40} color={colors.primary} />
        </View>
        <Text style={styles.heroTitle}>Welcome to WillMaker</Text>
        <Text style={styles.heroSubtitle}>Secure your legacy and protect your loved ones with a legally valid will</Text>
        <TouchableOpacity style={styles.heroButton} onPress={() => router.push('/(tabs)/will')}>
          <Text style={styles.heroButtonText}>Create Your Will</Text>
          <Ionicons name="arrow-forward" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Why Choose WillMaker?</Text>
        
        {features.map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name={feature.icon} size={30} color={colors.primary} />
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          </View>
        ))}

        <View style={styles.callToAction}>
          <Text style={styles.ctaTitle}>Peace of Mind is Just a Few Steps Away</Text>
          <Text style={styles.ctaDescription}>Join thousands who have secured their legacy with WillMaker. Our simple process takes less than 30 minutes.</Text>
          <TouchableOpacity style={styles.ctaButton} onPress={() => router.push('/(tabs)/packages')}>
            <Text style={styles.ctaButtonText}>View Packages</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>What Our Customers Say</Text>
        
        <View style={styles.testimonialSection}>
          {testimonials.map((testimonial, index) => (
            <View key={index} style={styles.testimonialCard}>
              <Text style={styles.testimonialText}>"{testimonial.text}"</Text>
              <View style={styles.testimonialAuthor}>
                <View style={styles.testimonialAvatar}>
                  <Ionicons name="person" size={24} color={colors.primary} />
                </View>
                <View>
                  <Text style={styles.testimonialName}>{testimonial.name}</Text>
                  <Text style={styles.testimonialRole}>{testimonial.role}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}