'use client'

import Link from 'next/link'
import './Sidebar.css'

export default function Sidebar(){
    return (
      <aside className="sidebar">
        <div>
          <div className="logo">Faltômetro</div>
          <nav className="nav-links">
            <Link href='/'>Home</Link>
            <Link href='form'>Form</Link>
            <Link href='disciplinas'>Disciplinas</Link>
          </nav>
        </div>
      </aside>
    )
}