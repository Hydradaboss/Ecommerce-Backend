import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient
const block = async (req, res, next) => {
    const check = await prisma.user.findUnique({
        where:{
            id: req.user.id
        }
    })

    if(check && check.isBlocked === true){
        res.status(400).send("User is blocked")
    }else{
        next()
    }
}

export default block