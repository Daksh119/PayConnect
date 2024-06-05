import { SendCard } from "../../../components/SendCard";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { P2pTransactions } from "../../../components/P2pTransactions";

async function getP2pTransactions() {
    const session = await getServerSession(authOptions);
    const senttxns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        },
        include: {
            toUser: true,
        }
    });
    const recvdtxns = await prisma.p2pTransfer.findMany({
        where: {
            toUserId: Number(session?.user?.id)
        },
        include: {
            fromUser: true,
        }
    });
    const sentTransactions = senttxns.map(t => ({
        userId: t.toUser.name,
        time: t.timestamp,
        amount: t.amount,
        type: 'sent'
    }));

    const receivedTransactions = recvdtxns.map(t => ({
        userId: t.fromUser.name,
        time: t.timestamp,
        amount: t.amount,
        type: 'received'
    }));

    return [...sentTransactions, ...receivedTransactions];
}

export default async function() {
    const transactions = await getP2pTransactions();

    return (
        <div className="w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                P2P Transfer
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 p-4">
                <div className="md:col-span-1">
                    <div className="pt-4">
                        <SendCard />
                    </div>
                </div>
                <div className="md:col-span-2">
                    <div className="pt-4">
                        <P2pTransactions transactions={transactions} />
                    </div>
                </div>
            </div>
        </div>
    );
}
