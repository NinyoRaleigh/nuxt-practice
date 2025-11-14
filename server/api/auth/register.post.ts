import { email, z } from "zod/v4";
import { db } from "~~/server/utils/db"
import { users } from "~~/server/database/schemas"
import { eq } from "drizzle-orm";

const registerSchema = z.object ({
    username: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters').max(255),
})

export default defineEventHandler(async(event) => {
    const body = await readValidatedBody(event, registerSchema.parse )

    const hashedPassword = await hashPassword(body.password)

    // check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, body.email)).limit(1);

     if(existingUser.length > 0 ){
        throw createError ({
            statusCode :409, 
            statusMessage: 'user already exists'
        })
    }

    // create new user

    const newUser = await db.insert(users).values({
        username: body.username,
        email:body.email,
        password: hashedPassword,

    })

      // retrieve the created user

    const createdUser = await db.select().from(users).where(eq(users.id, newUser[0].insertId)).limit(1);

    const user = createdUser[0];

    const {password,...rest} = user;


        await setUserSession(event, {
            user:rest
        })
        
        return body
})