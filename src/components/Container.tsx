function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full justify-center px-2 md:px-28">{children}</div>
  );
}
export default Container;
