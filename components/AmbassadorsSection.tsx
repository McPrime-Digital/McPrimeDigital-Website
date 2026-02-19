'use client';

import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Video, User } from 'lucide-react';

const ambassadors = [
    {
        name: "McNortons",
        role: "The Visionary",
        description: "",
        image: "/team/mcnortons.jpg",
        socials: {
            tiktok: "#",
            instagram: "#",
            facebook: "#",
            twitter: "#"
        }
    },
    {
        name: "Alice",
        role: "The Architect",
        description: "",
        image: "/team/alice.jpg",
        socials: {
            tiktok: "#",
            instagram: "#",
            facebook: "#",
            twitter: "#"
        }
    }
];

export default function AmbassadorsSection() {
    return (
        <section>
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold mb-4"
                >
                    Meet Our In-House <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AI Ambassadors</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 max-w-4xl mx-auto leading-relaxed"
                >
                    Meet our cutting-edge AI Ambassadors designed for ultra-realistic user-generated content. With a personality that engages, they operate across various social media platforms, effortlessly capturing daily activities and securing promotional partnerships. Experience the future of influence, where creativity knows no bounds and every post feels authentically human.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {ambassadors.map((person, index) => (
                    <AmbassadorCard key={index} person={person} index={index} />
                ))}
            </div>
        </section>
    );
}

function AmbassadorCard({ person, index }: { person: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative"
        >
            {/* Image Frame */}
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-6 border border-white/10 bg-white/5 group-hover:border-purple-500/50 transition-colors duration-500">
                <img
                    src={person.image}
                    alt={person.name}
                    className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                <div className="absolute bottom-0 left-0 w-full p-8 z-10">
                    <h3 className="text-3xl font-bold text-white mb-1">{person.name}</h3>
                    <p className="text-purple-300 font-medium tracking-wider uppercase text-sm">{person.role}</p>
                </div>
            </div>

            {/* Content */}
            <div className="px-2">
                <p className="text-gray-400 mb-6 leading-relaxed">
                    {person.description}
                </p>

                {/* Socials */}
                <div className="flex gap-4">
                    <SocialLink icon={Video} href={person.socials.tiktok} label="TikTok" />
                    <SocialLink icon={Instagram} href={person.socials.instagram} label="Instagram" />
                    <SocialLink icon={Facebook} href={person.socials.facebook} label="Facebook" />
                    <SocialLink icon={Twitter} href={person.socials.twitter} label="X" />
                </div>
            </div>
        </motion.div>
    );
}

function SocialLink({ icon: Icon, href, label }: { icon: any, href: string, label: string }) {
    return (
        <a
            href={href}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            aria-label={label}
        >
            <Icon className="w-4 h-4" />
        </a>
    );
}
