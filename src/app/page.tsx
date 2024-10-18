import Header from "./components/Header";
import Main from "./components/Main";

export default function Home() {
  return (
    <div
      className="d-flex flex-column overflow-y-hidden"
      style={{ height: "100vh" }}
    >
      <Header />
      <Main />
    </div>
  );
}
