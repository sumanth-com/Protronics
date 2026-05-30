type PageTransitionProps = {
  children: React.ReactNode;
};

/** Pass-through wrapper — fade removed to keep route changes instant. */
export default function PageTransition({ children }: PageTransitionProps) {
  return <>{children}</>;
}
