import { eq } from "drizzle-orm"
import { users } from "~~/server/database/schemas"


export default defineEventHandler(async(event) => {
    const body = await readBody(event)

    const user = await db.select().from(users).where(eq(users.email, body.email)).limit(1)

    if (user.length === 0) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Email or Password must be provided' 
        })
    }

    const foundUser = user[0];

    const isValidPassword = await verifyPassword(foundUser.password, body.password);

    if (!isValidPassword) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid credentials'
        })
    }

    const { password, ...rest} = foundUser;

    await setUserSession (event, {
        foundUser: rest
    })

    return { message: 'Login Successful'}
})