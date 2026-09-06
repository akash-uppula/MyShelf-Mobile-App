import { Modal, Pressable, StyleSheet, View, useColorScheme } from "react-native";

import Colors from "../constants/Colors";
import ThemedText from "./ThemedText";
import ThemedButton from "./ThemedButton";

const ThemedAlert = ({
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "primary",
  onConfirm,
  onCancel,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable style={styles.overlay} onPress={onCancel}>
        <Pressable
          style={[
            styles.alert,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
          onPress={(event) => event.stopPropagation()}
        >
          <ThemedText style={styles.title}>{title}</ThemedText>

          <ThemedText style={styles.message}>{message}</ThemedText>

          <View style={styles.buttons}>
            <ThemedButton
              title={cancelText}
              variant="secondary"
              onPress={onCancel}
              style={styles.button}
            />

            <ThemedButton
              title={confirmText}
              variant={confirmVariant}
              onPress={onConfirm}
              style={styles.button}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ThemedAlert;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  alert: {
    width: "100%",
    maxWidth: 400,
    padding: 22,
    borderWidth: 1,
    borderRadius: 14,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  message: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },

  button: {
    width: 110,
    marginVertical: 0,
  },
});
