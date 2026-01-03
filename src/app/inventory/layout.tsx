import type React from "react";
import { Suspense } from "react";
import Loading from "./loading";

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
