import { Card } from "@repo/ui/card"

export const P2pTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        userId: string | null,
        type: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2 space-y-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        {t.userId}
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    {t.type == 'sent' ? ' - Rs': '+ Rs' } {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}