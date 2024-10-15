import Sidebar from "./Sidebar";
import Content from "./Content";

export default function Main() {
  return (
    <main className="flex-grow-1 container-fluid position-relative">
      <Sidebar />
      <Content />
    </main>
  );
}
