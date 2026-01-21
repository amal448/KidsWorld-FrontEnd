import React, { Suspense } from "react";
import VerifyContent from "./verify-content";

export default function VerifyPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyContent />
      </Suspense>
    </div>
  );
}

