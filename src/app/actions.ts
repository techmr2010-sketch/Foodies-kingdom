
'use server';
import { personalizedDishRecommendations } from '@/ai/flows/personalized-dish-recommendations';
import { findRecipe } from '@/ai/flows/recipe-finder-flow';

// A map to store mock user order history and preferences
const userProfiles = {
  'user-123': {
    orderHistory: ['Biryani Non Veg', 'Momos Non Veg Steam', 'French Fries'],
    dietaryPreferences: 'non-vegetarian',
  },
  'user-456': {
    orderHistory: ['Biryani Veg', 'Momos Veg Steam', 'Noodles'],
    dietaryPreferences: 'vegetarian',
  },
};

export async function getRecommendations(userId?: string, history?: string[], preferences?: string) {
  try {
    
    const userProfile = { 
        orderHistory: history || [], 
        dietaryPreferences: preferences || 'any' 
    };

    const recommendations = await personalizedDishRecommendations({
      userId: userId || 'anonymous',
      orderHistory: userProfile.orderHistory,
      dietaryPreferences: userProfile.dietaryPreferences,
      popularLocalChoices: ['Chicken Fried Rice', 'Roll Egg', 'Samosa', 'Biryani Veg'],
    });
    
    // Defensive check to ensure we return an array
    if (recommendations && Array.isArray(recommendations.recommendedDishes)) {
        return recommendations.recommendedDishes;
    }
    
    return [];

  } catch (error) {
    console.error("Error fetching recommendations:", error);
    // Return an empty array or a default set of recommendations in case of an error
    return [];
  }
}

export async function getRecipe(dishName: string) {
    try {
        if (!dishName) {
            return { recipe: '' };
        }
        const result = await findRecipe({ dishName });
        return result;
    } catch (error) {
        console.error("Error fetching recipe:", error);
        return { recipe: 'Sorry, I could not find a recipe for that dish. Please try another one.' };
    }
}
