'use server';
/**
 * @fileOverview An AI flow to generate recipes for a given dish.
 *
 * - findRecipe - A function that returns a recipe for a dish.
 * - RecipeFinderInput - The input type for the findRecipe function.
 * - RecipeFinderOutput - The return type for the findRecipe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecipeFinderInputSchema = z.object({
  dishName: z.string().describe('The name of the dish to find a recipe for.'),
});
export type RecipeFinderInput = z.infer<typeof RecipeFinderInputSchema>;

const RecipeFinderOutputSchema = z.object({
  recipe: z
    .string()
    .describe(
      'The detailed recipe for the dish, formatted in markdown. Include ingredients and step-by-step instructions.'
    ),
});
export type RecipeFinderOutput = z.infer<typeof RecipeFinderOutputSchema>;

export async function findRecipe(
  input: RecipeFinderInput
): Promise<RecipeFinderOutput> {
  return recipeFinderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recipeFinderPrompt',
  input: {schema: RecipeFinderInputSchema},
  output: {schema: RecipeFinderOutputSchema},
  prompt: `You are a master chef. Your task is to provide a clear, concise, and easy-to-follow recipe for the dish requested by the user.

Dish Name: {{{dishName}}}

Please provide the recipe in markdown format, including a list of ingredients with quantities and step-by-step instructions.
`,
});

const recipeFinderFlow = ai.defineFlow(
  {
    name: 'recipeFinderFlow',
    inputSchema: RecipeFinderInputSchema,
    outputSchema: RecipeFinderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
