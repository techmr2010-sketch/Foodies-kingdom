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

*   **Butter Chicken**
    *   **Ingredients (serves 4):** Chicken (boneless) – 500 g, Yogurt – ½ cup, Ginger-garlic paste – 2 tbsp, Red chili powder – 1 tsp, Garam masala – 1 tsp, Butter – 3 tbsp, Tomato purée – 1 cup, Fresh cream – ½ cup, Salt – to taste.
    *   **Method:** Marinate chicken in yogurt + spices 1 hr. Cook in butter + tomato purée. Add cream, simmer 10 min.

*   **Pizza (Veg)**
    *   **Ingredients (1 medium pizza):** Pizza base – 1, Pizza sauce – 3 tbsp, Mozzarella cheese – 1 cup grated, Veg toppings (capsicum, onion, tomato, corn) – 1 cup, Oregano + chili flakes – 1 tsp each.
    *   **Method:** Spread sauce, add cheese + toppings, bake at 200°C for 12–15 min.

*   **Paneer Butter Masala**
    *   **Ingredients:** Paneer – 250 g, Tomato purée – 1 cup, Butter – 2 tbsp, Cream – ¼ cup, Ginger-garlic paste – 1 tbsp, Garam masala – 1 tsp, Salt – to taste.
    *   **Method:** Cook tomato gravy, add paneer cubes, finish with butter + cream.

*   **Veg Biryani**
    *   **Ingredients:** Basmati rice – 2 cups, Mixed veggies – 2 cups, Yogurt – ½ cup, Biryani masala – 2 tbsp, Saffron milk – ¼ cup, Ghee – 2 tbsp.
    *   **Method:** Layer rice + veggies, drizzle saffron milk, cook on dum 20 min.

*   **Chicken Biryani**
    *   **Ingredients:** Chicken – 500 g, Basmati rice – 2 cups, Yogurt – ½ cup, Biryani masala – 2 tbsp, Fried onions – 1 cup, Saffron milk – ¼ cup.
    *   **Method:** Same method as veg biryani, replace veggies with marinated chicken.

*   **Fried Rice (Veg)**
    *   **Ingredients:** Cooked rice – 3 cups, Mixed veggies – 1½ cups, Soy sauce – 2 tbsp, Vinegar – 1 tbsp, Garlic – 1 tbsp chopped, Oil – 2 tbsp.
    *   **Method:** Stir-fry garlic + veggies, add rice + sauces, toss well.

*   **Chicken Fried Rice**
    *   **Method:** Same as veg fried rice, add 1 cup diced cooked chicken.

*   **Veg Momos (Steam)**
    *   **Ingredients:** Maida – 2 cups, Water – as needed, Cabbage + carrot (grated) – 2 cups, Soy sauce – 1 tbsp, Garlic – 1 tbsp chopped, Salt – to taste.
    *   **Method:** Make dough, fill with veg mix, steam 12 min.

*   **Chicken Momos (Fry)**
    *   **Ingredients:** Dough (maida) – 2 cups, Minced chicken – 250 g, Onion – ½ cup chopped, Garlic – 1 tbsp, Soy sauce – 1 tbsp.
    *   **Method:** Fill, steam 10 min, then deep fry till golden.

*   **French Fries**
    *   **Ingredients:** Potatoes – 4 medium, Salt – 1 tsp, Oil – for frying.
    *   **Method:** Cut sticks, soak in water 30 min, fry twice (blanch + crisp).

*   **Samosa**
    *   **Ingredients:** Dough (maida), filling (spiced potato + peas).
    *   **Method:** Fill dough cones, seal, deep fry golden.

*   **Bread Pakora**
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
