import { prisma } from "@/prisma/prisma";
import { GetServerSideProps } from "next";

// tipagem
type Chat = {
  id: number;
  name: string;
  lastMessage: string;
};

type ListChatsProps = {
  chats: Chat[];
};

export default function ListChats(props: ListChatsProps) {
  return (
    <div>
      <h1>Chats</h1>
      <ul>
        {props.chats.map((chat) => (
          <li key={chat.id}>
            {chat.name} - {chat.lastMessage}
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const chats = await prisma.chat.findMany();
  return {
    props: {
      chats: chats.map((chat) => ({
        ...chat,
        createdAt: chat.createdAt.toISOString(),
      })),
    },
  };
};
