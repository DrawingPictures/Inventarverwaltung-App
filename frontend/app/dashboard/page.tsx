// src/app/dashboard/page.tsx
'use client';

import { useState, useEffect } from "react";
import styles from './dashboard.module.css';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

//Interfaces für die Typsicherheit
interface StatsData {
    companies: number;
    users: number;
    products: number;
}

interface InventoryEntry {
    id: number;
    user: string;
    company: string;
    product: string;
    sum: number;
    date: string;
}

//Farbpalette passend zum Dark-Mode
const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

export default function DashboardPage() {
    const [stats, setStats] = useState<StatsData>({ companies: 0, users: 0, products: 0 });
    const [entries, setEntries] = useState<InventoryEntry[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        //Der echte Fetch-Aufruf wird später an mein Backend eingebunden


        //Simulierte Daten für den Start:
        const timer = setTimeout(() => {
            setStats({
                //Bewusst "3422" gewählt, da der Balken im Diagramm sichtbarer ist
                companies: 3422,
                users: 26601,
                products: 123466,
            });

            setEntries([
                { id: 1, user: 'Dave', company: 'Biscuit Products', product: 'Kekse', sum: 1234, date: '10.09.2026' },
                { id: 2, user: 'Anton', company: 'Excelt', product: 'Schrauben', sum: 1200, date: '10.10.2026' },
                { id: 3, user: 'Okan', company: 'O. GmbH', product: 'Scanner', sum: 15, date: '25.07.2026' },
                { id: 4, user: 'Sarah', company: 'TechCorp', product: 'Monitore', sum: 45, date: '12.11.2026' },
                { id: 5, user: 'Michael', company: 'Logistik Plus', product: 'Paletten', sum: 500, date: '15.11.2026' },
                { id: 6, user: 'Lisa', company: 'BioStore', product: 'Bio-Tee', sum: 850, date: '18.11.2026' },
                { id: 7, user: 'Kevin', company: 'BuildMax', product: 'Zement', sum: 3200, date: '20.11.2026' },
                { id: 8, user: 'Laura', company: 'Office Solutions', product: 'Druckerpapier', sum: 15000, date: '22.11.2026' },
                { id: 9, user: 'Tim', company: 'ElectroWorld', product: 'USB-C Kabel', sum: 450, date: '25.11.2026' },
                { id: 10, user: 'Elena', company: 'MedPharma', product: 'Desinfektionsmittel', sum: 300, date: '28.11.2026' },
                { id: 11, user: 'Dave', company: 'Biscuit Products', product: 'Schokoriegel', sum: 2400, date: '01.12.2026' },
                { id: 12, user: 'Anton', company: 'Excelt', product: 'Nägel 5mm', sum: 5000, date: '03.12.2026' },
                { id: 13, user: 'Okan', company: 'O. GmbH', product: 'Barcode-Reader', sum: 8, date: '05.12.2026' },
                { id: 14, user: 'Sarah', company: 'TechCorp', product: 'Laptoptaschen', sum: 120, date: '08.12.2026' },
                { id: 15, user: 'Michael', company: 'Logistik Plus', product: 'Gabelstapler-Reifen', sum: 12, date: '10.12.2026' },
                { id: 16, user: 'Lisa', company: 'BioStore', product: 'Kaffeebecker (Papier)', sum: 3000, date: '12.12.2026' },
                { id: 17, user: 'Kevin', company: 'BuildMax', product: 'Schraubenzieher', sum: 85, date: '14.12.2026' },
                { id: 18, user: 'Laura', company: 'Office Solutions', product: 'Bürostühle', sum: 25, date: '16.12.2026' },
                { id: 19, user: 'Tim', company: 'ElectroWorld', product: 'Mehrfachsteckdosen', sum: 160, date: '18.12.2026' },
                { id: 20, user: 'Elena', company: 'MedPharma', product: 'Einweghandschuhe', sum: 10000, date: '20.12.2026' },
                { id: 21, user: 'Dave', company: 'Biscuit Products', product: 'Vollkornkekse', sum: 950, date: '22.12.2026' },
                { id: 22, user: 'Anton', company: 'Excelt', product: 'Bohrmaschinen', sum: 15, date: '24.12.2026' },
                { id: 23, user: 'Okan', company: 'O. GmbH', product: 'Etikettendrucker', sum: 10, date: '27.12.2026' },
                { id: 24, user: 'Sarah', company: 'TechCorp', product: 'HDMI-Kabel', sum: 230, date: '29.12.2026' },
                { id: 25, user: 'Michael', company: 'Logistik Plus', product: 'Rollbänder', sum: 40, date: '30.12.2026' },
                { id: 26, user: 'Anna', company: 'Logistik Plus', product: 'Packband', sum: 450, date: '02.01.2027' },
                { id: 27, user: 'Dave', company: 'Biscuit Products', product: 'Mehl 10kg', sum: 150, date: '04.01.2027' },
                { id: 28, user: 'Anton', company: 'Excelt', product: 'Muttern M8', sum: 2500, date: '05.01.2027' },
                { id: 29, user: 'Okan', company: 'O. GmbH', product: 'Netzwerkkabel', sum: 80, date: '08.01.2027' },
                { id: 30, user: 'Sarah', company: 'TechCorp', product: 'Webcams', sum: 35, date: '10.01.2027' },
                { id: 31, user: 'Lisa', company: 'BioStore', product: 'Bio-Honig', sum: 210, date: '12.01.2027' },
                { id: 32, user: 'Kevin', company: 'BuildMax', product: 'Wasserwaage', sum: 50, date: '15.01.2027' },
                { id: 33, user: 'Laura', company: 'Office Solutions', product: 'Toner Schwarz', sum: 40, date: '18.01.2027' },
                { id: 34, user: 'Tim', company: 'ElectroWorld', product: 'LED Lampen', sum: 300, date: '20.01.2027' },
                { id: 35, user: 'Elena', company: 'MedPharma', product: 'Mundschutz', sum: 5000, date: '22.01.2027' },
                { id: 36, user: 'Dave', company: 'Biscuit Products', product: 'Zucker 25kg', sum: 80, date: '25.01.2027' },
                { id: 37, user: 'Anton', company: 'Excelt', product: 'Unterlegscheiben', sum: 10000, date: '27.01.2027' },
                { id: 38, user: 'Okan', company: 'O. GmbH', product: 'Switch 8-Port', sum: 14, date: '29.01.2027' },
                { id: 39, user: 'Sarah', company: 'TechCorp', product: 'USB Hubs', sum: 65, date: '01.02.2027' },
                { id: 40, user: 'Michael', company: 'Logistik Plus', product: 'Frischhaltefolie', sum: 120, date: '03.02.2027' },
                { id: 41, user: 'Lisa', company: 'BioStore', product: 'Vollkornmehl', sum: 180, date: '05.02.2027' },
                { id: 42, user: 'Kevin', company: 'BuildMax', product: 'Schutzbrillen', sum: 90, date: '08.02.2027' },
                { id: 43, user: 'Laura', company: 'Office Solutions', product: 'Notizblöcke', sum: 500, date: '10.02.2027' },
                { id: 44, user: 'Tim', company: 'ElectroWorld', product: 'Netzteile 12V', sum: 75, date: '12.02.2027' },
                { id: 45, user: 'Elena', company: 'MedPharma', product: 'Fieberthermometer', sum: 60, date: '15.02.2027' },
                { id: 46, user: 'Anna', company: 'Logistik Plus', product: 'Kartonagen', sum: 300, date: '16.02.2027' },
                { id: 47, user: 'Dave', company: 'Biscuit Products', product: 'Salzstangen', sum: 1200, date: '18.02.2027' },
                { id: 48, user: 'Anton', company: 'Excelt', product: 'Gewindestangen', sum: 450, date: '20.02.2027' },
                { id: 49, user: 'Okan', company: 'O. GmbH', product: 'Patchkabel', sum: 110, date: '22.02.2027' },
                { id: 50, user: 'Sarah', company: 'TechCorp', product: 'Dockingstationen', sum: 25, date: '24.02.2027' },
                { id: 51, user: 'Lisa', company: 'BioStore', product: 'Bio-Kaffee', sum: 400, date: '26.02.2027' },
                { id: 52, user: 'Kevin', company: 'BuildMax', product: 'Schubkarren', sum: 8, date: '28.02.2027' },
                { id: 53, user: 'Laura', company: 'Office Solutions', product: 'Schreibtischlampen', sum: 15, date: '01.03.2027' },
                { id: 54, user: 'Tim', company: 'ElectroWorld', product: 'Batterien AA', sum: 1200, date: '03.03.2027' },
                { id: 55, user: 'Elena', company: 'MedPharma', product: 'Spritzen 5ml', sum: 3000, date: '05.03.2027' },
                { id: 56, user: 'Anna', company: 'Logistik Plus', product: 'Palettenwickler', sum: 2, date: '07.03.2027' },
                { id: 57, user: 'Dave', company: 'Biscuit Products', product: 'Butterkekse', sum: 850, date: '09.03.2027' },
                { id: 58, user: 'Anton', company: 'Excelt', product: 'Inbusschlüssel', sum: 65, date: '11.03.2027' },
                { id: 59, user: 'Okan', company: 'O. GmbH', product: 'WLAN-Router', sum: 20, date: '13.03.2027' },
                { id: 60, user: 'Sarah', company: 'TechCorp', product: 'Mauspads', sum: 150, date: '15.03.2027' },
                { id: 61, user: 'Lisa', company: 'BioStore', product: 'Bio-Schokolade', sum: 600, date: '17.03.2027' },
                { id: 62, user: 'Kevin', company: 'BuildMax', product: 'Nägel 10mm', sum: 4000, date: '19.03.2027' },
                { id: 63, user: 'Laura', company: 'Office Solutions', product: 'Ordner breit', sum: 250, date: '21.03.2027' },
                { id: 64, user: 'Tim', company: 'ElectroWorld', product: 'HDMI Adapter', sum: 90, date: '23.03.2027' },
                { id: 65, user: 'Elena', company: 'MedPharma', product: 'Pflaster', sum: 1500, date: '25.03.2027' },
                { id: 66, user: 'Anna', company: 'Logistik Plus', product: 'Hubwagen', sum: 4, date: '27.03.2027' },
                { id: 67, user: 'Dave', company: 'Biscuit Products', product: 'Vollkornmehl', sum: 300, date: '29.03.2027' },
                { id: 68, user: 'Anton', company: 'Excelt', product: 'Dübel 8mm', sum: 5000, date: '31.03.2027' },
                { id: 69, user: 'Okan', company: 'O. GmbH', product: 'Server-Rack', sum: 2, date: '02.04.2027' },
                { id: 70, user: 'Sarah', company: 'TechCorp', product: 'Tastaturen', sum: 45, date: '04.04.2027' },
                { id: 71, user: 'Lisa', company: 'BioStore', product: 'Bio-Nudeln', sum: 750, date: '06.04.2027' },
                { id: 72, user: 'Kevin', company: 'BuildMax', product: 'Hammer', sum: 30, date: '08.04.2027' },
                { id: 73, user: 'Laura', company: 'Office Solutions', product: 'Stifteboxen', sum: 120, date: '10.04.2027' },
                { id: 74, user: 'Tim', company: 'ElectroWorld', product: 'Ethernet-Switch', sum: 12, date: '12.04.2027' },
                { id: 75, user: 'Elena', company: 'MedPharma', product: 'Desinfektionstücher', sum: 800, date: '14.04.2027' },
                { id: 76, user: 'Anna', company: 'Logistik Plus', product: 'Luftpolsterfolie', sum: 50, date: '16.04.2027' },
                { id: 77, user: 'Dave', company: 'Biscuit Products', product: 'Laugenecken', sum: 400, date: '18.04.2027' },
                { id: 78, user: 'Anton', company: 'Excelt', product: 'Holzschrauben', sum: 3500, date: '20.04.2027' },
                { id: 79, user: 'Okan', company: 'O. GmbH', product: 'Netzwerkkarte', sum: 25, date: '22.04.2027' },
                { id: 80, user: 'Sarah', company: 'TechCorp', product: 'Bildschirmschutz', sum: 80, date: '24.04.2027' },
                { id: 81, user: 'Lisa', company: 'BioStore', product: 'Bio-Müsli', sum: 350, date: '26.04.2027' },
                { id: 82, user: 'Kevin', company: 'BuildMax', product: 'Sandsäcke', sum: 150, date: '28.04.2027' },
                { id: 83, user: 'Laura', company: 'Office Solutions', product: 'Schreibtischunterlagen', sum: 60, date: '30.04.2027' },
                { id: 84, user: 'Tim', company: 'ElectroWorld', product: 'Kaltgerätekabel', sum: 200, date: '02.05.2027' },
                { id: 85, user: 'Elena', company: 'MedPharma', product: 'Infusionssets', sum: 400, date: '04.05.2027' },
                { id: 86, user: 'Anna', company: 'Logistik Plus', product: 'Etikettenrolle', sum: 100, date: '06.05.2027' },
                { id: 87, user: 'Dave', company: 'Biscuit Products', product: 'Hefe (trocken)', sum: 500, date: '08.05.2027' },
                { id: 88, user: 'Anton', company: 'Excelt', product: 'Muttern M10', sum: 2000, date: '10.05.2027' },
                { id: 89, user: 'Okan', company: 'O. GmbH', product: 'Grafikkarte', sum: 10, date: '12.05.2027' },
                { id: 90, user: 'Sarah', company: 'TechCorp', product: 'USB-Sticks 64GB', sum: 150, date: '14.05.2027' },
                { id: 91, user: 'Lisa', company: 'BioStore', product: 'Bio-Saft', sum: 450, date: '16.05.2027' },
                { id: 92, user: 'Kevin', company: 'BuildMax', product: 'Kabelbinder', sum: 1200, date: '18.05.2027' },
                { id: 93, user: 'Laura', company: 'Office Solutions', product: 'Marker Set', sum: 300, date: '20.05.2027' },
                { id: 94, user: 'Tim', company: 'ElectroWorld', product: 'Verlängerungskabel', sum: 85, date: '22.05.2027' },
                { id: 95, user: 'Elena', company: 'MedPharma', product: 'Mund-Nasen-Schutz', sum: 2500, date: '24.05.2027' },
                { id: 96, user: 'Anna', company: 'Logistik Plus', product: 'Klebeband braun', sum: 350, date: '26.05.2027' },
                { id: 97, user: 'Dave', company: 'Biscuit Products', product: 'Vanillezucker', sum: 600, date: '28.05.2027' },
                { id: 98, user: 'Anton', company: 'Excelt', product: 'Unterlegscheiben M8', sum: 4000, date: '30.05.2027' },
                { id: 99, user: 'Okan', company: 'O. GmbH', product: 'Wandhalterung', sum: 15, date: '01.06.2027' },
                { id: 100, user: 'Sarah', company: 'TechCorp', product: 'Docking-Netzteil', sum: 40, date: '03.06.2027' }
            ]);

            setLoading(false);
        }, 400);

        return () => clearTimeout(timer);
    }, []);

    //Daten für Recharts
    const chartData = [
        { name: 'Companies', value: stats.companies },
        { name: 'Users', value: stats.users },
        { name: 'Products', value: stats.products },
    ];

    return (
        <>
            {/* 1. Entwurf: Sektion für das Kreisdiagramm bzw Statistiken */}
            <section className={styles.chartCard}>
                <h2>Statistische Übersicht</h2>
                <div className={styles.chartWrapper}>
                    {loading ? (
                        <p className={styles.loadingText}>Lade Diagramm-Daten...</p>
                    ) : (
                        <div style={{ width: '100%', height: '280px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                        label
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#131b2e',
                                            borderColor: '#1e293b',
                                            borderRadius: '8px',
                                            color: '#f8fafc'
                                        }}

                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
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
                                    <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                                        Tabelle wird geladen...
                                    </td>
                                </tr>
                            ) : entries.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
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