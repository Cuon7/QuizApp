import React from 'react';

interface TeamCardProps {
  name: string;
  job: string;
  image: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ name, job, image }) => {  
  return (
    <div className="border rounded-lg shadow-lg p-4">
      <img src={image} alt={name} className="rounded-md mb-4" />
      <h3 className="text-xl font-bold mb-2 text-center">{name}</h3>
      <p className="text-gray-600 mb-4 text-center">{job}</p>
    </div>
  );
};


export default TeamCard;
