import { StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

import useBooks from "../../../hooks/useBooks";

import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import ThemedInput from "../../../components/ThemedInput";
import ThemedButton from "../../../components/ThemedButton";
import ThemedError from "../../../components/ThemedError";
import ThemedLoading from "../../../components/ThemedLoading";

const Create = () => {
  const { createBook, loading } = useBooks();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");

  const [error, setError] = useState("");

  const handleCreateBook = async () => {
    try {
      setError("");

      if (!title.trim()) {
        setError("Please enter a book title.");
        return;
      }

      if (!author.trim()) {
        setError("Please enter the author name.");
        return;
      }

      if (!description.trim()) {
        setError("Please enter a description.");
        return;
      }

      if (!rating.trim()) {
        setError("Please enter a rating.");
        return;
      }

      const numericRating = Number(rating);

      if (
        Number.isNaN(numericRating) ||
        numericRating < 1 ||
        numericRating > 5
      ) {
        setError("Rating must be between 1 and 5.");
        return;
      }

      await createBook(
        title.trim(),
        author.trim(),
        description.trim(),
        numericRating,
      );

      setTitle("");
      setAuthor("");
      setDescription("");
      setRating("");

      router.replace("/books");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <ThemedLoading />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView safeArea style={styles.container}>
        <ThemedText style={styles.title}>Add New Book</ThemedText>

        <ThemedInput
          placeholder="Book Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <ThemedInput
          placeholder="Author"
          value={author}
          onChangeText={setAuthor}
          style={styles.input}
        />

        <ThemedInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          style={[styles.input, styles.descriptionInput]}
        />

        <ThemedInput
          placeholder="Rating (1 - 5)"
          value={rating}
          onChangeText={setRating}
          keyboardType="decimal-pad"
          style={styles.input}
        />

        {error && <ThemedError>{error}</ThemedError>}

        <ThemedButton title="Create Book" onPress={handleCreateBook} />
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    width: "80%",
  },

  descriptionInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
