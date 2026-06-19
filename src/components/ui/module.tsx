"use client";
export function Module({
  children,
  isShowing,
}: {
  children: React.ReactNode;
  isShowing: boolean;
}) {
  return (
    <>
      {isShowing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          {children}
        </div>
      )}
    </>
  );
}
