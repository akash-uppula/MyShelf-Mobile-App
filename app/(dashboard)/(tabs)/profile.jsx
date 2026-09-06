import { StyleSheet, View, useColorScheme } from "react-native";

import useAuth from "../../../hooks/useAuth";
import Colors from "../../../constants/Colors";

import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import ThemedButton from "../../../components/ThemedButton";
import ThemedLoading from "../../../components/ThemedLoading";

const Profile = () => {
  const { user, logout, loading } = useAuth();

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("Logout Error:", error.message);
    }
  };

  if (loading) {
    return <ThemedLoading />;
  }

  return (
    <ThemedView safeArea style={styles.container}>
      <View style={styles.profileHeader}>
        <View
          style={[
            styles.avatar,
            {
              backgroundColor: colors.primary,
            },
          ]}
        >
          <ThemedText
            style={[
              styles.avatarText,
              {
                color: colors.primaryText,
              },
            ]}
          >
            {user?.name?.charAt(0)?.toUpperCase()}
          </ThemedText>
        </View>

        <ThemedText style={styles.name}>{user?.name}</ThemedText>

        <ThemedText
          style={[
            styles.email,
            {
              color: colors.secondaryText,
            },
          ]}
        >
          {user?.email}
        </ThemedText>
      </View>

      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <ThemedText style={styles.sectionTitle}>Account Information</ThemedText>

        <View style={styles.infoRow}>
          <ThemedText
            style={[
              styles.label,
              {
                color: colors.secondaryText,
              },
            ]}
          >
            Name
          </ThemedText>

          <ThemedText style={styles.value}>{user?.name}</ThemedText>
        </View>

        <View
          style={[
            styles.separator,
            {
              backgroundColor: colors.border,
            },
          ]}
        />

        <View style={styles.infoRow}>
          <ThemedText
            style={[
              styles.label,
              {
                color: colors.secondaryText,
              },
            ]}
          >
            Email
          </ThemedText>

          <ThemedText style={styles.value}>{user?.email}</ThemedText>
        </View>
      </View>

      <View style={styles.logoutContainer}>
        <ThemedButton title="Logout" onPress={handleLogout} />
      </View>
    </ThemedView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  profileHeader: {
    alignItems: "center",
    marginBottom: 35,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  avatarText: {
    fontSize: 36,
    fontWeight: "bold",
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },

  email: {
    fontSize: 15,
  },

  card: {
    width: "80%",
    borderRadius: 14,
    borderWidth: 1,
    padding: 20,
    alignSelf: "center",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },

  label: {
    fontSize: 14,
  },

  value: {
    fontSize: 15,
    fontWeight: "600",
    maxWidth: "65%",
    textAlign: "right",
  },

  separator: {
    height: 1,
    marginVertical: 8,
  },

  logoutContainer: {
    alignItems: "center",
    marginTop: 35,
  },
});
