import { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Switch, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { theme, colors, toggleTheme } = useTheme();
  const router = useRouter();
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    planType: 'Standard Will',
    planExpiry: '15 Dec, 2025',
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.primary,
      padding: 24,
      alignItems: 'center',
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    avatarIcon: {
      color: colors.primary,
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.white,
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 14,
      color: colors.white,
      opacity: 0.9,
    },
    content: {
      padding: 24,
    },
    card: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      padding: 20,
      marginBottom: 24,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 2,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    infoItemLast: {
      marginBottom: 0,
    },
    infoIcon: {
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoTextContainer: {
      flex: 1,
      marginLeft: 8,
    },
    infoLabel: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    infoValue: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '500',
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
      paddingVertical: 4,
    },
    settingItemLast: {
      marginBottom: 0,
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    settingIcon: {
      marginRight: 12,
    },
    settingLabel: {
      fontSize: 16,
      color: colors.text,
    },
    themeLabel: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    logoutButton: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoutText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.error,
      marginLeft: 8,
    },
    planBadge: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      backgroundColor: colors.primary,
      borderRadius: 4,
      alignSelf: 'flex-start',
      marginBottom: 8,
    },
    planBadgeText: {
      color: colors.white,
      fontSize: 12,
      fontWeight: 'bold',
    },
    planExpiryText: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    editButton: {
      position: 'absolute',
      right: 16,
      top: 16,
      backgroundColor: colors.white,
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    },
  });

  const handleLogout = () => {
    // In a real app, you would handle logout functionality here
    router.replace('/auth/login');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={60} style={styles.avatarIcon} />
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create" size={20} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Personal Information</Text>
          
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="mail" size={24} color={colors.primary} />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="call" size={24} color={colors.primary} />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{user.phone}</Text>
            </View>
          </View>
          
          <View style={[styles.infoItem, styles.infoItemLast]}>
            <View style={styles.infoIcon}>
              <Ionicons name="document-text" size={24} color={colors.primary} />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Active Plan</Text>
              <View style={styles.planBadge}>
                <Text style={styles.planBadgeText}>{user.planType}</Text>
              </View>
              <Text style={styles.planExpiryText}>Valid until {user.planExpiry}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>App Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons 
                name={theme === 'dark' ? 'moon' : 'sunny'} 
                size={24} 
                color={colors.primary} 
                style={styles.settingIcon} 
              />
              <View>
                <Text style={styles.settingLabel}>Dark Mode</Text>
                <Text style={styles.themeLabel}>{theme === 'dark' ? 'On' : 'Off'}</Text>
              </View>
            </View>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={colors.primary}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications" size={24} color={colors.primary} style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Notifications</Text>
            </View>
            <Switch
              value={true}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={colors.primary}
            />
          </View>
          
          <View style={[styles.settingItem, styles.settingItemLast]}>
            <View style={styles.settingLeft}>
              <Ionicons name="lock-closed" size={24} color={colors.primary} style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Privacy Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Support</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="help-circle" size={24} color={colors.primary} style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Help Center</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </View>
          
          <View style={[styles.settingItem, styles.settingItemLast]}>
            <View style={styles.settingLeft}>
              <Ionicons name="chatbubble-ellipses" size={24} color={colors.primary} style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Contact Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={20} color={colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}