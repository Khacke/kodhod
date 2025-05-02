import { z } from 'zod';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const schema = z.object({
	username: z.string().min(3, 'A felhasznalonevednek minimum 3 karakter hosszunak kell lennie'),
	image: z
		.instanceof(File)
		.refine(
			(file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
			'Csak az alabbi file formatumok elerhetok: .jpeg, .jpg, .png, .webp'
		)
		.optional(),
});
