import Header from "@/app/components/Header";
import PostSidebar from "@/app/components/PostSidebar";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="d-flex flex-column overflow-y-hidden"
      style={{ height: "100vh" }}
    >
      <Header />
      <main className="flex-grow-1 position-relative">
        <PostSidebar />
        <div
          className="content p-3 overflow-y-auto"
          style={{ maxHeight: "90vh" }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
