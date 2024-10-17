import { Suspense } from "react";

import Sidebar from "./Sidebar";
import Content from "./Content";

export default function Main() {
  return (
    <main className="flex-grow-1 position-relative">
      <Suspense
        fallback={
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
      >
        <Sidebar />
        <Content />
      </Suspense>
    </main>
  );
}
