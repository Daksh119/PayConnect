import prisma from "@repo/db/client";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { P2pTransactions } from "../../../components/P2pTransactions";
import "./page.css";

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
        type: 'Sent'
    }));

    const receivedTransactions = recvdtxns.map(t => ({
        userId: t.fromUser.name,
        time: t.timestamp,
        amount: t.amount,
        type: 'Received'
    }));

    return [...sentTransactions, ...receivedTransactions];
}


async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        type: t.status,
        provider: t.provider
    }))
}

export default async function() {
    const ptransactions = await getP2pTransactions();
    const rtransactions = await getOnRampTransactions();
    const transactions = [...ptransactions, ...rtransactions];



    return (
        <div className="w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">Transactions</div>
            <div className="overflow-x-auto ">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">From / To</th>
                            <th className="px-4 py-2">Date/Time</th>
                            <th className="px-4 py-2">Amount</th>
                            <th className="px-4 py-2">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="px-4 py-2">{transaction.provider || transaction.userId || null}</td>
                                <td className="px-4 py-2">{transaction.time.toDateString()}</td>
                                <td className="px-4 py-2">Rs. {transaction.amount/100}</td>
                                <td className="px-4 py-2">{transaction.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}