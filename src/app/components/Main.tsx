import Sidebar from "./Sidebar";
import Content from "./Content";

export default function Main() {
  return (
    <main className="flex-grow-1 position-relative">
      <Sidebar />
      <Content />
    </main>
  );
}
