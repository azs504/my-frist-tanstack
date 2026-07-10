import Footer from "#/page/home/footer";
import Header from "#/page/home/header";

export function HeadAndFootWapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
