const zod = require('zod');

const createTodoZod = zod.object({
    title: zod.string(),
    description: zod.string()
})

const updateTodoZod = zod.object({
    id : zod.string()
})

const authZod = zod.object({
  username: zod
    .string()
    .min(1, { message: "Username is required." })
    .trim()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Username must match the format 'name@domain.com'.",
    })
    .refine((val) => val.endsWith('@smtg.com'), {
      message: "Username must specifically end with '@smtg.com'.",
    }),

  password: zod
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(100, { message: "Password is too long." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character." })
});

module.exports = {
    createTodoZod,
    updateTodoZod,
    authZod
}
