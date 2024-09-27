import React, { useState, useEffect } from 'react';
import { supabase } from "@/lib/sbClient";

interface Project {
  name: string;
  image: string;
}

const images = {
  img1: '/fact.jpg',
  img2: '/fact1.jpg',
  img3: '/fact2.jpg',
  img4: '/fact3.jpg',
  img5: '/fact4.jpg',
  img6: '/fact5.jpg',
  img7: '/fact6.jpg',
  img8: '/fact7.jpg',
}

const ProjectCards: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('name')
      .limit(3);
    
    if (error) {
      console.error('Error fetching projects:', error);
    } else {
      setProjects(data as Project[]);
    }
  };

  const getRandomImage = (): string => {
    const imageKeys = Object.keys(images) as (keyof typeof images)[]; 
    const randomKey = imageKeys[Math.floor(Math.random() * imageKeys.length)];
    return images[randomKey];
  };
  return (
    <div className="flex flex-col w-full justify-center items-center max-w-3xl mx-auto">
      <h2 className="text-4xl font-poppins font-bold mt-16 text-[#2d4352]">
        Projekt
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {projects.map((project, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
             <div className="h-40 bg-gray-200">
              <img 
                src={getRandomImage()} 
                alt={`Project ${project.name}`} 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#2d4352] mb-2">{project.name}</h3>
              <p className="text-sm text-gray-600">Find out more about this project</p>
            </div>
            <div className="px-4 py-3 bg-gray-50">
              <button className="text-sm text-blue-600 font-medium hover:underline">
                Learn more
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCards;