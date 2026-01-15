import React from "react";
import { Database, Mail, Smartphone } from "react-feather";

type CardProps = {
    title: string;
    description: string;
    linkText: string;
    linkHref: string;
    icon?: React.ReactNode;
};

const InfoCard: React.FC<CardProps> = ({ title, description, linkText, linkHref, icon }) => {
    return (
        <div className="bg-white shadow-md rounded-md w-72 p-8 space-y-5">
            <div className="w-12 h-12 bg-yellow-400 text-blue-600 rounded flex items-center justify-center font-bold">
                {icon}
            </div>

            <h3 className="text-lg font-semibold text-blue-600">{title}</h3>

            <p className="text-gray-600 text-sm mb-4">{description}</p>
            <a
                href={linkHref}
                className="text-sm text-blue-600 hover:text-amber-400 font-medium hover:underline transition-all duration-300 ease-in-out"
            >
                {linkText}
            </a>
        </div>
    );
};

const CardSection: React.FC = () => {
    const cards: CardProps[] = [
        {
            title: "Career",
            description: "Neque porro quisquam est, qui dolorem ipsum.",
            linkText: "+ LEARN MORE",
            linkHref: "#career",
            icon: <Mail />,
        },
        {
            title: "Courses",
            description: "Neque porro quisquam est, qui dolorem ipsum.",
            linkText: "+ LEARN MORE",
            linkHref: "#courses",
            icon: <Database />,
        },
        {
            title: "Support",
            description: "Neque porro quisquam est, qui dolorem ipsum.",
            linkText: "+ CONTACT SUPPORT",
            linkHref: "#support",
            icon: <Smartphone />,
        },
    ];

    return (
        <div className="flex flex-wrap justify-center gap-6">
            {cards.map((card, idx) => (
                <InfoCard key={idx} {...card} />
            ))}
        </div>
    );
};

export default CardSection;
