import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";


export default function SEAMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen  overflow-hidden">
      
      {/* <Sidebar /> */}

  
      <div className="flex-1 flex flex-col overflow-hidden">
      
        {/* <Navbar /> */}

        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
