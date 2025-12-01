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

If the requested dish is in the list below, you MUST use the provided recipe. Otherwise, you can generate one.

Dish Name: {{{dishName}}}

---
**Predefined Recipes:**

*   **Biryani Non Veg (Chicken)**
    *   **Ingredients:** Basmati rice, chicken, onions, tomatoes, yogurt, ginger-garlic paste, biryani masala, whole spices, saffron milk.
    *   **Method:** Cook rice with whole spices till 70% done. Fry onions golden, add chicken, yogurt, masala, cook till tender. Layer rice & chicken in a pot, drizzle saffron milk, seal and cook on dum (low flame) for 20 min.

*   **Biryani Veg**
    *   **Ingredients:** Basmati rice, mixed veggies (carrot, beans, peas, cauliflower), onions, tomatoes, yogurt, biryani masala, saffron milk.
    *   **Method:** Same as non-veg, but replace chicken with sautéed veggies.

*   **Fried Rice**
    *   **Ingredients:** Cooked rice, mixed veggies, soy sauce, vinegar, garlic, spring onion.
    *   **Method:** Stir-fry garlic & veggies, add rice, sauces, toss well.

*   **Chicken Fried Rice**
    *   **Method:** Same as fried rice, but add diced cooked chicken while stir-frying.

*   **Momos Veg Steam**
    *   **Ingredients:** Dough (maida + salt + water), filling (cabbage, carrot, onion, garlic, soy sauce).
    *   **Method:** Fill dough circles, shape, steam 10-12 min.

*   **Momos Veg Fry**
    *   **Method:** Steam momos first, then shallow fry till golden.

*   **Momos Non Veg Steam**
    *   **Ingredients:** Filling: minced chicken + onion + garlic + soy sauce.
    *   **Method:** Same as veg momos, steam 12-15 min.

*   **Momos Non Veg Fry**
    *   **Method:** Steam first, then deep fry till crisp.

*   **Veg Roll**
    *   **Ingredients:** Paratha, sautéed veggies, chutney.
    *   **Method:** Place filling on paratha, roll tight.

*   **Egg Roll**
    *   **Ingredients:** Paratha, beaten egg, onion, chutney.
    *   **Method:** Cook paratha with egg on one side, add filling, roll.

*   **French Fries**
    *   **Ingredients:** Potatoes, salt, oil.
    *   **Method:** Cut sticks, soak, fry twice (blanch + crisp).

*   **Chilly Potato**
    *   **Ingredients:** Fried potato fingers, capsicum, onion, garlic, soy sauce, chili sauce.
    *   **Method:** Toss fried potatoes with sauces & veggies.

*   **Chilly Potato (Honey)**
    *   **Method:** Same as above, add honey at the end for glaze.

*   **Noodles**
    *   **Ingredients:** Boiled noodles, veggies, soy sauce, vinegar, chili sauce.
    *   **Method:** Stir-fry garlic & veggies, add noodles & sauces, toss.

*   **Maggi**
    *   **Method:** Cook Maggi noodles with tastemaker & water, add veggies if desired.

*   **Samosa**
    *   **Ingredients:** Dough (maida), filling (spiced potato + peas).
    *   **Method:** Fill dough cones, seal, deep fry golden.

*   **Bread Pakoda**
    *   **Ingredients:** Bread slices, spiced potato filling, gram flour batter.
    *   **Method:** Stuff bread, dip in batter, deep fry.
---

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
