'use server';
import { personalizedDishRecommendations } from '@/ai/flows/personalized-dish-recommendations';

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

export async function getRecommendations() {
  try {
    // In a real app, you would get the logged-in user's ID
    const userId = 'user-123'; 
    const userProfile = userProfiles[userId as keyof typeof userProfiles] || { orderHistory: [], dietaryPreferences: 'any' };

    const recommendations = await personalizedDishRecommendations({
      userId: userId,
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
