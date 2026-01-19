'use client'

import { useState } from "react";
import Modal from "../components/Modal";

export type GameCardProps = {
    title: string
    description: string;
    imageUrl: string;
};

export const GameCard: React.FC<GameCardProps> = ({ title, description, imageUrl }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (<>
        <div className="bg-white shadow rounded hover:shadow-lg transition overflow-hidden">
            <div className="h-34 overflow-hidden">
                <img src={imageUrl} alt="" className="cover h-full w-full" />
            </div>
            <div className="p-4">
                <div className="flex justify-between">
                    <h3 className="text-base font-semibold text-black mb-2">{title}</h3>
                    <h5
                        onClick={() => setIsModalOpen(!isModalOpen)}
                        className="text-sm text-blue-600 hover:text-yellow-400 cursor-pointer">More</h5>
                </div>

                <p className="text-gray-600 text-sm">
                    {description || "Exciting sport to play and enjoy."}
                </p>
            </div>
        </div>
        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            heading={`${title} Game Rules`}
            modalSize='large'
        >
            <div className="mb-5">
                <p className="text-gray-800 text-base">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur fuga ab quo atque voluptatem cumque. Voluptatibus, at aliquid et, dolores fugit quo eligendi amet enim sint ut recusandae, est dolore. Maxime unde deserunt recusandae consectetur voluptas? Quae aliquam ipsum consequatur architecto perferendis nostrum doloremque iure, quasi dolor placeat corrupti, inventore quas libero eius, provident ut vero. Suscipit animi eos ab sint quas nulla aper</p>
            </div>
            <div className="mb-5">
                <h4 className="text-blue-600 font-semibold text-base mb-4">Game key points</h4>
                <ul className="list-disc md:pl-5 pl-4">
                    {[1, 2, 3, 4, 5, 6].map(() => {
                        return <li className="text-gray-500 text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic quasi officia facilis sit odio molestias voluptatum exercitationem sunt quae cum!</li>
                    })}
                </ul>
            </div>

            <h4 className="text-blue-600 font-semibold text-base">Important points</h4>
            <ul className="list-decimal my-5 md:pl-5 pl-4">
                {[1, 2, 3, 4, 5, 6].map(() => {
                    return <li className="text-gray-500 text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic quasi officia facilis sit odio molestias voluptatum exercitationem sunt quae cum!</li>
                })}
            </ul>
        </Modal>
    </>
    );
};

