import { Footer } from "@/components/layout/footer";
import { Navigation } from "@/components/layout/navigation";

export default function CoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
