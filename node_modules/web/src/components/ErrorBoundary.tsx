import React from 'react';

interface State { hasError: boolean; error: string }

export default class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false, error: '' };

  static getDerivedStateFromError(err: Error): State {
    return { hasError: true, error: err.message };
  }

  componentDidCatch(err: Error, info: React.ErrorInfo) {
    console.error('[Divyam] Runtime error:', err, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', background: '#0a0f0a', display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          color: '#10b981', fontFamily: 'monospace', padding: '2rem', textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏥</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Divyam Hospital</h1>
          <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.875rem' }}>
            एक त्रुटि हुई — A runtime error occurred
          </p>
          <pre style={{
            background: '#111827', padding: '1rem', borderRadius: '0.75rem',
            fontSize: '0.75rem', color: '#ef4444', maxWidth: '600px',
            overflowX: 'auto', textAlign: 'left', marginBottom: '1.5rem'
          }}>
            {this.state.error}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'linear-gradient(145deg, #34d399, #064e3b)',
              color: 'white', border: 'none', padding: '0.75rem 2rem',
              borderRadius: '1rem', fontWeight: 900, cursor: 'pointer',
              fontSize: '0.875rem', letterSpacing: '0.1em'
            }}
          >
            RELOAD PAGE
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
