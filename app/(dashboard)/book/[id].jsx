import { useEffect, useState } from "react";
import {
  Keyboard,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import Colors from "../../../constants/Colors";
import useBooks from "../../../hooks/useBooks";

import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import ThemedButton from "../../../components/ThemedButton";
import ThemedLoading from "../../../components/ThemedLoading";
import ThemedError from "../../../components/ThemedError";
import ThemedCard from "../../../components/ThemedCard";
import ThemedAlert from "../../../components/ThemedAlert";
import ThemedInput from "../../../components/ThemedInput";

const BookDetail = () => {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const { books, loading, error, updateBook, deleteBook } = useBooks();

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState("");

  const book = books.find((item) => item.$id === id);

  useEffect(() => {
    if (book) {
      setTitle(book.title ?? "");
      setAuthor(book.author ?? "");
      setDescription(book.description ?? "");
      setRating(String(book.rating ?? ""));
    }
  }, [book]);

  const openEditModal = () => {
    if (!book) return;

    setTitle(book.title ?? "");
    setAuthor(book.author ?? "");
    setDescription(book.description ?? "");
    setRating(String(book.rating ?? ""));
    setFormError("");
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setFormError("");
  };

  const handleUpdateBook = async () => {
    try {
      setFormError("");

      if (!title.trim()) {
        setFormError("Please enter a book title.");
        return;
      }

      if (!author.trim()) {
        setFormError("Please enter the author name.");
        return;
      }

      if (!description.trim()) {
        setFormError("Please enter a description.");
        return;
      }

      if (!rating.trim()) {
        setFormError("Please enter a rating.");
        return;
      }

      const numericRating = Number(rating);

      if (
        Number.isNaN(numericRating) ||
        numericRating < 1 ||
        numericRating > 5
      ) {
        setFormError("Rating must be between 1 and 5.");
        return;
      }

      await updateBook(
        book.$id,
        title.trim(),
        author.trim(),
        description.trim(),
        numericRating,
      );

      closeEditModal();
    } catch (updateError) {
      setFormError(updateError.message);
    }
  };

  const handleDeleteBook = async () => {
    try {
      setShowDeleteAlert(false);

      await deleteBook(book.$id);

      router.replace("/books");
    } catch (deleteError) {
      console.log("Delete Book Error:", deleteError);
    }
  };

  if (loading && !book) {
    return <ThemedLoading />;
  }

  if (error) {
    return (
      <ThemedView safeArea style={styles.container}>
        <ThemedError>{error}</ThemedError>
      </ThemedView>
    );
  }

  if (!book) {
    return (
      <ThemedView safeArea style={styles.container}>
        <ThemedView style={styles.notFoundContainer}>
          <ThemedText style={styles.notFoundTitle}>Book not found</ThemedText>

          <ThemedText style={styles.notFoundText}>
            This book could not be found.
          </ThemedText>

          <ThemedButton title="Go Back" onPress={() => router.back()} />
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView safeArea style={styles.container}>
      <ThemedCard style={styles.card}>
        <ThemedText style={styles.title}>{book.title}</ThemedText>

        <ThemedText style={styles.author}>by {book.author}</ThemedText>

        <ThemedView style={styles.divider} />

        <ThemedText style={styles.rating}>⭐ {book.rating}/5</ThemedText>

        <ThemedText style={styles.descriptionTitle}>Description</ThemedText>

        <ThemedText style={styles.description}>{book.description}</ThemedText>
      </ThemedCard>

      <ThemedView style={styles.actions}>
        <ThemedButton title="Update Book" onPress={openEditModal} />

        <ThemedButton
          title="Delete Book"
          variant="danger"
          onPress={() => setShowDeleteAlert(true)}
        />

        <ThemedButton
          title="Go Back"
          variant="secondary"
          onPress={() => router.back()}
        />
      </ThemedView>

      <ThemedAlert
        visible={showDeleteAlert}
        title="Delete Book?"
        message={`Are you sure you want to delete "${book.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmVariant="danger"
        onCancel={() => setShowDeleteAlert(false)}
        onConfirm={handleDeleteBook}
      />

      <Modal
        visible={showEditModal}
        transparent
        animationType="fade"
        onRequestClose={closeEditModal}
      >
        <Pressable style={styles.modalOverlay} onPress={closeEditModal}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Pressable
              style={[
                styles.editModal,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
              onPress={(event) => event.stopPropagation()}
            >
              <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                <ThemedText style={styles.editTitle}>Update Book</ThemedText>

                <ThemedInput
                  placeholder="Book Title"
                  value={title}
                  onChangeText={setTitle}
                />

                <ThemedInput
                  placeholder="Author"
                  value={author}
                  onChangeText={setAuthor}
                />

                <ThemedInput
                  placeholder="Description"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                  style={styles.descriptionInput}
                />

                <ThemedInput
                  placeholder="Rating (1 - 5)"
                  value={rating}
                  onChangeText={setRating}
                  keyboardType="decimal-pad"
                />

                {formError ? <ThemedError>{formError}</ThemedError> : null}

                <View style={styles.editButtons}>
                  <ThemedButton
                    title="Cancel"
                    variant="secondary"
                    onPress={closeEditModal}
                    style={styles.editButton}
                  />

                  <ThemedButton
                    title="Save"
                    onPress={handleUpdateBook}
                    style={styles.editButton}
                  />
                </View>
              </ScrollView>
            </Pressable>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
    </ThemedView>
  );
};

export default BookDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  card: {
    width: "80%",
    marginTop: 25,
    padding: 22,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 36,
    marginBottom: 8,
  },

  author: {
    fontSize: 17,
    marginBottom: 20,
  },

  divider: {
    height: 1,
    width: "100%",
    marginBottom: 20,
  },

  rating: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 25,
  },

  descriptionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    lineHeight: 25,
  },

  actions: {
    alignItems: "center",
    marginTop: 20,
  },

  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  notFoundTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  notFoundText: {
    fontSize: 16,
    marginBottom: 25,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  editModal: {
    width: "100%",
    maxWidth: 420,
    maxHeight: "85%",
    padding: 22,
    borderWidth: 1,
    borderRadius: 14,
  },

  editTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },

  descriptionInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },

  editButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    marginTop: 4,
  },

  editButton: {
    width: 110,
    marginVertical: 0,
  },
});
