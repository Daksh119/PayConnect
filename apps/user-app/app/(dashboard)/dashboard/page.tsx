import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Card } from "@repo/ui/card";

async function getUser() {
    const session = await getServerSession(authOptions);
    const user = session?.user?.name;
    return user;
}

const Dashboard = () => {
    const user = getUser();

    return (
        <div className="w-screen flex flex-col items-center justify-center">
          
    
          <main className="flex flex-col items-center mt-8 w-full max-w-4xl">
            <section className="w-full text-center p-8">
              <h2 className="text-3xl text-[#6a51a6] font-semibold mb-4">Welcome to PayConnet, {user}</h2>
              <p className="text-lg text-gray-700">Secure and easy-to-use payment wallet to manage all your transactions.</p>
            </section>
    
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full p-8">
              <Card title="Easy Transfers">
                Transfer money to anyone, anywhere, instantly.
              </Card>
              <Card title="Secure Payments">
                Your transactions are safe with our top-notch security.
              </Card>
              <Card title="Transaction History">
                Keep track of all your payments and receipts in one place.
              </Card>
              <Card title="24/7 Support">
                We are here to help you anytime, anywhere.
              </Card>
            </section>
    
            <section className="w-full text-center p-8">
              <h2 className="text-3xl font-semibold mb-4">Get Started Today</h2>
              <p className="text-lg text-gray-700 mb-4">Sign up now and enjoy seamless payment solutions.</p>
              
            </section>
          </main>
    
          
        </div>
      );
};



export default Dashboard;
