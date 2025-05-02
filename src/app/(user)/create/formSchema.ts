import { z } from 'zod';

export const schema = z.object({
	title: z.string().trim().min(5, 'A cimnek minimum 5 karakter hosszunak kell lennie'),
	description: z
		.string()
		.trim()
		.min(50, 'Ahhoz, hogy a feladatnak ertelmes leirasa legyen, minimum 50 karakter hosszunal kell lennie'),
	difficulty: z.number().min(1).max(3),
	tags: z.array(z.number()).min(1, 'Legalabb 1 taget valassz ki, hogy konnyebben megertseg a feladatot'),
	startingCode: z.string(),
	testCode: z.string(),
	testCodeExample: z.string().optional(),
	language: z.number().min(1, 'Valassz egy programozasi nyelvet'),
});
