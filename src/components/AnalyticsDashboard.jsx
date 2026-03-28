import React from 'react';
import { analyticsData } from '../utils/analyticsData';

const StatCard = ({ title, value, subtext }) => (
    <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
        <h4 className="text-sm font-medium text-muted uppercase tracking-widest mb-2">{title}</h4>
        <p className="text-3xl font-bold text-primary mb-1">{value}</p>
        {subtext && <p className="text-xs text-muted">{subtext}</p>}
    </div>
);

const AnalyticsDashboard = () => {
    const { traffic, conversion, behavior, chatbot } = analyticsData;

    return (
        <section className="py-20 bg-white">
            <div className="container">
                <div className="text-center mb-16 animate-fade">
                    <span className="text-primary font-semibold tracking-widest uppercase text-sm mb-2 block">Performance Report</span>
                    <h2 className="text-4xl font-bold mb-4">Results Achieved (Month 2)</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md-flex flex-col gap-12">
                    {/* Traffic Metrics */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-primary-light rounded-full"></span>
                            Traffic Metrics
                        </h3>
                        <div className="grid grid-cols-1 sm-grid-cols-2 lg-grid-cols-4 gap-6">
                            <StatCard title="Total Visitors" value={traffic.totalVisitors.toLocaleString()} />
                            <StatCard title="Page Views" value={traffic.pageViews.toLocaleString()} />
                            <StatCard title="Avg Session" value={traffic.avgSessionDuration} />
                            <StatCard title="Mobile Traffic" value={traffic.mobileTraffic} />
                        </div>
                    </div>

                    {/* Conversion Metrics */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-accent rounded-full opacity-50"></span>
                            Conversion & Sales
                        </h3>
                        <div className="grid grid-cols-1 sm-grid-cols-2 lg-grid-cols-4 gap-6">
                            <StatCard title="Total Orders" value={conversion.orders} />
                            <StatCard title="Conversion Rate" value={conversion.conversionRate} />
                            <StatCard title="Revenue" value={`${conversion.revenue.toLocaleString()} VND`} />
                            <StatCard title="Avg Order Value" value={`${conversion.avgOrderValue.toLocaleString()} VND`} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg-grid-cols-2 gap-12">
                        {/* Behavior */}
                        <div className="glass-card p-8">
                            <h3 className="text-xl font-bold mb-8">Audience Behavior</h3>
                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between mb-3">
                                        <span className="text-sm font-semibold tracking-wider text-muted uppercase">Product Quiz Usage</span>
                                        <span className="text-sm font-bold text-primary">{behavior.productQuizUsage}</span>
                                    </div>
                                    <div className="w-full bg-primary-light/20 h-3 rounded-full overflow-hidden shadow-inner">
                                        <div className="bg-primary h-full rounded-full" style={{ width: behavior.productQuizUsage }}></div>
                                    </div>
                                </div>
                                <div className="pt-8 border-t border-glass-border">
                                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4">Traffic Acquisition</p>
                                    <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                        {behavior.sources.map(source => (
                                            <div key={source.name} className="flex flex-col">
                                                <span className="text-[10px] text-muted uppercase font-bold mb-1">{source.name}</span>
                                                <span className="text-xl font-bold text-main">{source.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Chatbot Performance */}
                        <div className="glass-card p-8">
                            <h3 className="text-xl font-bold mb-6">Chatbot Efficiency (Jacob)</h3>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <p className="text-xs text-muted mb-1">Conversations</p>
                                    <p className="text-2xl font-bold text-secondary">{chatbot.totalConversations}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted mb-1">Auto-Resolved</p>
                                    <p className="text-2xl font-bold text-secondary">{chatbot.resolvedWithoutHuman}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted mb-1">Response Time</p>
                                    <p className="text-2xl font-bold text-secondary">{chatbot.avgResponseTime}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted mb-1">Satisfaction</p>
                                    <p className="text-2xl font-bold text-accent">{chatbot.customerSatisfaction}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AnalyticsDashboard;
