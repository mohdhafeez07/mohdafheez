import { useEffect, useState } from 'react';

const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit' });

/** Current time in Dubai as "HH:MM", refreshed every 15 seconds. */
export default function useDubaiTime() {
    const [time, setTime] = useState(() => fmt.format(new Date()));
    useEffect(() => {
        const id = setInterval(() => setTime(fmt.format(new Date())), 15000);
        return () => clearInterval(id);
    }, []);
    return time;
}
