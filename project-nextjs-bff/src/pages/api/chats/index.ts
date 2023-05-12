import { prisma } from "@/prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, lastMessage } = req.body;
    console.log(name, lastMessage)
    const chat = await prisma.chat.create({
        data: {
            name,
            lastMessage,
        },
    });

    res.json(chat);
};

export default handler;