import React, { useEffect } from 'react';
import AnalyticsDashboard from '../components/AnalyticsDashboard';

const Performance = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-20">
            <AnalyticsDashboard />
            <section className="py-12 bg-white text-center">
                <div className="container">
                    <p className="text-muted text-sm italic">
                        * This report is generated dynamically based on Month 2 achievement data.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Performance;
