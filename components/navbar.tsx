"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" href="/">EventChecklist</Link>
        <div className="navbar-nav">
          <Link className="nav-link" href="/">Home</Link>
          <Link className="nav-link" href="/checklist">Checklist</Link>
          <Link className="nav-link" href="/explore">Explore</Link>
        </div>
      </div>
    </nav>
  );
}
