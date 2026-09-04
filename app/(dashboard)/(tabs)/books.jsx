import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { router } from "expo-router";

import useBooks from "../../../hooks/useBooks";

import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import ThemedLoading from "../../../components/ThemedLoading";
import ThemedError from "../../../components/ThemedError";
import ThemedCard from "../../../components/ThemedCard";

const Books = () => {
  const { books, loading, error, fetchBooks } = useBooks();

  if (loading && books.length === 0) {
    return <ThemedLoading />;
  }

  return (
    <ThemedView safeArea style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>My Books</ThemedText>
      </ThemedView>

      {error && <ThemedError>{error}</ThemedError>}

      {books.length === 0 ? (
        <ThemedView style={styles.emptyContainer}>
          <ThemedText style={styles.emptyTitle}>No books yet</ThemedText>

          <ThemedText style={styles.emptyText}>
            Start building your shelf by adding a book.
          </ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.$id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchBooks} />
          }
          renderItem={({ item }) => (
            <ThemedCard onPress={() => router.push(`/book/${item.$id}`)}>
              <ThemedText style={styles.bookTitle}>{item.title}</ThemedText>

              <ThemedText style={styles.author}>by {item.author}</ThemedText>

              <ThemedText style={styles.rating}>⭐ {item.rating}/5</ThemedText>
            </ThemedCard>
          )}
        />
      )}
    </ThemedView>
  );
};

export default Books;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
  },

  list: {
    paddingBottom: 20,
  },

  bookTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  author: {
    fontSize: 15,
    marginBottom: 12,
  },

  rating: {
    fontSize: 15,
    fontWeight: "bold",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  emptyText: {
    fontSize: 15,
    textAlign: "center",
  },
});
