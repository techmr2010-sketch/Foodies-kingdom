'use server';
/**
 * @fileOverview Personalized dish recommendations flow. Provides dish recommendations based on user history, preferences, and local trends.
 *
 * - personalizedDishRecommendations - A function that returns personalized dish recommendations.
 * - PersonalizedDishRecommendationsInput - The input type for the personalizedDishRecommendations function.
 * - PersonalizedDishRecommendationsOutput - The return type for the personalizedDishRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedDishRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  orderHistory: z.array(z.string()).describe('An array of the user\'s past order names.'),
  dietaryPreferences: z.string().describe('The user\'s dietary preferences (e.g., vegetarian, vegan, gluten-free).'),
  popularLocalChoices: z.array(z.string()).describe('An array of popular dish names in the user\'s local area.'),
});
export type PersonalizedDishRecommendationsInput = z.infer<
  typeof PersonalizedDishRecommendationsInputSchema
>;

const PersonalizedDishRecommendationsOutputSchema = z.object({
  recommendedDishes: z
    .array(z.string())
    .describe('An array of recommended dish names based on the input data.'),
});
export type PersonalizedDishRecommendationsOutput = z.infer<
  typeof PersonalizedDishRecommendationsOutputSchema
>;

export async function personalizedDishRecommendations(
  input: PersonalizedDishRecommendationsInput
): Promise<PersonalizedDishRecommendationsOutput> {
  return personalizedDishRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedDishRecommendationsPrompt',
  input: {schema: PersonalizedDishRecommendationsInputSchema},
  output: {schema: PersonalizedDishRecommendationsOutputSchema},
  prompt: `You are a food recommendation expert.  Given a user's order history, dietary preferences, and popular local choices, you will recommend dishes that the user might enjoy.

User ID: {{{userId}}}
Order History: {{#if orderHistory}}{{#each orderHistory}}- {{{this}}}{{/each}}{{else}}No order history{{/if}}
Dietary Preferences: {{{dietaryPreferences}}}
Popular Local Choices: {{#if popularLocalChoices}}{{#each popularLocalChoices}}- {{{this}}}{{/each}}{{else}}No popular local choices{{/if}}

Recommend dishes that the user might enjoy:
`, // Ensure that the model outputs only relevant dish names, not conversational text.
});

const personalizedDishRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedDishRecommendationsFlow',
    inputSchema: PersonalizedDishRecommendationsInputSchema,
    outputSchema: PersonalizedDishRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
