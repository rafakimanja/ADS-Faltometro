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
            <Link href='/formDisc'>Form</Link>
            <Link href='/disciplinas'>Disciplinas</Link>
            <Link href='/formFalta'>Adc. Falta</Link>
          </nav>
        </div>
      </aside>
    )
}