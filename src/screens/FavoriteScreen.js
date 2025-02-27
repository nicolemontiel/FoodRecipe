import React from "react";
import { 
  View, 
  Text, 
  FlatList, // Ensuring FlatList is imported and used
  Image, // Ensuring Image is imported and used
  StyleSheet, 
  TouchableOpacity 
} from "react-native"; // Import from react-native
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function FavoriteScreen() {
  const navigation = useNavigation();

  // Retrieving favorite recipes from Redux store
  const favoriteRecipes = useSelector((state) => state.favorites);
  const favoriteRecipesList = favoriteRecipes?.favoriterecipes || [];

  // Handling empty state
  if (favoriteRecipesList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite recipes yet!</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>My Favorite Recipes</Text>

      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Go back</Text>
      </TouchableOpacity>

      {/* Favorite Recipes List */}
      <FlatList
        data={favoriteRecipesList}
        keyExtractor={(item) => item.idFood.toString()} // Fix: Use idFood to match favoritesSlice.js
        contentContainerStyle={styles.listContentContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() =>
              navigation.navigate("RecipeDetail", {
                recipe: {
                  idFood: item.idFood, // Fix: Ensure correct ID reference
                  recipeName: item.recipeName, // Standardizing name field
                  recipeImage: item.recipeImage, // Standardizing image field
                  recipeCategory: item.recipeCategory || "Uncategorized",
                  ingredients: item.ingredients || [],
                  recipeInstructions:
                    item.recipeInstructions || "No instructions provided.",
                },
              })
            }
          >
            {/* Image now correctly displayed */}
            <Image source={{ uri: item.recipeImage }} style={styles.recipeImage} />
            <Text style={styles.recipeTitle}>
              {item.recipeName.length > 20 ? `${item.recipeName.substring(0, 20)}...` : item.recipeName}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  heading: {
    fontSize: hp(3.8),
    marginTop: hp(4),
    marginLeft: wp(4),
    fontWeight: "bold",
    color: "#374151",
  },
  backButton: {
    backgroundColor: "#2563EB",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 100,
    alignItems: "center",
    marginLeft: wp(4),
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: hp(2.5),
    color: "#6B7280",
  },
  listContentContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  cardContainer: {
    backgroundColor: "white",
    marginBottom: hp(2),
    padding: wp(4),
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  recipeImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: 10,
    marginRight: wp(4),
  },
  recipeTitle: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#4B5563",
  },
});

