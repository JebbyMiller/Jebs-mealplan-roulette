import "./PublicLayout.css";


export default function PublicLayout({ children }) {
  return (
    <div className="app-screen">
      {children}
    </div>
  );
}
