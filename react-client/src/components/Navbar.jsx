import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      padding: '10px 20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/" style={{
          textDecoration: 'none',
          color: '#4a6cf7',
          fontWeight: '600',
          fontSize: '1.2rem'
        }}>
          Faculty Grade Module
        </Link>
        <Link to="/" style={{
          textDecoration: 'none',
          color: '#333',
          padding: '5px 10px',
          borderRadius: '4px',
          transition: 'all 0.2s ease'
        }}>
          Courses
        </Link>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ color: '#666' }}>Welcome, {user.name}</span>
        <button 
          onClick={onLogout}
          style={{
            backgroundColor: 'transparent',
            color: '#4a6cf7',
            border: '1px solid #4a6cf7',
            padding: '6px 15px',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
            fontWeight: '500'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#4a6cf7';
            e.target.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#4a6cf7';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
}
