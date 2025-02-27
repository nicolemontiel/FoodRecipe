import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
  } from "react-native";
  import React from "react";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import { useNavigation } from "@react-navigation/native";
  import { useDispatch, useSelector } from "react-redux"; 
  import { toggleFavorite } from "../redux/favoritesSlice"; 
  
  export default function RecipeDetailScreen(props) {
    const recipe = props.route.params.recipe;
  
    const dispatch = useDispatch();
    const favoriterecipes = useSelector(
      (state) => state.favorites.favoriterecipes
    );
    const isFavourite = favoriterecipes?.some(
      (favrecipe) => favrecipe.idFood === recipe.idFood
    ); 
  
    const navigation = useNavigation();
  
    const handleToggleFavorite = () => {
      dispatch(toggleFavorite(recipe)); 
    };
  
    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Recipe Image with Back & Favorite Buttons */}
        <View style={styles.imageContainer} testID="imageContainer">
          <Image source={{ uri: recipe.recipeImage }} style={styles.recipeImage} />
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
            <Text style={styles.favoriteButtonText}>{isFavourite ? "♥" : "♡"}</Text>
          </TouchableOpacity>
        </View>
  
        {/* Recipe Details */}
        <View style={styles.contentContainer}>
          <View style={styles.recipeDetailsContainer}>
            <Text style={styles.recipeTitle}>{recipe.recipeName}</Text>
            <Text style={styles.recipeCategory}>{recipe.recipeCategory}</Text>
          </View>
  
          {/* Time, Servings, Calories, Difficulty */}
          <View style={styles.miscContainer}>
            <View style={styles.miscItem}>
              <Text style={styles.miscIcon}>🕒</Text>
              <Text style={styles.miscText}>35 Mins</Text>
            </View>
            <View style={styles.miscItem}>
              <Text style={styles.miscIcon}>👥</Text>
              <Text style={styles.miscText}>03 Servings</Text>
            </View>
            <View style={styles.miscItem}>
              <Text style={styles.miscIcon}>🔥</Text>
              <Text style={styles.miscText}>103 Cal</Text>
            </View>
            <View style={styles.miscItem}>
              <Text style={styles.miscIcon}>🎚️</Text>
              <Text style={styles.miscText}>Medium</Text>
            </View>
          </View>
  
          {/* Ingredients Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsList}>
              {recipe.ingredients.map((i, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <View style={styles.ingredientBullet} />
                  <Text style={styles.ingredientText}>
                    {i.ingredientName} {i.measure}
                  </Text>
                </View>
              ))}
            </View>
          </View>
  
          {/* Instructions Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            <Text style={styles.instructionsText}>
              {recipe.recipeInstructions}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 30,
    },
    imageContainer: {
      position: "relative",
      alignItems: "center",
      marginBottom: 10,
    },
    recipeImage: {
      width: wp(100),
      height: hp(40), 
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    backButton: {
      position: "absolute",
      top: hp(5),
      left: wp(5),
      backgroundColor: "rgba(255,255,255,0.7)",
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 20,
    },
    backButtonText: {
      fontSize: hp(2),
      fontWeight: "bold",
      color: "#333",
    },
    favoriteButton: {
      position: "absolute",
      top: hp(5),
      right: wp(5),
      backgroundColor: "rgba(255,255,255,0.7)",
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 20,
    },
    favoriteButtonText: {
      fontSize: hp(3),
      color: "red",
    },
    contentContainer: {
      paddingHorizontal: wp(4),
      paddingTop: hp(2),
    },
    recipeDetailsContainer: {
      marginBottom: hp(1),
      alignItems: "center",
    },
    recipeTitle: {
      fontSize: hp(3),
      fontWeight: "bold",
      color: "#4B5563",
    },
    recipeCategory: {
      fontSize: hp(2),
      color: "#9CA3AF",
    },
    miscContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginBottom: 15,
      paddingHorizontal: wp(2),
    },
    miscItem: {
      alignItems: "center",
      backgroundColor: "#F5F5F5",
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 10,
    },
    miscText: {
      fontSize: hp(1.8),
      fontWeight: "600",
    },
    sectionContainer: {
      marginHorizontal: wp(4),
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: hp(2.4),
      fontWeight: "bold",
      color: "#333",
      marginBottom: 6,
    },
    ingredientsList: {
      paddingLeft: wp(3),
    },
    ingredientItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: hp(0.5),
      padding: 10,
      backgroundColor: "#FFF9E1",
      borderRadius: 6,
    },
    ingredientBullet: {
      backgroundColor: "#FFD700",
      borderRadius: 50,
      height: hp(1.2),
      width: hp(1.2),
      marginRight: wp(2),
    },
    ingredientText: {
      fontSize: hp(1.8),
      color: "#333",
    },
    instructionsText: {
      fontSize: hp(1.8),
      color: "#444",
      lineHeight: hp(2.5),
      textAlign: "justify",
    },
  });
  