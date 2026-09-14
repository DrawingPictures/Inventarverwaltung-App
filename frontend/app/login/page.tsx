'use client';

import { useState } from "react";
import { useRouter } from "next/router";
import {Package, Lock, Mail, AlertCircle, Loader2} from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();

    //Formular-Eingaben
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //UI-Feedback
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            //Anfrage an Backend
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || 'Anmeldung fehlgeschlagen. Bitte Zugangsdaten prüfen.');
            }

            // JWT Access Token im localStorage speichern
            if(data.access_token) {
                localStorage.setItem('token', data.access_token);
            }

            //Erfolgreich eingeloggt -> wird zum Dashboard weitergeleitet
            router.push('/dashboard');

        } catch(err: any) {
            setError(err.message || 'Ein Fehler ist aufgetreten');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">

                {/* Header / Logo */}
                <div className="login-header">
                    <div className="logo-icon">
                        <Package size={32} color="#ffffff" />
                    </div>
                    <h1>Inventarverwaltung</h1>
                    <p>Bitte melden Sie sich am, um fortzufahren.</p>
                </div>

                {/* Fehlermeldung */}
                {error && (
                    <div className="error-box">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                {/* Formular */}
                <form onSubmit={handleSubmit} className="login-form">

                    {/* E-Mail Feld */}
                    <div className="form-group">
                        <label>E-Mail Adresse</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={20} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@inventar.de"
                            />
                        </div>
                    </div>

                    {/* Passwort Feld */}
                    <div className="form-group">
                        <label>Passwort</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={20} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" disabled={loading} className="submit-btn">
                        {loading ? (
                            <>
                                <Loader2 className="spinner" size={20} />
                                <span>Anmeldung läuft...</span>
                            </>
                        ) : (
                            <span>Anmelden</span>
                        )}
                    </button>
                </form>

            </div>
        </div>

        
    )
}