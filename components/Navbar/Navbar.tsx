import { ToggleDarkMode } from "../DarkMode/ToggleDarkMode";

export const Navbar = () => {
  return (
    <header className="border-b border-b-accent fixed top-0 left-0 right-0 bg-background">
      <div className="container flex items-center py-2 max-w-lg m-auto gap-1">
        <h1 className="text-2xl font-bold mr-auto">Password</h1>
        <ToggleDarkMode />
      </div>
    </header>
  );
};
