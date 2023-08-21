import Logo from "./Logo"
import SearchBar from "./SearchBar"
import SearchResults from "./SearchResults"

export default function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  )
}
