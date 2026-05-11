import PublicOnlyRoute from "@/components/organisms/PublicOnlyRoute";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicOnlyRoute>{children}</PublicOnlyRoute>;
}