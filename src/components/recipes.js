import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function Recipe({ foods }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View testID="recipesDisplay">
        <FlatList
          data={foods}
          numColumns={2} // Display recipes in a grid with two columns
          keyExtractor={(item) => item.idFood}
          renderItem={({ item, index }) => (
            <ArticleCard item={item} index={index} navigation={navigation} />
          )}
          columnWrapperStyle={styles.row} // Ensure even spacing between columns
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const ArticleCard = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate("RecipeDetail", { recipe: item })} // Navigate to details
      testID="articleDisplay"
    >
      <Image source={{ uri: item.recipeImage }} style={styles.articleImage} />
      <Text style={styles.articleText} numberOfLines={1}>
        {item.recipeName}
      </Text>
      <Text style={styles.articleDescription} numberOfLines={2}>
        {item.cookingDescription}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },
  row: {
    justifyContent: "space-between", // Ensures even spacing between columns
  },
  cardContainer: {
    flex: 1,
    marginBottom: hp(2),
    paddingHorizontal: wp(2),
  },
  articleImage: {
    width: "100%",
    height: hp(20),
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  articleText: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#52525B",
    marginTop: hp(1),
  },
  articleDescription: {
    fontSize: hp(1.5),
    color: "#6B7280",
    marginTop: hp(0.5),
  },
});

