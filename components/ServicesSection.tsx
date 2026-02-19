'use client';

import {
    Clapperboard,
    Cpu,
    Megaphone,
    Users
} from 'lucide-react';
import ServiceCard from './ServiceCard';

export default function ServicesSection() {
    const services = [
        {
            title: "AI Commercial Video",
            description: "Ultra-realistic 8K quality videos with fast turnaround. We blend creativity with AI precision to produce stunning commercial content.",
            icon: Clapperboard,
            delay: 0.1
        },
        {
            title: "AI Automation",
            description: "Streamline your business with AI chatbots, workflow automations, and performance dashboards. Efficiency meets intelligence.",
            icon: Cpu,
            delay: 0.2
        },
        {
            title: "Paid Advertising",
            description: "Data-driven strategies tailored for targeted traffic and maximum ROI. We ensure your budget delivers real results.",
            icon: Megaphone,
            delay: 0.3
        },
        {
            title: "AI UGC Influencer",
            description: "Authentic engagement through ultra-realistic AI-generated influencers. Scale your brand presence without the logistical nightmares.",
            icon: Users,
            delay: 0.4
        }
    ];

    return (
        <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Our <span className="text-[rgb(var(--primary))]">Services</span></h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Cutting-edge solutions designed to elevate your brand in the digital age.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, index) => (
                    <ServiceCard
                        key={index}
                        title={service.title}
                        description={service.description}
                        icon={service.icon}
                        delay={service.delay}
                    />
                ))}
            </div>
        </section>
    );
}
