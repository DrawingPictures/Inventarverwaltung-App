// src/app/dashboard/page.tsx
'use client';

import { useState, useEffect } from "react";
import styles from './dashboard.module.css';

//Interfaces für die Typsicherheit
interface StatsData 
{
    companies: number;
    users: number;
    products: number;
}

interface InventoryEntry 
{
    id: number;
    user: string;
    company: string;
    product: string;
    sum: number;
    date: string;
}

export default function DashboardPage() 
{
    const [stats, setStats] = useState<StatsData>({ companies: 0, users: 0, products: 0});
    const [entries, setEntries] = useState<InventoryEntry[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        //Der echte Fetch-Aufruf wird später an mein Backend eingebunden


        //Simulierte Daten für den Start:
        const timer = setTimeout(() => {
            setStats({
                companies: 34,
                users: 26601,
                products: 123466,
            });

            setEntries([
                {id: 1, user: 'Dave', company: 'Biscuit Products', product: 'Kekse', sum: 1234, date: '10.09.2026'},
                {id: 2, user: 'Anton', company: 'Excelt', product: 'Schrauben', sum: 1200, date: '10.10.2026'},
                {id: 3, user: 'Okan', company: 'O. GmbH', product: 'Scanner', sum: 15, date: '25.07.2026'},
            ]);

            setLoading(false);
        }, 400);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* 1. Entwurf: Sektion für das Kreisdiagramm bzw Statistiken */}
            <section className={styles.chartCard}>
                <h2>Statistische Übersicht</h2>
                <div className={styles.chartWrapper}>
                    {loading ? (
                        <p className={styles.loadingText}>Lade Diagramm-Daten...</p>
                    ) : (
                        <div className={styles.statsPreview}>
                            <div className={styles.statsBox}>
                                <span>Companies</span>
                                <strong>{stats.companies}</strong>
                            </div>
                            <div className={styles.statsBox}>
                                <span>Users</span>
                                <strong>{stats.users}</strong>
                            </div>
                            <div className={styles.statsBox}>
                                <span>Products</span>
                                <strong>{stats.products}</strong>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* 2. Entwurf: Sektion für die Tabelle */}
            <section className={styles.tableCard}>
                <h2>Aktuelle Inventar-Einträge</h2>
                <div className={styles.tableContainer}>
                    <table className={styles.dataTable}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Company</th>
                                <th>Product</th>
                                <th>Sum</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center', padding: '2rem'}}>
                                        Tabelle wird geladen...
                                    </td>
                                </tr>
                            ) : entries.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center', padding: '2rem'}}>
                                        Keine Einträge vorhanden.
                                    </td>
                                </tr>
                            ) : (
                                entries.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>{row.user}</td>
                                        <td>{row.company}</td>
                                        <td>{row.product}</td>
                                        <td>{row.sum}</td>
                                        <td>{row.date}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                </div>

            </section>

        </>
    );
}